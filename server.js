import express from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/customers", (req, res) => {
    res.send([{
        "id": 1,
        "image": "https://placeimg.com/64/64/1",
        "name": "홍길동",
        "birthday": "950406",
        "gender": "남자",
        "job": "학생"
      },{
        "id": 2,
        "image": "https://placeimg.com/64/64/2",
        "name": "이순신",
        "birthday": "600406",
        "gender": "남자",
        "job": "장군"
      },{
        "id": 3,
        "image": "https://placeimg.com/64/64/3",
        "name": "이황",
        "birthday": "550831",
        "gender": "남자",
        "job": "교수"
      }
    ]);
})

app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
})
 