import registration from '../models/registrationModel.js';
import AppError from "../utils/errorUtil.js";
import sendMail from '../utils/sendEmail.js';

const register = async (req,res,next) => {
    try {
        const {collegeName,department,year} = req.body 
        const {eventId} = req.params
        const email = req.user.email
        const fullName = req.user.fullName

        if(!collegeName || !department || !year || !eventId){
            return next(new AppError(500,'all fields are required'))
        }

       const alreadyExists = await registration.findOne({email})

       if(alreadyExists){
            if (alreadyExists.eventId.includes(eventId)) {
                return next(new AppError(500,'already registered to this event'))
            } else {
                alreadyExists.eventId.push(eventId)
                await alreadyExists.save()
            }
       }else{
            const newRegistration = await registration.create({
                collegeName ,
                department,
                year ,
                email ,
                fullName,
                isRegistered: true ,
                eventId: [eventId] 
            })

            // console.log('one');
            await newRegistration.save()
       }

       const subject = `Confirmation of Event Registration - ${eventInfo.eventName}`
        const message = `<h1> Dear ${fullName},</h1>
                        <h4>
                        We are delighted to inform you that your registration for the upcoming event, ${eventInfo.eventName} has been successfully received and confirmed!
                        </h4><br>
                        <img src=${eventImage.secure_url} alt="Image">
                        <p>Event Details:
                        <li>Club Name: ${clubInfo.clubName}</li>
                        <li>Event Name: ${eventInfo.eventName}</li>
                        <li>Event Description: ${eventInfo.description}
                        </li></p><br>
                        <p>
                        Your participation in this event is greatly appreciated, and we're excited to have you join us for what promises to be an engaging and memorable experience.
                        <br>
                        Please make sure to arrive at the venue on time and be prepared to participate to the best of your abilities. If there are any specific requirements or preparations needed for the event, we will communicate them to you well in advance.
                        </p>
                        <p>
                        Should you have any questions or require further information, feel free to reach out to us at eventspectra7781@gmail.com . We are here to assist you in any way possible.
                        </p>
                        <br>
                        We look forward to seeing you at the event and wish you the best of luck!
                        <br><br><br>
                        Warm regards,<br>
                        Team ${clubInfo.clubName}
                        `
        try {
            await sendMail(email,subject,message).then(result => console.log('Email sent....',result)).catch(error=>console.log('error:',error.message))

        } catch (error) {
            console.error(`Error :`,error.message);
        }   

        res.status(200).json({
            success: true ,
            message: 'registered successfully'
        })

    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const unregister = async (req,res,next) => {
    try {
        const {eventId} = req.params
        const email = req.user.email

        if(!eventId){
            return next(new AppError(500,"EventID is required"))
        }

        const isRegisteredToAnyEvent = await registration.findOne({email})

        if(!isRegisteredToAnyEvent){
            return next(new AppError(500,"Not registered to any event"))
        }

        if(!isRegisteredToAnyEvent.eventId.includes(eventId)){
            return next(new AppError(500,"Not registered to this event"))
        }

        await registration.findOneAndUpdate({email},{$pull: {eventId: eventId}})

        res.status(200).json({
            success: true ,
            message: 'un-registered successfully'
        })
        
    } catch (error) {
        return next(new AppError(500,error.message))
    }
} 

const getEventsByRegistration = async (req,res,next) => {
    try {
        const email = req.user.email

        if(!email){
            return next(new AppError(500,'all fields are required'))
        }

        const user = await registration.findOne({email})

        if(!user){
            return next(new AppError(500,'Not registered to any event'))
        }

        
        res.status(200).json({
            success: true ,
            message: 'Found events for which user has registered' ,
            eventId: user.eventId
        })

    } catch (error) {
        return next(new AppError(500,error.message))
    }
}
export {register,unregister,getEventsByRegistration}