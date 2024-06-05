import { Router } from "express";
import upload from '../middleware/multerMiddleware.js'
import { getAllCompany,updateCompany,removeCompany,createnewCompany } from "../controllers/companyController.js";
import { sendEmailToShortListedStudent } from '../controllers/companyController.js';
import {isLoggedIn,authorizedRoles} from '../middleware/authMiddleware.js'

const router = new Router()

router.route('/')

.get(isLoggedIn,getAllCompany) //tested
.post(isLoggedIn,authorizedRoles('ADMIN'),
upload.single('thumbnail'),
createnewCompany) 

router.route('/:id')
    .get(isLoggedIn)
    .post(isLoggedIn,authorizedRoles('ADMIN'),upload.single('thumbnail'),updateCompany) //tested
    .delete(isLoggedIn,authorizedRoles('ADMIN'),removeCompany) //tested
    .post(isLoggedIn,authorizedRoles('ADMIN'))

router
.get('/sendEmail',isLoggedIn,authorizedRoles('ADMIN'), sendEmailToShortListedStudent)

    export default router