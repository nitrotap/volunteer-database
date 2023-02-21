// import dbConnect from '../../../lib/dbConnect'
import connection from '../../db/connection'
import User from '../../db/models/User'

export default async function handler(req, res) {
    const { method } = req

    await connection()

    switch (method) {
        case 'GET':
            try {
                const user = await User.find({})
                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        default:
            res.status(400).json({ success: false })
            break
    }
}
