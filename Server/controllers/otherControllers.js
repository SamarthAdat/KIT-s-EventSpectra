import AppError from "../utils/errorUtil.js"
import contact from "../models/contactModel.js"
import  tpoUpdate from "../models/tpoUpdateModel.js"


const contactUs = async (req,res,next) => {
    try {
        const {name, email, message} = req.body

        if(!name || !email || !message){
            return next(new AppError(500,`All fields are required`))
        }

        const newSuggestion = await contact.create({
            name, email, message
        })

        if(!newSuggestion){
            return next(new AppError(500,`Error in submitting suggestion ...`))
        }

        await newSuggestion.save()

        res.status(200).json({
            success: true ,
            message: 'Message submitted successfully',
            newSuggestion
        })



    } catch (error) {
        return res.status(500).json({
            success: false ,
            message: error.message
        })
    }
}

const tpo_Update = async (req,res,next) => {
    try {
        const {data} = req.body

        if(!data){
            return next(new AppError(`All fields are required`,500))
        }

        const newTpoUpdate = await tpoUpdate.create({ data})

        if(!newTpoUpdate){
            return next(new AppError(`Error in submitting data ...`,500))
        }

        await newTpoUpdate.save()

        res.status(200).json({
            success: true ,
            message: 'Data submitted successfully',
            newTpoUpdate
        })
    } catch (error) {
        return res.status(500).json({
            success: false ,
            message: error.message
        })
    }
}

const getUpdateData = async (req,res,next)=> {
    try {
        const updateData = await tpoUpdate.find({})

        res.status(200).json({
            success: true ,
            message: 'Data received successfully',
            updateData
        })
    } catch (error) {
        
    }
}

export {contactUs,tpo_Update, getUpdateData}