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

router.put('/', async(req, res) => {
    db_model.updateRide(req.body).then( (value) => {
        if(value) {
            res.json({message: "success"})
        }
        else {
            res.json({message: "failure"})
        }
    })

    // i {
    //     await db_model.updateRide(req.body)
    //     res.json({message: "success"})
    // }
    // catch {
    //     res.json({message: "failure"})
    // }
})

router.put('/u', async(req, res) => {
    try {

        await db_model.deleteRide(req.body)
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