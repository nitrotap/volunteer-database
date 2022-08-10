import connection from '../../../db/connection';
import { User } from '../../../db/models';

// .../api/users/[userId] routes here

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;

  // connect to db
  await connection();

  switch (method) {
    case 'GET':
      try {
        // find one user and return json
        const user = await User.findOne({ _id: userId })
        .select("-__v")
        .select("-password");

        if (!user) {
          res.status(404).end(`No User Found With This Id`);
          break;
        };
        res.status(200).json({ success: true, data: user });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'PUT':
      try {
        // can't use findOneAndUpdate and maintain hash password, so findOne and save()
        const user = await User.findOne({ _id: userId })
        .select("-__v");

        if (!user) {
          res.status(404).end(`No User Found With This Id`);
          break;
        };
        // only modify record portion if it's in the req.body
        if (req.body.email) {
        user.email = req.body.email;
        };
        if (req.body.password) {
        user.password = req.body.password;
        };
        // save method triggers the hash in the model pre.save
        await user.save();
        res.status(200).json({ success: true, data: `${user.email} has been updated.` });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'DELETE':
      try {
        // find one user and delete
        const user = await User.findOneAndDelete({ _id: userId })
        .select("-__v")
        .select("-password");

        if (!user) {
          res.status(404).end(`No User Found With This Id`);
          break;
        };
        res.status(200).json({ success: true, data: user });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    default:
      // in case the wrong header gets sent to this API, return header not accepted
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};