import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import cookie from 'lib/cookie'

import { getGoogleTokens, getGoogleUser } from 'lib/google'

export default async function (req, res) {
    const { id_token, access_token } = await getGoogleTokens({
        code: req.query.code,
    })

    if (!id_token || !access_token) {
        return res.redirect(502, '/')
    }

    const { id, email, verified_email, name, picture } = await getGoogleUser({
        id_token,
        access_token,
    })

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
                    clients: {
                        connect: {
                            title: process.env.CLIENT_TITLE,
                        },
                    },
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
