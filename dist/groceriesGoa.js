var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dotenv = require('dotenv');
dotenv.config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const sheets = require('../sheets-secrets.json');
function accessSpreadsheet(clientEmail, clientPvtKey) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("fn called");
        const doc = new GoogleSpreadsheet(process.env.SHEET_TO_BE_ACCESSED);
        console.log("getting service account");
        doc.useServiceAccountAuth({
            client_email: clientEmail,
            private_key: clientPvtKey,
        })
            .then(() => {
            console.log("Got sheet");
            doc.loadInfo()
                .then(() => {
                console.log("Loaded doc. Accessing sheet data");
                const sheet = doc.sheetsByIndex[0];
                console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
                const rows = sheet.getRows()
                    .then((response) => {
                    console.log("response");
                });
            })
                .catch(err => console.error(err.response.data));
        })
            .catch(err => console.error(err));
    });
}
accessSpreadsheet(process.env.SHEETS_CLIENT_EMAIL, process.env.SHEETS_CLIENT_PRIVATE_KEY);
//# sourceMappingURL=groceriesGoa.js.map