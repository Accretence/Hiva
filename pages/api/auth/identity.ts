import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import cookie from 'lib/cookie'

export default async function (req, res) {
    const { email, name, picture } = req.body.response
    if (!email) {
        return res.redirect(502, '/')
    }

    const exists = await prisma.googleIntegration.findUnique({
        where: { email },
    })

    if (exists) {
        const AJWT = await cookie({
            id: exists.userId.toString(),
            sameSite: 'Lax',
        })

        return res.setHeader('Set-Cookie', AJWT).redirect(302, '/')
    }

    if (!exists) {
        const referralCode = await createSerialNumber(3)

        const user =
            (await prisma.user.findUnique({
                where: { email },
                include: { googleIntegration: true },
            })) ||
            (await prisma.user.create({
                data: {
                    name: name && name,
                    email,
                    referralCode,
                    isEmailVerified: true,
                },
            }))

        if (user)
            await prisma.googleIntegration.create({
                data: {
                    userId: user.id,
                    email,
                    name,
                    picture,
                },
            })

        if (user) {
            const AJWT = await cookie({
                id: user.id.toString(),
                sameSite: 'Lax',
            })

            return res.setHeader('Set-Cookie', AJWT).redirect(302, '/')
        } else {
            return res.redirect(302, '/auth/error')
        }
    }
}
