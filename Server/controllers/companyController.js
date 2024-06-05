import Company from "../models/companyModel.js";
import AppError from "../utils/errorUtil.js";
// import fs from 'fs'
import multer from 'multer'
 
import cloudinary from 'cloudinary'

const getAllCompany = async(req,res)=>{
    try {
        const company = await   Company.find({})
        if(!company){
            res.status(500).json({
                success: false,
                message: 'All fields are required !'
        })
    }
    
   
        res.status(200).json({
            success: true,
            message: 'All company found !',
            company
        })
}
catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    }) 
 }
} 

const createnewCompany = async(req,res,next)=>{
    try {
        const {companyName,sscEligibility,hscEligibility,enggEligibility,activeBacklogs,gapYears,description,jobRole,arrivalDate,tagline} = req.body

        // const {thumbnail} = req.file

        if(!companyName || !sscEligibility || !hscEligibility || !enggEligibility || !activeBacklogs || !gapYears || !description || !jobRole || !arrivalDate ||!tagline){
            return next(new AppError(400,'All fields are required'))
        }
    
        const existingCompany = await Company.findOne({companyName})
        if(existingCompany){
            return next(new AppError(400,'Company with given name already exists'))
        }

        const newCompany = await Company.create({
            companyName,
            tagline, 
            sscEligibility, 
            hscEligibility, 
            enggEligibility, 
            activeBacklogs, 
            gapYears, 
            description, 
            jobRole, 
            arrivalDate,
            thumbnail:{
                public_id:'Dummy',
                secure_url:'Dummy'
            }
    
        })

        if(!newCompany){
            return next(new AppError(400,'Error in creating company ! '))
        }
    
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms'
            })
          
            if(result){
                newCompany.thumbnail.public_id = result.public_id;
                newCompany.thumbnail.secure_url = result.secure_url;
            }
        //    fs.rm(`../uploads/${req.file.filename}`)
          }
    
        await newCompany.save()
        res.status(200).json({
            success: true,
            message: 'New Comapny Added Successfully!',
            newCompany
        })
    } catch (error) {
        return next(new AppError(400,error.message))
    }
}

const updateCompany = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('req body  :', req.body.thumbnail);
  
      // Create update data from req.body
      const updateData = { ...req.body };
  
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms',
        });
  
        if (result) {
          updateData.thumbnail = {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
        }
      }
  
      console.log('id', id);
  
      const companyUpdated = await Company.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
  
      if (!companyUpdated) {
        return res.status(500).json({
          success: false,
          message: 'Unable to find company with given id!',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Company updated successfully!',
        companyUpdated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

let sendEmailToShortListedStudent =  async (req,res,next) => {
    try {
        const {companyId} = req.query
        // console.log('cpyDetails', companyId);

        const studentRegistrationData = await studentData.find({})
        const companyDetails = await Company.findById(companyId)
        console.log('comapnyDetails',companyDetails);
        const filteredStudents = studentRegistrationData.map(e => {
            if(
                e.percentage10th >= companyDetails.sscEligibility &&  
                e.enggAggregatePercentage >= companyDetails.enggEligibility && 
                (e.percentageDiploma!=null)?(e.percentageDiploma >= companyDetails.hscEligibility ):e.percentage12th >= companyDetails.hscEligibility &&
                e.numberOfGap <= companyDetails.gapYears
                // ative backlogs & DSY logic yet to be written
            ){
                return e.email
            }
        })

        for (let i = 0; i < filteredStudents.length; i++) {
            
            try {
                const subject = ` Congratulations on Being Shortlisted for ${companyDetails.companyName}`
                const message = `<h1>Dear Candidate</h1>
                <br>I hope this email finds you well. I am pleased to inform you that you have been shortlisted for the next stage of the selection process for the ${companyDetails.jobRole} at ${companyDetails.companyName} . This is a fantastic achievement, and we are excited to see your hard work and dedication paying off.
                <br><br>
               <p> Please make sure to check your email regularly for updates from  our office. Additionally, if you have any questions or need further assistance, do not hesitate to reach out to us.<p>
    
                <br><br><br>
                <h4>With Warm Regards,</h4>
                <h4>TPO Office KIT's College Of Engineering.</h4>
               `
        
              await sendMail(filteredStudents[i],subject,message).then(result => console.log('Email sent....',result)).catch(error=>console.log('error:',error.message))
            } catch (error) {
                console.error('Error :',error.message)
            }
        }
        
      //  console.log('filteredStudents',filteredStudents)

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


const removeCompany = async (req,res) =>{
    const {id} = req.params

    const courseToBeDeleted = await Company.findById(id)

    if(!courseToBeDeleted){
        res.status(500).json({
            success: false,
            message: 'Unable to find comapny with given id!'
    })
    }

    await Company.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message: `Company deleted successfully`,
    })

} 


export{getAllCompany,createnewCompany,removeCompany,updateCompany,sendEmailToShortListedStudent}