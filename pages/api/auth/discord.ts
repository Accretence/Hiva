import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import bakeCookie from 'lib/cookie'
import { getDiscordTokens, getDiscordUser } from 'lib/discord'

export default async function (req, res) {
    console.log(req.query)
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

    const exists = await prisma.discordIntegration.findUnique({
        where: { id },
    })

    if (exists) {
        return res.status(400).json({
            Success: false,
            Message:
                'This Discord account is already integrated with another user.',
        })
    }

    if (!exists) {
        const user = await prisma.user.findUnique({
            where: { id: req.query.id },
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
            return res.status(200).json({
                Success: true,
                Message: 'Discord integrated.',
            })
        } else {
            return res.redirect(302, '/auth/error')
        }
    }
}
