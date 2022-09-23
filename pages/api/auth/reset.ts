import { isEmail } from 'lib/regex'
import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import bcrypt from 'bcryptjs'

export default async function (req, res) {
    const { code, password } = req.body

    if (!code || !password) {
        return res.status(400).json({
            Success: false,
            Message: 'Invalid input...',
        })
    }

    const user = await prisma.user.findFirst({
        where: { verificationCode: code },
    })

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                Success: false,
                Message: 'New password cannot be the same as the old password!',
            })
        }

        const salt = await bcrypt.genSalt(10)
        const salted = await bcrypt.hash(password, salt)

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: salted,
            },
        })

        return res.status(200).json({
            Success: true,
            Message: 'Password successfully reset.',
        })
    } else {
        return res.status(401).json({
            Success: false,
            Message: 'Invalid code.',
        })
    }
}
