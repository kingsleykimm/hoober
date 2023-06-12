const express = require("express")
var router = express.Router()
var db_model = require("../db")
const db = db_model.database

router.post ('/', async (req, res) => { //posts a new ride to the database
    try {
        await db_model.addRide(req.body)
        res.json({message: "Success"})
    }
    catch {
        res.json({message : "Failure"})
    }
})


router.get('/', (req, res, next) => { //gets all the rides in the database
    db_model.getTable("rides", (rows) => {
        res.json ({
            "message": "success",
            "data": rows
        })
    })
})

router.get('/u', async (req, res, ) => {
    db_model.getUserRides(req.query.user, (rows) => {
        res.json({
            data: rows,
        })
    })

})

module.exports = router