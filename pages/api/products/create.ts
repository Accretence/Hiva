import { gateAdmin } from 'lib/gateway'
import prisma from 'lib/prisma'

export default async function (req, res) {
    const admin = gateAdmin(req, res)

    const {
        title,
        description,
        brand,
        isPhysical,
        clientTitle,
        images,
        categories,
    } = req.body

    const product = await prisma.product.create({
        data: {
            title,
            description,
            brand,
            isPhysical,
            images: {
                create: images.map((url: string) => ({
                    url,
                })),
            },
            categories: {
                create: categories.map((title: string) => ({
                    title,
                })),
            },
            clientTitle,
        },
    })

    return res.status(200).json(product)
}
