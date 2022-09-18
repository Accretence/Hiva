import { getMultipleRandomIntsInRange, getRandomIntInRange } from '../lib/rng'
import prisma from '../lib/prisma'
import { clients, users, blogPosts, discounts } from './seed.data'

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
                                    connectOrCreate: [
                                        {
                                            where: { id: clientId },
                                            create: {
                                                id: clientId,
                                            },
                                        },
                                    ],
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

    for (let user of users) {
        const { email, password, referralCode, isAdmin, isEmailVerified } = user

        const products = await prisma.product.findMany()

        let orders = []
        for (let i = 0; i < getRandomIntInRange(2, 5); i++) {
            const indices = getMultipleRandomIntsInRange(
                getRandomIntInRange(2, 5),
                0,
                products.length
            )

            let listings = []
            for (const index of indices) {
                const { id } = products[Number(index)]

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

            orders.push({
                listings: {
                    connect: listings
                        .map((listing) => listing.id)
                        .map((listing) => {
                            return {
                                id: listing,
                            }
                        }),
                },
                totalCost,
                discountCost: 0,
                payableCost: totalCost,
                clientId,
            })
        }

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
                                    connectOrCreate: [
                                        {
                                            where: { id: clientId },
                                            create: {
                                                id: clientId,
                                            },
                                        },
                                    ],
                                },
                            },
                        }
                    }),
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
}

try {
    main()
    prisma.$disconnect()
} catch (error) {
    console.log(error)
    process.exit(1)
}
