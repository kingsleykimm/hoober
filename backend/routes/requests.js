const express = require("express")
var router = express.Router()
var db_model = require("../db")
const db = db_model.database

router.post ('/', async (req, res) => { //posts a new ride to the database
    try {
        await db_model.addRequest(req.body)
        res.json({message: "Success"})
    }
    catch {
        res.json({message : "Failure"})
    }
})

router.put('/', async(req, res) => {
    db_model.updateRequest(req.body).then( (value) => {
        if(value) {
            res.json({message: "success"})
        }
        else {
            res.json({message: "failure"})
        }
    })
})
router.get('/', (req, res, next) => { //gets all the rides in the database
    db_model.getTable("requests", (rows) => {
        res.json ({
            "message": "success",
            "data": rows
        })
    })
})

router.get('/u', async (req, res, ) => {
    db_model.getUserRequests(req.query.user, (rows) => {
        res.json({
            data: rows,
        })
    })

})
router.put('/u', async(req, res) => {
    try {

        await db_model.deleteRequest(req.body)
        res.json({message: "Success"})
    }
    catch {
        res.json({message : "Failure"})
    }
})
module.exports = router