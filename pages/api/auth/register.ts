import bcrypt from 'bcryptjs'

import serial from 'lib/serial'
import { isEmail } from 'lib/regex'
import prisma from 'lib/prisma'
import cookie from 'lib/cookie'
import { NextRequest, NextResponse } from 'next/server'

export default async function (req, res) {
    const { email, password }: { email: string; password: string } = req.body

    if (!email || !password || !isEmail(email))
        res.status(400).json({
            Success: false,
            Message: 'Invalid input...',
        })

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

        const verificationCode = await serial(1)
        const referralCode = await serial(3)

        const user = await prisma.user.create({
            data: {
                clientId: process.env.CLIENT_ID,
                email,
                password: salted,
                verificationCode,
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
