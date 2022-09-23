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

    const { id, email, verified_email, name, picture, locale } =
        await getGoogleUser({
            id_token,
            access_token,
        })

    if (!email) {
        return res.redirect(502, '/')
    }

    const exists = await prisma.user.findUnique({ where: { email } })

    if (exists) {
        const integrated = await prisma.googleIntegration.findUnique({
            where: { userId: exists.id },
        })

        if (!integrated) {
            await prisma.googleIntegration.create({
                data: {
                    userId: exists.id,
                    email,
                    name,
                    picture,
                    locale,
                },
            })

            await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    name: name && name,
                    isEmailVerified: exists.email == email && true,
                },
            })
        }

        const AJWT = await cookie({ id: exists.id.toString(), sameSite: 'Lax' })

        return res.setHeader('Set-Cookie', AJWT).redirect(302, '/')
    }

    if (!exists) {
        const referralCode = await createSerialNumber(3)

        const user = await prisma.user.create({
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
        })

        if (user)
            await prisma.googleIntegration.create({
                data: {
                    userId: user.id,
                    email,
                    name,
                    picture,
                    locale,
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
