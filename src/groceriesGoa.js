// Using Google Sheets API
const dotenv = require('dotenv');
dotenv.config()
const { GoogleSpreadsheet }= require('google-spreadsheet');

const creds = require('../client_secret.json');

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1H1lqgXKSnWXo5duqajZRnJxflXbxyrkKsROqpKhERS0');
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      })
      .then(() => {
        doc.loadInfo()
           .then(() => {
            const sheet = doc.sheetsByIndex[0]
            console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
           })
           .catch(err => console.error(err))
      })
      .catch(err => console.error(err));


    
}


accessSpreadsheet()