import connection from '../../../db/connection'

import { Volunteer } from '../../../db/models';

// .../api/volunteers/[volunteerId] routes here

export default async function handler(req, res) {
  const { method } = req;
  const volunteerId = req.query.volunteerId;

  // connect to db
  await connection();

  switch (method) {
    case 'GET':
      try {
        // find one volunteer and return json
        const volunteer = await Volunteer.findOne({ _id: volunteerId })
          .select("-__v");
        if (!volunteer) {
          res.status(404).end(`No Volunteer Found With This Id`);
          break;
        };
        res.status(200).json({ success: true, data: volunteer });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'PUT':
      try {
        // find volunteer one and update, no password here so no need for findOne and save()
        const volunteer = await Volunteer.findOneAndUpdate({ _id: volunteerId }, req.body, {
          new: true,
          runValidators: true,
        })
          .select("-__v");

        if (!volunteer) {
          res.status(404).end(`No Volunteer Found With This Id`);
          break;
        };
        res.status(200).json({ success: true, data: volunteer });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'DELETE':
      try {
        // find one volunteer and delete
        const volunteer = await Volunteer.findOneAndDelete({ _id: volunteerId })
          .select("-__v");
        if (!volunteer) {
          res.status(404).end(`No Volunteer Found With This Id`);
          break;
        };
        res.status(200).json({ success: true, data: volunteer });
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