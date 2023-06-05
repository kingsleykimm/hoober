const express = require("express")
var router = express.Router()
var db_model = require("../db")

const db = db_model.database

router.post ('/', async (req, res) => {
    //username, password, confirmPassword
    try {
        var c = await db_model.addUser(req.body)
        res.json({userExists: false})
    }
    catch {
        res.json({userExists: true})
    }

})

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





module.exports = router;