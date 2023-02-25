import connection from '../../../db/connection';
import { Volunteer } from '../../../db/models';
import { withSessionRoute } from "../../../lib/config/withSession";


// ../api/volunteers routes here

export default withSessionRoute(handler);

async function handler(req, res) {
  const { method } = req;

  if (!req.session.user) {
    res.status(401).end(`Unauthorized`);
    return;
  }

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
      // create a new volunteer and return json
      try {
        const volunteer = await Volunteer.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          preferredName: req.body.preferredName,
          email: req.body.email,
          phoneNumber: req.body.phone,
          CRM_ID: req.body.CRM_ID,
          dateStarted: req.body.dateStarted,
          volunteerType: req.body.volunteerType,
          lastCOI: req.body.lastCOI,
          lastBackgroundCheck: req.body.lastBackgroundCheck,
          lastMissionConversation: req.body.lastMissionConversation,
          staffPartner: req.body.staffPartner,
          techNeeded: req.body.techNeeded,
          notes: req.body.notes
        })
        res.status(201).json({ success: true, data: volunteer });
      } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: err });
      }
      break;
    default:
      // in case the wrong header gets sent to this API, return header not accepted
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  };
};
