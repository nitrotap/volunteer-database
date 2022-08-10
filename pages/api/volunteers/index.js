import connection from '../../../db/connection';
import { Volunteer } from '../../../db/models';

// ../api/volunteers routes here

export default async function handler(req, res) {
  const { method } = req;

  // connect to db
  await connection();

  switch (method) {
    case 'GET':
      try {
        // find all volunteers and return json
        const volunteers = await Volunteer.find({});
        res.status(200).json({ success: true, data: volunteers });
      } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'POST':
      try { 
        // create volunteer and return json
        const volunteer = await Volunteer.create(req.body);
        res.status(201).json({ success: true, data: volunteer });
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
