const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require('xlsx');
const fs = require("fs");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
console.log(conf);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

function handleDisconnect() {
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to connection:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function (err) {
    console.log("connection error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      return handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

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