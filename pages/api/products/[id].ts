import prisma from 'lib/prisma'

export default async function (req, res) {
    const { id } = req.query
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
        include: {
            categories: true,
            images: true,
            listings: true,
        },
    })

    if (product) {
        return res.status(200).json(product)
    } else {
        return res
            .status(404)
            .json({ Success: false, Message: 'Product not found.' })
    }
}
