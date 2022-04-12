const express = require("express");
const mysql = require("mysql2");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // parse incoming json to an object in order to access in our req handlers

app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

//CRUD CREATE READ UPDATE DELETE
// POST GET UPDATE/PUT DELETE

app.post("/users", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const country = req.body.country;
    const city = req.body.city;
    const postcode = req.body.postcode;

    const sqlInsert = `INSERT INTO INFO (firstname, lastname, email, country, city, postcode) VALUES ('${firstname}','${lastname}','${email}','${country}','${city}',${postcode})`;
    pool.execute(sqlInsert, function (err, result) {
        if (err) {
            throw err;
        }
    });
});

app.get("/users", (req, res) => {
    const sqlSelect = "SELECT * FROM INFO";

    pool.execute(sqlSelect, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

//CREATE TABLE
// CREATE TABLE `INFO` (
// 	`ID` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
// 	`firstname` VARCHAR(20) DEFAULT '',
// 	`lastname` VARCHAR(20) DEFAULT '',
// 	`email` VARCHAR(50),
// 	`country` VARCHAR(20),
// 	`city` VARCHAR(20),
// 	`postcode` INT(20)
// );

//INSERT DATA
// INSERT INTO INFO (firstname, lastname, email, country, city, postcode)
// VALUES ('Manos','Vasilakis','manos8991@gmail.com','Greece','Athens','11853');

module.exports = app;
