import nodemailer from "nodemailer";
import {google} from 'googleapis'
import { config } from 'dotenv'
config()



const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
// async..await is not allowed in global scope, must use a wrapper

async function sendMail(email,subject,message) {
  try {
      const accessToken = await oAuth2Client.getAccessToken()

      const transport = nodemailer.createTransport({
          service : 'gmail',
          auth : {
              type : 'OAUTH2',
              user : 'eventspectra7781@gmail.com',
              clientId : process.env.CLIENT_ID,
              clientSecret : process.env.CLIENT_SECRET,
              refreshToken : process.env.REFRESH_TOKEN,
              accessToken : accessToken
          }
      })

      const mailOptions = {
          from : `EVENTSPECTRA 📧 <eventspectra7781@gmail.com>`,

          to : email,

          subject : subject,

          html : message


      };

      const result = await transport.sendMail(mailOptions);

      return result

  } catch (error) {
      return error
  }
}
export default sendMail;
