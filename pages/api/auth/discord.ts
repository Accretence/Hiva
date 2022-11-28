import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import bakeCookie from 'lib/cookie'
import { getDiscordTokens, getDiscordUser } from 'lib/discord'

export default async function (req, res) {
    async function bakeAndServe({ id }) {
        const AJWT = await bakeCookie({
            id,
            sameSite: 'Lax',
        })

        return res.setHeader('Set-Cookie', AJWT).redirect(302, '/')
    }

    const { access_token } = await getDiscordTokens({
        code: req.query.code,
    })

    if (!access_token) {
        return res.redirect(502, '/')
    }

    const { id, username, avatar, discriminator, email } = await getDiscordUser(
        {
            access_token,
        }
    )

    if (!email) {
        return res.redirect(502, '/')
    }

    const existsByID = await prisma.discordIntegration.findUnique({
        where: { id },
        include: {
            user: true,
        },
    })

    if (existsByID) {
        await bakeAndServe({ id: existsByID.user.id.toString() })
    }

    if (!existsByID) {
        const referralCode = await createSerialNumber(3)

        const user = await prisma.user.create({
            data: {
                clients: {
                    connect: {
                        title: process.env.CLIENT_TITLE,
                    },
                },
                email,
                referralCode,
                isEmailVerified: true,
            },
        })

        if (user)
            await prisma.discordIntegration.create({
                data: {
                    id,
                    userId: user.id,
                    email,
                    avatar,
                    username,
                },
            })

        if (user) {
            await bakeAndServe({ id: user.id.toString() })
        } else {
            return res.redirect(302, '/auth/error')
        }
    }
}
