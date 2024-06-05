import { Router } from "express";
import { changePassword, forgotPassword, getProfile, getStudentRegistrationData, login, logout, register, regitserStudentData, resetPassword, updateUser } from "../controllers/userController.js";
import {authorizedRoles, isLoggedIn} from "../middleware/authMiddleware.js";
import upload from '../middleware/multerMiddleware.js'
import { getEventsByRegistration } from "../controllers/registartionController.js";

const router = Router()

// ROUTES
router.post('/register',upload.single('avatar'),register) //tested
router.post('/login',login) //tested
router.get('/logout',logout) //tested
router.get('/me',isLoggedIn,getProfile ) //tested
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:resetToken',resetPassword)
router.post('/change-password',isLoggedIn,changePassword) //tested
router.post('/update',isLoggedIn,upload.single('avatar'),updateUser) //tested
router.get('/me/registered-events',isLoggedIn,getEventsByRegistration)
router.post('/student-data', isLoggedIn, authorizedRoles('USER'), regitserStudentData )
router.get('/get-student-data', isLoggedIn, getStudentRegistrationData )

export default router 