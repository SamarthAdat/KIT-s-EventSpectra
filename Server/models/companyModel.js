import mongoose from "mongoose";

const addCompanySchema = new mongoose.Schema({
    companyName:{
        type : String,
        required: [true,`Company Name is Required`],
        trim:true,
        maxLength:[60,`max length of title is 60 characters only`]
    },
    sscEligibility: {
        type: Number ,
        required: [true, 'SSC Eligibility is required !']
    },
    hscEligibility: {
        type: Number ,
        required: [true, 'HSC Eligibility is required !']
    },
    enggEligibility: {
        type: Number ,
        required: [true, 'Engg. Eligibility is required !']
    },
    activeBacklogs: {
        type: Boolean, 
        required: [true, 'Active Backlog data is required !']
    },
    gapYears: {
        type: Number, 
        required: [true, 'Gap Year data is required !']
    },
    description:{
        type: String,
        // maxLength: [200,`max length of title is 200 characters only`],
        required: [true,`Description is required`]
    },
    tagline:{
        type: String,
        // maxLength: [200,`max length of title is 200 characters only`],
        required: [true,`tagline is required`]
    },
    thumbnail: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        }
    },
    jobRole:{
        type: String,
        required: [true,`Category is required`]
    },
    arrivalDate: {
        // type: Date, 
        type: String, 
        required: [true, 'Arrival Date is required']
    },
    jdDocument:{
        type : String
    }
    
},{timestamps:true})

const Company = mongoose.model('Company',addCompanySchema)

export default Company