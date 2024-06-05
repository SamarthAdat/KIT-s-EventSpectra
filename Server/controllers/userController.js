import AppError from "../utils/errorUtil.js"
import user from "../models/userModel.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import sendMail from "../utils/sendEmail.js"
import crypto from 'crypto'
import { configDotenv } from "dotenv"
import studentData from "../models/studentData.js"
import Company from '../models/companyModel.js'


configDotenv()

const cookieOptions = {
    maxAge: 1*24*60*60*1000, // 1 days
    httpOnly: true,
    secure: false
}

const register = async(req,res,next) =>{
    
    const {fullName,email,password,role} = req.body

    if(!fullName || !email || !password){
        return next(new AppError(500,`All fields are required`)) 
    }

    const userExists = await user.findOne({email})

    if(userExists){
        return next(new AppError(500,`User already exists !`))
    }

    const newUser = await user.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        },
        role
    })

    if(!newUser){
        return next(new AppError(500,`User registration failed, please try again`))
    }

    // IMAGE  FILE UPLOAD
    if(req.file){
        // console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
                width: 250,
                height: 250 ,
                gravity: 'faces',
                crop: 'fill'
            })

            if(result){
                newUser.avatar.public_id = result.public_id 
                newUser.avatar.secure_url = result.secure_url 

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError(500,`Cannot upload image, please try again`))
        }
    }


    // save user in DB
    await newUser.save()

    try {
        const subject = `Welcome to EventSpectra - Your Ultimate Event Management Hub for Kit College`
        const message = `<h1> Dear ${fullName}, </h1><br>
        <br>We are thrilled to inform you that your registration for EventSpectra, the premier event management platform for Kit College, has been successfully completed!🎉🎊
        <br><br>
       <p> Welcome aboard to a vibrant community dedicated to facilitating seamless participation in various events organized within Kit College. Whether you're looking forward to showcasing your talents, honing your skills, or simply immersing yourself in the enriching campus experience.<p>
     `

       sendMail(email,subject,message).then(result => console.log('Email sent....',result)).catch(error=>console.log('error:',error.message))
    } catch (error) {
        console.error('Error :',error.message)
    }

    // token generation
    const token = await newUser.generateJWTtoken()

    // put token into cookie
    res.cookie('token',token,cookieOptions) 

    newUser.password = undefined
    res.status(200).json({
        success: true ,
        message: `User registered successfully`, 
        newUser
    })
}

const login = async (req,res,next) =>{

    try {
        const {email,password} = req.body

        if(!email || !password){
            return next(new AppError(500,`All fields are required`))
        }

        // getting password explicitly because it was selected as false in schema
        const existingUser = await user.findOne({
            email
        }).select('+password')  

        if(!existingUser || !(await existingUser.comparePassword(password))){
            return next(new AppError(500,`Email & Password doesnt match`))
        }

        const token = await existingUser.generateJWTtoken()
        res.cookie('token',token,cookieOptions)

        existingUser.password = undefined
        
        res.status(200).json({
            success: true,
            message: `User logged in successfully`,
            existingUser
        })
    } catch (e) {
        return res.status(500).json({
            success: false ,
            message: e.message
        })
    }
    

}

const logout = (req,res) =>{
    res.cookie('token',null,{
        secure: true ,
        maxAge: 0 ,
        httpOnly: true
    })

    res.status(200).json({
        success :true ,
        message: `User logged out successfully`
    })
}

const getProfile = async (req,res,next) =>{
    try {
        const userId = req.user.id
        const userFromDB = await user.findById(userId)

        res.status(200).json({
            success:true,
            message: `User details found`,
            userFromDB
        })
    } catch (error) {
        return next(new AppError(500,`Failed to fetch profile`))
    }
}

const forgotPassword = async (req,res,next) =>{
    const {email} = req.body

    if(!email){
        return next(new AppError(500,`Please provide email`))
    }

    const userFromDB = await user.findOne({email}) 
    
    if(!userFromDB){
        return next(new AppError(500,`User not found with given email`))
    }
 
    const resetToken = await userFromDB.generatePasswordResetToken()
    console.log(`RESET TOKEN => ${resetToken}`)

    // save new user info with its token inside DB
    await userFromDB.save()

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    console.log(resetPasswordURL);
    const subject = `Reset Password`
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

    try {   
        await sendMail(email,subject,message)

        res.status(200).json({
            success: true ,
            message: `Reset password token has been sent to ${email} successfully`
        })
    } catch (error) {   
        user.forgotPasswordExpiry = undefined
        user.forgotPasswordToken = undefined 

        await userFromDB.save()

        return next(new AppError(500,error.message))
    }
}

const resetPassword = async(req,res,next) =>{
    const {resetToken} = req.params
    const {password} = req.body

    const forgotPasswordToken = await crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    const userExists = await user.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: {$gt: Date.now()  }
    })

    if(!userExists){
        return next(new AppError(500,`Token is invalid or expired, please try again`))
    }

    userExists.password = password
    userExists.forgotPasswordExpiry = undefined
    userExists.forgotPasswordToken = undefined

    userExists.save()

    res.status(200).json({
        success: true,
        message:`Password changed successfully !`
    })
}


const changePassword = async (req,res,next) =>{
    const {oldPassword, newPassword} = req.body
    const {id} = req.user
    
    if(!oldPassword || !newPassword){
        return next(new AppError(500,`All fields are mandatory`))
    }

    const userExists = await user.findById(id).select('+password')

    if(!userExists){
        return next(new AppError(500,`User doesnt exist`))
    }

    const isPasswordValid = await userExists.comparePassword(oldPassword)

    if(!isPasswordValid){
        return next(new AppError(500,`Old password invalid`))
    }

    userExists.password = newPassword   
    await   userExists.save()

    userExists.password = undefined

    res.status(200).json({
        success: true ,
        message: `Password changed successfully`
    })
}


const updateUser = async (req,res,next) =>{
    const {fullName} = req.body
    const id = req.user.id    

    const userExists = await user.findById(id)

    if(!userExists){
        return next(new AppError(500,`User doesnt exists`))
    }

    if(fullName){
        userExists.fullName = fullName
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(userExists.avatar.public_id)

        // copy paste from register function
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
                width: 250,
                height: 250 ,
                gravity: 'faces',
                crop: 'fill'
            })

            if(result){
                userExists.avatar.public_id = result.public_id 
                userExists.avatar.secure_url = result.secure_url 

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError(500,`Cannot upload image, please try again`))
        }   
    }

    await userExists.save()

    res.status(200).json({
        success: true ,
        message: `Profile changed successfully`
    })
}


const regitserStudentData = async (req,res,next) => {
    try {
        const {
            name,
            email,
            dob,
            primaryPhoneNumber ,
            secondaryPhoneNumber ,
            gender ,
            category ,
            city,
            permanentAddress ,
            state ,
            pincode ,
            aadhar ,
            pan ,
            licence ,
            yearOfPassing10th,
            percentage10th,
            boardName10th ,
            yearOfPassing12th,
            percentage12th,
            boardName12th,
            isDSY ,
            yearOfPassingDiploma ,
            diplomaSpecialzation ,
            percentageDiploma,
            prn,
            sem1SGPA,
            sem2SGPA ,
            sem3SGPA ,
            enggAggregatePercentage,
            numberOfActiveBacklogs ,
            numberOfYD,
            numberOfGap,
            reasonForGap
        } = req.body

        if(
            !name ||
            !email || 
            !dob || 
            !primaryPhoneNumber || 
            // !secondaryPhoneNumber ||
            !gender ||
            !category ||
            !city ||
            !permanentAddress ||
            !state ||
            !pincode ||
            !aadhar ||
            !pan ||
            !prn ||
            !yearOfPassing10th ||
            !percentage10th ||
            !boardName10th ||
            // !yearOfPassing12th ||
            // !percentage12th ||
            // !boardName12th ||
            !isDSY ||
            // !yearOfPassingDiploma ||
            // !diplomaSpecialzation ||
            // !percentageDiploma ||
            !sem1SGPA ||
            !sem2SGPA ||
            !sem3SGPA  ||
            !enggAggregatePercentage ||
            !numberOfActiveBacklogs ||
            !numberOfYD ||
            !numberOfGap 
            // ||
            // !reasonForGap
        ){
            return next(new AppError(500,'All fields are required !'))
        }

        const existingUser = await studentData.findOne({email})

        if(existingUser){
            return next(new AppError(500,'Data has been already filled by you'))
        }

        const newStudentData = await studentData.create({
            name,
            email,
            dob,
            primaryPhoneNumber ,
            secondaryPhoneNumber ,
            gender ,
            category ,
            city,
            permanentAddress ,
            state ,
            pincode ,
            aadhar ,
            pan ,
            licence ,
            yearOfPassing10th,
            percentage10th,
            boardName10th ,
            yearOfPassing12th,
            percentage12th,
            boardName12th,
            isDSY ,
            yearOfPassingDiploma ,
            diplomaSpecialzation ,
            percentageDiploma,
            prn,
            sem1SGPA,
            sem2SGPA ,
            sem3SGPA ,
            enggAggregatePercentage,
            numberOfActiveBacklogs ,
            numberOfYD,
            numberOfGap,
            reasonForGap
        })

        if(!newStudentData){
            return next(new AppError(500,'Error in creating new studentData'))
        }

        await newStudentData.save()

        res.status(200).json({
            success: true ,
            message: 'Student Data Submitted Successfully ',
        })


    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const getStudentRegistrationData =  async (req,res,next) => {
    try {
        const {companyId} = req.query
        console.log('cpyDetails', companyId);

        const studentRegistrationData = await studentData.find({})
        const companyDetails = await Company.findById(companyId)

        const filteredStudents = studentRegistrationData.map(e => {
            if(
                e.percentage10th >= companyDetails.sscEligibility &&
                e.enggAggregatePercentage >= companyDetails.enggEligibility && 
                (e.percentageDiploma!=null)?(e.percentageDiploma >= companyDetails.hscEligibility ):e.percentage12th >= companyDetails.hscEligibility &&
                
                e.numberOfGap <= companyDetails.gapYears
                // ative backlogs & DSY logic yet to be written
            ){
                return e
            }
        })

        console.log('filteredStudents',filteredStudents)

        // const studentRegistrationDataArray = [studentRegistrationData]
        // console.log(studentRegistrationData.map(e => e.dob))

        // console.log(typeof studentRegistrationDataArray)

        // console.log(`Student reg data: ${studentRegistrationDataArray}`)
        // console.log(`company data: ${companyDetails}`)

        if(!studentRegistrationData){
            return next(new AppError(500,'studentData not found'))
        }

        res.status(200).json({
            success: true ,
            message: 'StudentData found',
            filteredStudents
        })
    } catch (error) {
        return next(new AppError(500,error.message))
    }
}
export {register,login,logout,getProfile,forgotPassword,resetPassword,changePassword,updateUser,regitserStudentData,getStudentRegistrationData}