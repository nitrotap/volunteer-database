// eslint-disable-next-line no-unused-vars
import connection from '../../../db/connection';
import { User } from '../../../db/models';
import { compare } from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import { signToken } from './auth';




// login a user

export default async function handler(req, res) {
    const { method } = req;

    await connection();

    switch (method) {
        case 'POST':
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(400).json({ success: false, message: 'Invalid credentials' });
                }

                const isMatch = await compare(req.body.password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Invalid credentials' });
                }

                res.status(200).json({ success: true, data: user })

            } catch (err) {
                res.status(400).json({ success: false, message: err });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

