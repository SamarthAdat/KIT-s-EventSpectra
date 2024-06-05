import mongoose, { model } from "mongoose";

const registrationSchema = new mongoose.Schema({
    eventId:[{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'event'
    }],
    isRegistered: {
        type: Boolean,
        enum: ['true','false'],
        default: 'false'
    },
    collegeName:{
        type:String,
        required:[true,'college-name is req']
    },
    department:{
        type:String,
        required: true
    },
    year:{
        type:String,
        required: true
    },
    fullName:{
        type:'String',
        required: true
    },
    email:{
        type: String,
        required: true
    }

},{timestamps:true})

const registration = model('Registration',registrationSchema)

export default registration