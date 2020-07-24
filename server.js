const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require('xlsx');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/datas", (req, res) => {

    const excelFile = xlsx.readFile( "name.xlsx" );
    const sheetName = excelFile.SheetNames[0];          
    const firstSheet = excelFile.Sheets[sheetName];   
    const jsonData = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } );
    res.send(jsonData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));