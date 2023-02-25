import { withSessionRoute } from "../../lib/config/withSession";


const VALID_EMAIL = "newUser@email.com";
const VALID_PASSWORD = "password123";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            req.session.user = {
                username: "newUser@email.com",
                isAdmin: true
            };
            await req.session.save();
            res.send({ ok: true });
        }
        return res.status(403).send("");
    }
    return res.status(404).send("");
}
