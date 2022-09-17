import prisma from '../lib/prisma'
import { clients, users, products, blogPosts } from './seed.data'

async function main() {
    await prisma.client.createMany({
        data: clients,
    })

    const { id: clientId } = await prisma.client.findFirst()

    for (let user of users) {
        const { email, password, referralCode, isAdmin, isEmailVerified } = user

        await prisma.user.create({
            data: {
                clientId,
                email,
                password,
                referralCode,
                isAdmin,
                isEmailVerified,
            },
        })
    }

    const { id: authorId } = await prisma.user.findFirst()

    for (let product of products) {
        const { title, description, categories, images, listings } = product

        await prisma.product.create({
            data: {
                clientId,
                title,
                description,
                categories: {
                    create: categories,
                },
                images: {
                    create: images,
                },
                listings: {
                    create: listings,
                },
            },
        })
    }

    for (let blogPost of blogPosts) {
        const { title, description, image } = blogPost

        await prisma.blogPost.create({
            data: {
                clientId,
                authorId,
                title,
                description,
                image,
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
