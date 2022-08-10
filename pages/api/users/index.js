import connection from '../../../db/connection';
import { User } from '../../../db/models';

export default async function handler(req, res) {
  const { method } = req;

  await connection();

  switch (method) {
    case 'GET':
      try {
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
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: `${user.email} has been created.` });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};
