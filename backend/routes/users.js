const express = require("express")
var router = express.Router()
var db = require("../db_models/db")
var bodyParser = require('body-parser')

router.get('/', (req, res, next) => {
    var sql = "select * from users"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error" : err.message})
            return;
        }
        res.json ({
            "message" : "success",
            "data" : rows
        })
    })

})

router.get('/add', (req, res, next) => {
    res.send("Got to add")

})

router.use(bodyParser.json())

router.post ('/', (req, res) => {
    console.log(req.body)

})


module.exports = router;