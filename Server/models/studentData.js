import mongoose, { model } from "mongoose";

const studentDataSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: [true,`Name is a required field`] ,
        trim: true ,
    },
    email:{
        type:'String',
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 
    },
    dob: {
        type: 'String',
        required: [true,`DOB is a required field`] ,
    },
    primaryPhoneNumber: {
        type: 'Number',
        required: [true,`primaryPhoneNumber is a required field`] ,
    },
    secondaryPhoneNumber: {
        type: 'Number'
    },
    gender: {
        type: 'String',
        required: [true,`Gender is a required field`] ,
    },
    category: {
        type: 'String',
        required: [true,`category is a required field`] 
    },
    city: {
        type: 'String',
        required: [true,`City is a required field`] ,
    },
    permanentAddress: {
        type: 'String',
        required: [true,`permanentAddress is a required field`] ,
    },
    state: {
        type: 'String',
        required: [true,`state is a required field`] ,
    },
    pincode: {
        type: 'Number',
        required: [true,`pincode is a required field`] ,
    },
    aadhar: {
        type: 'Number',
        required: [true,`aadhar is a required field`] ,
    },
    pan: {
        type: 'String',
        required: [true,`pan is a required field`] ,
    },
    licence: {
        type: 'String'
    },
    yearOfPassing10th: {
        type: 'Number',
        required: [true,`yearOfPassing10th is a required field`] ,
    },
    percentage10th: {
        type: 'Number',
        required: [true,`percentage10th is a required field`] ,
    },
    boardName10th: {
        type: 'String',
        required: [true,`boardName10th is a required field`] ,
    },
    yearOfPassing12th: {
        type: 'String'
    },
    percentage12th: {
        type: 'Number'
    },
    boardName12th: {
        type: 'String' ,
    },
    isDSY: {
        type: 'String',
        required: [true,`isDSY is a required field`] ,
    },
    yearOfPassingDiploma: {
        type: 'String'
    },
    diplomaSpecialzation: {
        type: 'String'
    },
    percentageDiploma: {
        type: 'Number'
    },
    prn:{
        type: 'Number',
        required: [true, 'PRN is required']
    },
    sem1SGPA: {
        type: 'Number',
        required: [true,`sem1SGPA is a required field`] ,
    },
    sem2SGPA: {
        type: 'Number',
        required: [true,`sem2SGPA is a required field`] ,
    },
    sem3SGPA: {
        type: 'Number',
        required: [true,`sem3SGPA is a required field`] ,
    },
    enggAggregatePercentage: {
        type: 'Number',
        required: [true,`Engg Aggregate is a required field`] ,
    },
    numberOfActiveBacklogs:{
        type: 'Number',
        required: [true,`number of active backlogs is a required field`] ,
    },
    numberOfYD: {
        type: 'Number',
        required: [true,`numberOfYD is a required field`] ,
    },
    numberOfGap: {
        type: 'Number',
        required: [true,`numberOfGap is a required field`]
    },
    reasonForGap: {
        type: 'String'
    }
},{
    timestamps: true
})

const studentData = model('StudentData', studentDataSchema)
export default studentData

