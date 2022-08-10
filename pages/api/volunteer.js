import connection from '../../db/connection';
import { Volunteer } from '../../db/models';

export default async function handler(req, res) {
  const { method } = req;

  await connection();

  switch (method) {
    case 'GET':
      try {
        const volunteers = await Volunteer.find({});
        res.status(200).json({ success: true, data: volunteers });
      } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: err });
      };
      break;
    case 'POST':
      try { 
        const volunteer = await Volunteer.create(req.body);
        res.status(201).json({ success: true, data: volunteer });
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
