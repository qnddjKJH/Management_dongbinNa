import fs from "fs";
import express from "express";
import morgan from "morgan";
import mysql from "mysql";
import multer from "multer";

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: "./upload" });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/image', express.static("./upload"));


const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
})
connection.connect();

app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
      (err, rows, fields) => {
        res.send(rows);
      }
  )
})


app.post("/api/customers", upload.single('image'), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
  let image = '/image/' + req.file.filename;
  let name = req.body.userName;
  let birthDay = req.body.birthDay;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthDay, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
  })
})


app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
})
 