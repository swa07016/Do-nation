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

app.get("/api/general_donation_data", (req, res) => {
  const sql_getData = `SELECT * FROM G_Donation;`;
  connection.query(sql_getData, (err, rows, fields) => {
    if (rows.length) {
      return console.log(rows);
    }else{
      console.log("No data");
    }
  });
});

app.get("/api/general_donation_records", (req, res) => {
  const gr_Id = req.body.id;
  const sql = `SELECT * FROM GD_Record WHERE gr_Id = ${gr_Id};`;
  connection.query(sql, (err, rows, fields) => {
    if (rows.length) {
      return res.send(rows);
    }else{
      console.log("No data");
    }
  });
});

app.post("/api/general_donation_records", (req, res) => {
  const data = req.body;
  
  const sql_post =
  "INSERT INTO GD_Record(gr_Id,donatorName,donatedMoney,donationTime) VALUES(?,?,?,?);";
  const donatedMoney = data.donatedMoney;
  const params = [
    data.gr_Id,
    data.donatorName,
    data.donatedMoney,
    data.donationTime,
  ];
  console.log(params);
  
  connection.query(sql_post, params, (err, rows, fields) => {
    if (err) {
      res.send({
        code: 400,
        message: "error",
      });
    } else {
      const sql_getRaised =`SELECT * FROM G_Donation WHERE id=${data.gr_Id};`;
      connection.query(sql_getRaised, params, (err, rows, fields) => {
        if(err){
          res.send({
            code: 401,
            message: "error",
          });
        }else{
          console.log(rows[0]);
          const raisedMoney = rows[0].raised + donatedMoney;
          const sql_updateRaised =`UPDATE G_Donation SET raised = ${raisedMoney} WHERE id=${data.gr_Id};`;
          connection.query(sql_updateRaised, params, (err, rows, fields) => {
            if(err){
              res.send({
                code: 402,
                message: "error",
              });
            }else{

            }
          });
        }
      });
      res.send({
        code: 200,
        message: "success",
      });
    }
  });
});

app.get("/api/corona_donation_records", (req, res) => {
  const cr_Id = 1; //req.body.id; 로 교체예정
  let sql_usercheck = `SELECT * FROM CD_Record WHERE cr_Id = ${cr_Id};`;
  connection.query(sql_usercheck, (err, rows, fields) => {
    if (rows.length) {
      return res.send(rows);
    }else{
      console.log("No data");
    }
  });
});

app.post("/api/corona_donation_records", (req, res) => {
  const data = req.body;
  const sql =
    "INSERT INTO CD_Record(cr_Id,donatorName,donatedMoney,donatedGoods,donationTime) VALUES(?,?,?,?,?);";
  const params = [
    data.cr_Id,
    data.donatorName,
    data.donatedMoney,
    data.donatedGoods,
    data.donationTime,
  ];
  console.log(params);
  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      res.send({
        code: 400,
        message: "error",
      });
    } else {
      res.send({
        code: 200,
        message: "success",
      });
    }
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));