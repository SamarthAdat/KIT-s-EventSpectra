import {Router} from 'express'
import { createClub,removeClub,getAllClubs, getClubById, } from "../controllers/clubsController.js";
import {isLoggedIn,authorizedRoles} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { createEvent, deleteEvent, getAllEventsByClubID,updateEvent } from '../controllers/eventController.js';
import { register, unregister } from '../controllers/registartionController.js';

const router = Router();

router.route('/').get(getAllClubs) //tested
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    createClub) //tested



router.route('/:id')

.get(isLoggedIn, getClubById) //tested

.delete(isLoggedIn,
    authorizedRoles('ADMIN'),
    removeClub) //tested

// event routes
router.post('/:clubId/addEvent',isLoggedIn,authorizedRoles('ADMIN'),upload.single('thumbnail'),createEvent) //tested
router.post('/:id/updateEvent',isLoggedIn,authorizedRoles('ADMIN'),upload.single('thumbnail'),updateEvent)
router.get('/:clubId/events',isLoggedIn,
// authorizedRoles('ADMIN'),
getAllEventsByClubID) //tested
router.delete('/:clubId/events/:eventId',isLoggedIn,authorizedRoles('ADMIN'),deleteEvent) //tested

// registration routes
router.post('/:clubId/events/:eventId/register',isLoggedIn,authorizedRoles('USER'),register)
router.put('/:clubId/events/:eventId/unregister',isLoggedIn,authorizedRoles('USER'),unregister)





export default router;