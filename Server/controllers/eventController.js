import event from '../models/eventModel.js';
import registration from '../models/registrationModel.js';
import Club from '../models/clubsModel.js'
import AppError from "../utils/errorUtil.js";
import cloudinary from 'cloudinary'
import fs from 'fs'
import sendMail from '../utils/sendEmail.js';


const createEvent = async (req,res,next) => {
    try {
        const {clubId} = req.params
        const {eventName,tagline,description,eventDate,eventTime } = req.body

        if(!clubId || !eventName || !description || !tagline || !eventDate || !eventTime){
            return next(new AppError(500,'all fields are required'))
        }

        const newEvent = await event.create({
            eventName,
            tagline,
            description,
            clubId,
            eventDate,
            eventTime,
            thumbnail:{
                public_id:'Dummy',
                secure_url:'Dummy'
               }
        })

        if(!newEvent){
            return next(new AppError(500,'error in creating new event'))
        }

        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms'
            })
          
            if(result){
              newEvent.thumbnail.public_id = result.public_id;
              newEvent.thumbnail.secure_url = result.secure_url;
            }
          //  fs.rm(`../uploads/${req.file.filename}`)
        }

        // update event array in club
        await Club.findByIdAndUpdate(
            clubId,
            {$push :{eventId: newEvent._id}}
        )

        await newEvent.save()

        res.status(200).json({
            success: true ,
            message: 'new event created',
            newEvent
        })

    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const getAllEventsByClubID = async (req,res,next) => {
    try {
        const {clubId} = req.params

        if(!clubId){
            return next(new AppError(500,'clubId is required',))
        }

        const club = await Club.findById(clubId)
        
        if(!club){
            return next(new AppError(500,'error in fetching events'))
        }

        const events =  await Promise.all(club.eventId.map( e =>  event.findById(e))) 

        res.status(200).json({
            success: true ,
            message: 'fetched all events',
            events
        })

    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const deleteEvent = async (req,res,next) => {
    try {
        const {eventId,clubId} = req.params

        if(!eventId || !clubId){
            return next(new AppError(500,'all fields are required'))
        }

        await Club.findByIdAndUpdate(clubId,{$pull: {eventId: eventId}}) 

        await event.findByIdAndDelete(eventId)

        res.status(200).json({
            success: true ,
            message: 'event deleted !'
        })
    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const getAllEvents = async (req,res,next) => {
    try {
        const events = await  event.find({})

        res.status(200).json({
            success:true,
            message: "All events.",
            events
        });

    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const getEventById = async (req,res,next) => {
    try {
        const {id} = req.params

        if(!id){
            return next(new AppError(500,
            'ID is required'))
        }

        const eventFromDB = await event.findById(id)

        if(!eventFromDB){
            return next(new AppError(500,'Event does not exist'))
        }

        res.status(200).json({
            success: true ,
            message: 'event found',
            eventFromDB
        })
    } catch (error) {
        return next(new AppError(500,error.message))
    }
}

const updateEvent = async (req,res,next) =>{
    try {
        const {id} = req.params
        console.log('id',id);
        const updateData = {
            ...req.body,
          //  thumbnail: req.file ? req.file.buffer : undefined // Handle the thumbnail if it's present
        };
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
        const eventUpdated = await event.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        if(!eventUpdated){
            res.status(500).json({
                success: false,
                message: 'Unable to find event with given id !'
        })
        }

        await eventUpdated.save();
       
        

        const getUpdatedEvent = await event.findById(id)

        let eventInfo = await event.findById(id)
        let clubInfo = await Club.findById(eventInfo.clubId)
 
        let eventImage = eventInfo.thumbnail;
        console.log('eventImagw',eventImage);
        console.log('evet',eventInfo);
        console.log('club info:',clubInfo);
         let eventDate = new Date(eventInfo.eventDate).toDateString();
      
             let registerStudents = await registration.find({eventId:id})
             console.log('registrStudent',registerStudents);
             let filteredStudentTosendMail = registerStudents.map(el=>el.email);
             console.log('filter ',filteredStudentTosendMail);
             for (let i = 0; i < filteredStudentTosendMail.length; i++) {
                 
                 const subject = `Update on- ${eventInfo.eventName}`;
                 const message = `
                 <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                   <h1 style="color: #4CAF50;">Hello Participant,</h1>
                   <p>I hope this message finds you well. We are excited to provide you with the latest update on our upcoming event, <strong>${eventInfo.eventName}</strong>.</p>
                   
                   <ul style="list-style-type: none; padding: 0;">
                     <li><strong>Event Name:</strong> ${eventInfo.eventName}</li>
                     <li><strong>Event Description:</strong> ${eventInfo.description}</li>
                     <li><strong>Event Date:</strong> ${new Date(eventInfo.eventDate).toDateString()}</li>
                     <li><strong>Event Time:</strong> ${eventInfo.eventTime}</li>
                   </ul>
                   
                   <p>Please feel free to reach out if you have any questions or need further information. We look forward to seeing you there!</p>
                   
                   <p>Best regards,</p>
                   <p><strong>Team EventSpectra</strong></p>
                 </div>
               `;
               
              await sendMail(filteredStudentTosendMail[i],subject,message).then(result => console.log('Email sent....',result)).catch(error=>console.log('error:',error.message))
                next();
                             
             }
                



        res.status(200).json({
            success: true,
            message: `event updated successfully !`,
            getUpdatedEvent
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
} 

const sendReminderEmails = async (req, res, next) => {
    try {
        const { eventId } = req.params;

        if (!eventId) {
            return next(new AppError('Event ID is required', 400));
        }

        const eventInfo = await event.findById(eventId);
        if (!eventInfo) {
            return next(new AppError('Event not found', 404));
        }

        const registeredStudents = await registration.find({ eventId });
        const participantEmail = registeredStudents.map(student => student.email);
        console.log('send Emilas',participantEmail);
        const subject = `Reminder: Upcoming Event - ${eventInfo.eventName}`;
        const message = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #4CAF50;">Hello Participant,</h1>
                <p>Just a reminder about the upcoming event, <strong>${eventInfo.eventName}</strong>.</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Event Name:</strong> ${eventInfo.eventName}</li>
                    <li><strong>Event Description:</strong> ${eventInfo.description}</li>
                    <li><strong>Event Date:</strong> ${new Date(eventInfo.eventDate).toDateString()}</li>
                    <li><strong>Event Time:</strong> ${eventInfo.eventTime}</li>
                </ul>
                <p>We look forward to seeing you there!</p>
                <p>Best regards,</p>
                <p><strong>Team EventSpectra</strong></p>
            </div>
            <b>Warm Regards,<b>
            <br>
            <b> Team EventSpectra<b>
            
        `;

        for (const email of participantEmail) {
            await sendMail(email, subject, message);
           
        }
        // next();
        res.status(200).json({
            success: true,
            message: 'Reminder emails sent successfully',
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export {createEvent,getAllEventsByClubID,deleteEvent,getAllEvents,getEventById,updateEvent,sendReminderEmails}
