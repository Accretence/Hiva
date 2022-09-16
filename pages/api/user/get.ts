import { format } from 'date-fns'
import { enUS, faIR } from 'date-fns/locale'
import prisma from 'lib/prisma'

import { verifyAuthentication } from 'lib/request'

export default async function (req, res) {
    const decoded = await verifyAuthentication(req, res)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id.toString(),
        },
        include: {
            orders: true,
            cart: true,
            referralsProvided: true,
            googleIntegration: true,
        },
    })

    if (user) {
        console.log(user)
        res.status(200).json({
            user,
        })
    } else {
        res.status(401).json({
            Success: false,
            Message: 'Failed to find user...',
        })
    }
}
