import { verifyAuthentication } from 'lib/request'

export default async function (req, res) {
    const decoded = await verifyAuthentication(req, res)
}
