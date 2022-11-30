import prisma from 'lib/prisma'

export default async function (req, res) {
    const take = 5

    const count = await prisma.product.count({})
    const products = await prisma.product.findMany({
        include: {
            categories: true,
            images: true,
            listings: true,
        },
        take,
    })

    if (products) {
        return res.status(200).json({
            products,
            totalPages: Math.ceil(count / take),
        })
    } else {
        return res.status(400).json({
            Success: false,
            Message: 'Internal error.',
        })
    }
}
