const express = require("express");

const app = express();
const cors = require("cors");
const users = require("./routes/users")
require("dotenv").config();
const PORT = process.env.PORT
// middleware
// const corsOptions = {
//     // origin: "http://localhost:3000/" // frontend URI (ReactJS)
// }
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

app.use("/users", users)

app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

