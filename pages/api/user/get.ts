import { gateUser } from 'lib/gateway'

export default async function (req, res) {
    const user = await gateUser(req, res)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(401).json({
            Success: false,
            Message: 'Failed to verify or find user.',
        })
    }
}
