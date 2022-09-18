import { getMultipleRandomIntsInRange, getRandomIntInRange } from '../lib/rng'
import prisma from '../lib/prisma'
import { clients, users, blogPosts, discounts } from './seed.data'
import {
    calculateDiscountCost,
    calculatePayableCost,
    isDiscountAcceptable,
} from '../lib/discount'

async function main() {
    await prisma.client.createMany({
        data: clients,
    })

    const { id: clientId } = await prisma.client.findFirst()

    const productsRes = await fetch('https://dummyjson.com/products')
    const { products } = await productsRes.json()

    for (let product of products) {
        const {
            title,
            description,
            brand,
            category,
            images,
            price,
            stock,
            discountPercentage: discount,
        }: {
            title: string
            description: string
            brand: string
            category: string
            images: Array<string>
            price: number
            stock: number
            discountPercentage: number
        } = product

        await prisma.product.create({
            data: {
                clientId,
                title,
                description,
                brand,
                categories: {
                    connectOrCreate: [
                        {
                            where: {
                                title: category,
                            },
                            create: {
                                title: category,
                                client: {
                                    connect: {
                                        id: clientId,
                                    },
                                },
                            },
                        },
                    ],
                },
                images: {
                    create: (() => {
                        const processed = []

                        for (let j = 0; j < images.length; j++) {
                            processed.push({ url: images[j] })
                        }
                        return processed
                    })(),
                },
                listings: {
                    create: {
                        price: Math.floor(price),
                        stock,
                        discount: Math.floor(discount),
                    },
                },
            },
        })
    }

    for (let discount of discounts) {
        const { code, maxUses, maxAmount, burntUses, percentage } = discount

        await prisma.discount.create({
            data: {
                code,
                maxUses,
                burntUses,
                maxAmount,
                percentage,
                clientId,
            },
        })
    }

    const foundProducts = await prisma.product.findMany()
    const foundDiscounts = await prisma.discount.findMany()

    for (let user of users) {
        const { email, password, referralCode, isAdmin, isEmailVerified } = user

        const { orders, listingIDs } = await generateListings(
            foundProducts,
            foundDiscounts
        )

        await prisma.user.create({
            data: {
                client: {
                    connect: {
                        id: clientId,
                    },
                },
                email,
                password,
                referralCode,
                isAdmin,
                isEmailVerified,
                cart: {
                    connect: listingIDs,
                },
                orders: {
                    create: orders,
                },
            },
        })
    }

    const { id: authorId } = await prisma.user.findFirst()

    for (let blogPost of blogPosts) {
        const { title, description, image, categories } = blogPost

        await prisma.blogPost.create({
            data: {
                clientId,
                authorId,
                title,
                description,
                image,
                categories: {
                    connectOrCreate: categories.map((category) => {
                        return {
                            where: { title: category },
                            create: {
                                title: category,
                                client: {
                                    connect: {
                                        id: clientId,
                                    },
                                },
                            },
                        }
                    }),
                },
            },
        })
    }
}

try {
    main()
    prisma.$disconnect()
} catch (error) {
    console.log(error)
    process.exit(1)
}

async function generateListings(foundProducts, foundDiscounts) {
    const { id: clientId } = await prisma.client.findFirst()

    let orders = []
    let listingIDs = []

    for (let i = 0; i < getRandomIntInRange(2, 6); i++) {
        const indices = getMultipleRandomIntsInRange(
            getRandomIntInRange(2, 6),
            0,
            foundProducts.length
        )

        let listings = []
        for (const index of indices) {
            const { id } = foundProducts[Number(index)]

            listings.push(
                await prisma.listing.findFirst({
                    where: {
                        productId: id,
                    },
                })
            )
        }

        let totalCost = 0
        for (const listing of listings) {
            totalCost += listing.price
        }

        listingIDs = listings
            .map((listing) => listing.id)
            .map((listing) => {
                return {
                    id: listing,
                }
            })

        const isDiscounted = getRandomIntInRange(0, 2)
        const isReferred = getRandomIntInRange(0, 2)
        const discount =
            foundDiscounts[getRandomIntInRange(0, foundDiscounts.length)]

        if (isDiscounted && isDiscountAcceptable(discount)) {
            orders.push({
                listings: {
                    connect: listingIDs,
                },
                totalCost,
                discountCost: calculateDiscountCost(totalCost, discount),
                payableCost: calculatePayableCost(totalCost, discount),
                clientId,
                discountCode: discount.code,
            })
        } else {
            orders.push({
                listings: {
                    connect: listingIDs,
                },
                totalCost,
                discountCost: 0,
                payableCost: totalCost,
                clientId,
            })
        }
    }

    return { orders, listingIDs }
}
