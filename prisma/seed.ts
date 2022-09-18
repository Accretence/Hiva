import prisma from '../lib/prisma'
import { clients, users, blogPosts, discounts } from './seed.data'

async function main() {
    await prisma.client.createMany({
        data: clients,
    })

    const { id: clientId } = await prisma.client.findFirst()

    for (let user of users) {
        const { email, password, referralCode, isAdmin, isEmailVerified } = user

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
            },
        })
    }

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
                        price,
                        stock,
                        discount: Math.floor(discount),
                    },
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
