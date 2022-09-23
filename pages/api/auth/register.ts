import bcrypt from 'bcryptjs'

import { createSerialNumber } from 'lib/serial'
import { isEmail } from 'lib/regex'
import prisma from 'lib/prisma'
import cookie from 'lib/cookie'

export default async function (req, res) {
    const { email, password }: { email: string; password: string } = req.body

    if (!email || !password || !isEmail(email)) {
        res.status(400).json({
            Success: false,
            Message: 'Invalid input...',
        })

        return
    }

    const exists = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (exists) {
        res.status(400).json({
            Success: false,
            Message: 'Email is already registered...',
        })
    } else {
        const salt = await bcrypt.genSalt(10)
        const salted = await bcrypt.hash(password, salt)

        const verificationCode = await createSerialNumber(1)
        const referralCode = await createSerialNumber(3)

        const user = await prisma.user.create({
            data: {
                clients: {
                    connect: {
                        title: process.env.CLIENT_TITLE,
                    },
                },
                email,
                password: salted,
                verificationCode: {
                    create: { code: verificationCode },
                },
                referralCode,
            },
        })

        if (user) {
            const AJWT = await cookie({
                id: user.id.toString(),
                sameSite: 'Strict',
            })

            res.setHeader('Set-Cookie', AJWT)
            res.status(200).json({
                Success: true,
                Message: 'Success...',
            })
        } else {
            res.status(401).json({
                Success: false,
                Message: 'Failed to create User...',
            })
        }
    }
}
