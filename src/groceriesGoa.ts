// Using Google Sheets API
const dotenv = require('dotenv');
dotenv.config()
const { GoogleSpreadsheet }= require('google-spreadsheet');

const sheets = require('../sheets-secrets.json');

async function accessSpreadsheet(clientEmail, clientPvtKey) {
    // const clientEmail = process.env.SHEETS_CLIENT_EMAIL;
    // const clientPvtKey = process.env.SHEETS_CLIENT_PRIVATE_KEY;
    console.log("fn called")
    const doc = new GoogleSpreadsheet(process.env.SHEET_TO_BE_ACCESSED);
    console.log("getting service account")
     doc.useServiceAccountAuth({
      client_email: clientEmail,
      private_key: clientPvtKey,
    })
      .then(() => {
        console.log("Got sheet")
        doc.loadInfo()
           .then(() => {
             console.log("Loaded doc. Accessing sheet data")
            const sheet = doc.sheetsByIndex[0]
            console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
            const rows =  sheet.getRows()
                               .then((response) =>{
                                 console.log("response")
                               })
           })
           .catch(err => console.error(err.response.data))
      })
      .catch(err => console.error(err));


    
}

accessSpreadsheet(process.env.SHEETS_CLIENT_EMAIL, process.env.SHEETS_CLIENT_PRIVATE_KEY)