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
import { slugify } from '../lib/slug'

async function main() {
    for (let user of users) {
        const { email, referralCode, isAdmin } = user

        await prisma.user.create({
            data: {
                id: Math.random().toString(),
                email,
                referralCode,
                isAdmin,
            },
        })
    }

    console.log('Created Users...')

    const { id: authorId } = await prisma.user.findFirst()

    for (let blogPost of blogPosts) {
        const { title, description, image, categories, content } = blogPost

        await prisma.blogPost.create({
            data: {
                authorId,
                title,
                description,
                slug: slugify(title),
                image,
                content,
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
        const { title, index, category, categoryIndex, content } = doc

        await prisma.documentPage.create({
            data: {
                authorId,
                title,
                index,
                category,
                categoryIndex,
                slug: slugify(title),
                content,
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
