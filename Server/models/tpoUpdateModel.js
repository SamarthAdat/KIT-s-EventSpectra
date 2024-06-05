import mongoose, { model } from "mongoose";


const tpoUpdateSchema = new mongoose.Schema({
    data: {
        type:'String',
        required: [true,`tpoUpdate is a required field`] ,
        trim: true ,
    }
},{
    timestamps: true
})

const tpoUpdate = model('tpoUpdate',tpoUpdateSchema)

export default tpoUpdate