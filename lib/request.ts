import { verifyJWT } from 'lib/jwt'

export async function verifyAuthentication(req, res) {
    const { cookies } = req

    if (!cookies)
        res.status(400).json({
            Success: false,
            Message: 'Invalid request...',
        })

    const jwt = cookies.AJWT

    if (!jwt)
        res.status(400).json({
            Success: false,
            Message: 'Invalid request...',
        })

    return await verifyJWT(jwt)
}
