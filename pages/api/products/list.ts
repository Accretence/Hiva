import prisma from 'lib/prisma'

export default async function (req, res) {
    const { pageSize = 15, currentPage = 1 } = req.body

    const count = await prisma.product.count()
    const products = await prisma.product.findMany({
        where: {
            clientTitle: process.env.CLIENT_TITLE,
        },
        include: {
            categories: true,
            images: true,
            listings: true,
        },
    })

    res.status(200).json({
        products,
        page: currentPage,
        pages: Math.ceil(count / pageSize),
    })
}
