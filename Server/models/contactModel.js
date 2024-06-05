import mongoose, { model } from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type:'String',
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
    message: {
        type:'String',
        required: [true,`Name is a required field`] ,
        trim: true ,

    },

},{
    timestamps:true
})

const contact = model('Contact',contactSchema)
export default contact