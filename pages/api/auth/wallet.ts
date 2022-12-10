import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import cookie from 'lib/cookie'

export default async function (req, res) {
    const { wallet } = req.body

    const exists = await prisma.user.findUnique({
        where: { wallet },
    })

    if (exists) {
        return res.status(200).json({ Success: true, Message: 'Success...' })
    }

    if (!exists) {
        const referralCode = await createSerialNumber(3)

        const user = await prisma.user.update({
            data: {
                wallet,
            },
        })

        if (user) {
            return res
                .status(200)
                .json({ Success: true, Message: 'Success...' })
        } else {
            return res.status(401).json({
                Success: false,
                Message: 'Failed to create User...',
            })
        }
    }
}
