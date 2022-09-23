import bcrypt from 'bcryptjs'

import { isEmail } from 'lib/regex'
import cookie from 'lib/cookie'
import prisma from 'lib/prisma'

export default async function (req, res) {
    const { email, password } = req.body

    if (!email || !password || !isEmail(email)) {
        return res.status(400).json({
            Success: false,
            Message: 'Invalid input...',
        })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (user && (await bcrypt.compare(password, user.password))) {
        const AJWT = await cookie({
            id: user.id.toString(),
            sameSite: 'Strict',
        })

        return res.setHeader('Set-Cookie', AJWT).status(200).json({
            Success: true,
            Message: 'Success',
        })
    } else {
        return res.status(401).json({
            Success: false,
            Message:
                'User with this credentials does not exist or wrong credentials.',
        })
    }
}
