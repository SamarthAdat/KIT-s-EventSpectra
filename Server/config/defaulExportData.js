import mongoose from 'mongoose';
import fs from 'fs';
import { config } from 'dotenv';
import { Parser } from 'json2csv';
config();

async function defaultExportData() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO_URL);

        // Listen for the 'open' event to ensure the connection is established
        mongoose.connection.once('open', async () => {
            // Query MongoDB collections directly
            const clubData = await mongoose.connection.db.collection('clubs').find().toArray();
            const eventData = await mongoose.connection.db.collection('events').find().toArray();
            const companyData = await mongoose.connection.db.collection('companies').find().toArray();

            clubData.forEach(ele => {
                // console.log('ele',ele);
                delete ele._id,
                delete ele.thumbnail,
                delete ele. createdAt,
                delete ele.updatedAt,
                delete ele. __v,
                delete ele.eventId,
                delete ele.numberOfEvents
          
              })
              eventData.forEach(ele => {
                // console.log('ele',ele);
                delete ele._id,
                delete ele.thumbnail,
                delete ele. createdAt,
                delete ele.updatedAt,
                delete ele. __v,
                delete ele.clubId
          
              })
          
              companyData.forEach(ele => {
                // console.log('ele',ele);
                delete ele._id,
                delete ele.thumbnail,
                delete ele. createdAt,
                delete ele.updatedAt,
                delete ele. __v
                
                
          
              })

      let json2csvParser = new Parser();
      let clubCsv = json2csvParser.parse(clubData);
      let eventCsv = json2csvParser.parse(eventData);
      let companyCsv = json2csvParser.parse(companyData);
            // Write data to files
            fs.writeFileSync('MegaProject.clubs.csv', clubCsv);
                fs.writeFileSync('MegaProject.events.csv', eventCsv);
                fs.writeFileSync('MegaProject.companies.csv', companyCsv);

            // Close the Mongoose connection  await mongoose.connection.close();
        });
    } catch (err) {
        console.error('Error exporting data:', err);
    }
}




 export default defaultExportData;
