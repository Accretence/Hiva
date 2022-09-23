import { isEmail } from 'lib/regex'
import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'

export default async function (req, res) {
    const { email } = req.body

    if (!email || !isEmail(email)) {
        return res.status(400).json({
            Success: false,
            Message: 'Invalid input...',
        })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
        const code = await createSerialNumber(1)

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                verificationCode: {
                    create: {
                        code,
                        expiresAt: new Date(),
                    },
                },
            },
        })

        return res.status(200).json({
            Success: true,
            Message: 'Verification Code sent to Email!',
        })
    } else {
        return res.status(401).json({
            Success: false,
            Message:
                'User with this credentials does not exist or wrong credentials.',
        })
    }
}
