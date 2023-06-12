const express = require('express')
var router = express.Router()
var db_model = require("../db")

let db = db_model.database;

router.post('/', (req, res, next) => { //this should post a new connection ride to the database

})

router.get('/', (req, res, next) => {
    db_model.getTable("junctions", (rows) => {
        res.json ({
            "message": "success",
            "data": rows
        })
    })
})

module.exports = router;