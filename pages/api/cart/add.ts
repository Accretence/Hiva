import { verifyRequest } from 'lib/request'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)
}
