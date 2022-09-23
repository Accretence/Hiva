import { decodeJWT } from 'lib/jwt'
import prisma from 'lib/prisma'

export async function gateJWT(req, res) {
    const { cookies } = req

    if (!cookies) {
        res.status(400).json({
            Success: false,
            Message: 'Invalid request...',
        })

        return
    }

    const { AJWT } = cookies

    if (!AJWT) {
        res.status(400).json({
            Success: false,
            Message: 'Invalid request...',
        })

        return
    }

    return await decodeJWT(AJWT)
}

export async function gateUser(req, res) {
    const decoded = await gateJWT(req, res)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id.toString(),
        },
        include: {
            googleIntegration: true,
            verificationCode: true,
            cart: true,
            orders: true,
            referralsProvided: true,
            referralsConsumed: true,
            blogPosts: true,
            clients: true,
        },
    })

    if (!user) {
        res.status(400).json({
            Success: false,
            Message: 'Invalid request...',
        })

        return
    }

    return user
}

export async function gateAdmin(req, res) {
    const decoded = await gateJWT(req, res)

    const user = await prisma.user.findFirst({
        where: {
            id: decoded.id,
        },
        include: {
            googleIntegration: true,
            verificationCode: true,
            cart: true,
            orders: true,
            referralsProvided: true,
            referralsConsumed: true,
            blogPosts: true,
            clients: true,
        },
    })

    if (!user || !user.isAdmin) {
        res.status(400).json({
            Success: false,
            Message: 'Invalid request...',
        })

        return
    }

    return user
}
