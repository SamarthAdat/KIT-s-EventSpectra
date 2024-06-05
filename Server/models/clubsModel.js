import mongoose, { Schema, model } from 'mongoose'

const createClub = new Schema(
    {
        
        clubName: {
            type: String,
            required: [true, 'Club name is required'],
            minlength: [4, 'Title must be atleast 8 characters'],
            maxlength: [50, 'Title cannot be more than 50 characters'],
            trim: true,
          },
          description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [20, 'Description must be atleast 20 characters long'],
          },
          thumbnail: {
            public_id: {
              type: String,
            },
            secure_url: {
              type: String,
            },
          },
          eventId :[{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'event'
          }],
          tagline: {
            type: String,
            required: [true, 'Club name is required'],
          }
          
        },
        {
          timestamps: true,
        }
    
   
)

const Club = model('Club',createClub);
export default Club;