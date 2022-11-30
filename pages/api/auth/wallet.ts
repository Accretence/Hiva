import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import cookie from 'lib/cookie'

export default async function (req, res) {
    const { wallet } = req.body

    const exists = await prisma.walletIntegration.findUnique({
        where: { wallet },
    })

    if (exists) {
        const AJWT = await cookie({
            id: exists.userId.toString(),
            sameSite: 'Strict',
        })

        return res
            .setHeader('Set-Cookie', AJWT)
            .status(200)
            .json({ Success: true, Message: 'Success...' })
    }

    if (!exists) {
        const referralCode = await createSerialNumber(3)

        const user = await prisma.user.create({
            data: {
                referralCode,
            },
        })

        if (user) {
            await prisma.walletIntegration.create({
                data: {
                    userId: user.id,
                    wallet,
                },
            })

            const AJWT = await cookie({
                id: user.id.toString(),
                sameSite: 'Strict',
            })

            return res
                .setHeader('Set-Cookie', AJWT)
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
