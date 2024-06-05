import {Router} from 'express'
import { getAllEvents, getEventById } from '../controllers/eventController.js';
import { sendReminderEmails } from '../controllers/eventController.js';


const router = Router();

router.get('/',getAllEvents);
router.get('/:id',getEventById);
router.post('/:eventId/reminder', sendReminderEmails);


export default router
