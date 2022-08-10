import connection from '../../../db/connection';
import { User } from '../../../db/models';

export default async function handler(req, res) {
  const { method } = req;

  // connect to db
  await connection();

  switch (method) {
    case 'GET':
      try {
        // find all users and return json
        const users = await User.find({})
          .select("-__v")
          .select("-password");
        res.status(200).json({ success: true, data: users });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break
    case 'POST':
      try {
        // create user and return message, only easy way I found to ommit password on return
        const user = await User.create(req.body);
        res.status(201).json({ success: true, message: `${user.email} has been created.` });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    default:
      // in case the wrong header gets sent to this API, return header not accepted
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};
