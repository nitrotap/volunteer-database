import { withSessionRoute } from "../../lib/config/withSession";
import connection from '../../db/connection';
import { User } from '../../db/models';
import { compare } from 'bcrypt';


export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    const { method } = req;

    await connection();
    switch (method) {
        case 'POST':
            const { formState } = req.body;
            const { email, password } = formState;

            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.status(400).json({ success: false, message: 'Invalid credentials' });
                }

                const isMatch = await compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Invalid credentials' });
                }


                req.session.user = {
                    username: user.email,
                    isAdmin: true
                };
                await req.session.save();
                res.send({ ok: true });


                // res.status(200).json({ success: true, data: user })

            } catch (err) {
                res.status(400).json({ success: false, message: err });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }

    // if (req.method === "POST") {
    //     // const { email, password } = req.body;

    //     const { formState } = req.body;
    //     const { email, password } = formState;

    //     if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    //         req.session.user = {
    //             username: "newUser@email.com",
    //             isAdmin: true
    //         };
    //         await req.session.save();
    //         res.send({ ok: true });
    //     }
    //     return res.status(403).send("");
    // }
    // return res.status(404).send("");


}
