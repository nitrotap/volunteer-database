import connection from '../../../db/connection';
import { User } from '../../../db/models';

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;

  await connection();

  switch (method) {
    case 'GET':
      try {
        // console.log("This is in params", userId);
        const user = await User.findOne({ _id: userId })
        .select("-__v")
        .select("-password");
        if (!user) {
          res.status(404).end(`No User Found With This Id`)
        };
        res.status(200).json({ success: true, data: user });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'PUT':
      try {
        const user = await User.findOne({ _id: userId })
        .select("-__v");

        if (!user) {
          res.status(404).end(`No User Found With This Id`)
        };
        if (req.body.email) {
        user.email = req.body.email;
        };
        if (req.body.password) {
        user.password = req.body.password;
        };
        await user.save();
        res.status(200).json({ success: true, data: `${user.email} has been updated.` });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'DELETE':
      try {
        const user = await User.findOneAndDelete({ _id: userId })
        .select("-__v")
        .select("-password");
        if (!user) {
          res.status(404).end(`No User Found With This Id`)
        };
        res.status(200).json({ success: true, data: user });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};