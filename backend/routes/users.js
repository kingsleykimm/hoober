const express = require("express")
var router = express.Router()
var db_model = require("../db")


const db = db_model.database

router.post('/login', (req, res, next) => {
    const inc = req.body

    db.get(`Select * from users where name = "${inc.username}"`, function (err, user) {

        if (err) { console.log(err)
            res.json ({message: "loginError"})}
        else if (!user) {res.json ( {message : "noUser"})}
        else {
            if (user["PASSWORD"] != inc.password)
                res.json({message: "wrongPwd"})
            else 
                res.json ({message : "Success"})
        }
    })

})

router.post('/', async (req, res) => {
    //username, password, confirmPassword
    try {
        var c = await db_model.addUser(req.body)
        res.json({ userExists: false })
    }
    catch {
        res.json({ userExists: true })
    }

})

router.get('/', (req, res, next) => {
    db_model.getTable("users", (rows) => {
        res.json ({
            "message": "success",
            "data": rows
        })
    })
})
//Code for PassportJS authentication used from documentation

router.post ('/email', (req, res, next) => {
    
})



module.exports = router;