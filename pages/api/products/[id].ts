import prisma from 'lib/prisma'

export default async function (req, res) {
    const { id } = req.query
    const product = await prisma.product.findFirst({
        where: {
            id,
            clientTitle: process.env.CLIENT_TITLE.toString(),
        },
        include: {
            categories: true,
            images: true,
            listings: true,
        },
    })

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).send('Product not found.')
    }
}
