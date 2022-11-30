import {
    getMultipleRandomIntsInRange,
    getRandomBoolean,
    getRandomIntInRange,
} from '../lib/rng'
import prisma from '../lib/prisma'
import { users, blogPosts, discounts, products, docs } from './seed.data'
import {
    calculateDiscountAmount,
    calculatePayableAmount,
    calculateReferralAmount,
    isDiscountAcceptable,
} from '../lib/order'

async function main() {
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

    console.log('Created Products...')

    for (let discount of discounts) {
        const { code, maxUses, maxAmount, burntUses, percentage } = discount

        await prisma.discount.create({
            data: {
                code,
                maxUses,
                burntUses,
                maxAmount,
                percentage,
            },
        })
    }

    console.log('Created Discounts...')

    const foundProducts = await prisma.product.findMany()
    const foundDiscounts = await prisma.discount.findMany()

    console.log('Fetched Products & Discounts...')

    for (let user of users) {
        const { email, password, referralCode, isAdmin, isEmailVerified } = user

        const { orders, listingIDs } = await generateListings(
            foundProducts,
            foundDiscounts
        )

        await prisma.user.create({
            data: {
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

    console.log('Created Users...')

    const { id: authorId } = await prisma.user.findFirst()

    for (let blogPost of blogPosts) {
        const { title, description, image, categories } = blogPost

        await prisma.blogPost.create({
            data: {
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
                            },
                        }
                    }),
                },
            },
        })
    }

    console.log('Created Blog Posts...')

    for (let doc of docs) {
        const { title, index, category, categoryIndex, slug } = doc

        await prisma.documentPage.create({
            data: {
                authorId,
                title,
                index,
                category,
                categoryIndex,
                slug,
            },
        })
    }

    console.log('Created Documentation Pages...')
}

try {
    main()
    prisma.$disconnect()
} catch (error) {
    console.log(error)
    process.exit(1)
}

async function generateListings(foundProducts, foundDiscounts) {
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

        let totalAmount = 0
        for (const listing of listings) {
            totalAmount += listing.price
        }

        listingIDs = listings
            .map((listing) => listing.id)
            .map((listing) => {
                return {
                    id: listing,
                }
            })

        const isDiscounted = getRandomBoolean()
        const isReferred = getRandomBoolean()
        const discount =
            foundDiscounts[getRandomIntInRange(0, foundDiscounts.length)]

        if (isDiscounted && isDiscountAcceptable(discount)) {
            await prisma.discount.update({
                where: {
                    code: discount.code,
                },
                data: {
                    burntUses: {
                        increment: 1,
                    },
                },
            })
        }

        orders.push({
            listings: {
                connect: listingIDs,
            },
            totalAmount,
            referralAmount: calculateReferralAmount(isReferred, totalAmount),
            discountAmount: calculateDiscountAmount(
                isDiscounted,
                totalAmount,
                discount
            ),
            payableAmount: calculatePayableAmount(
                isDiscounted,
                isReferred,
                totalAmount,
                discount
            ),
            discountCode: discount.code,
        })
    }

    console.log('Created Listings...')

    return { orders, listingIDs }
}
