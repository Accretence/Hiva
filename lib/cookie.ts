import { signJWT } from './jwt'
import { serialize } from 'cookie'

export default async function cookie({ id, sameSite }) {
    const token = await signJWT(id)
    return serialize('AJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 30,
        sameSite,
        path: '/',
    })
}
