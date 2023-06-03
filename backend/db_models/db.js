var sqlite3 = require("sqlite3")

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message)
        throw err;
    }
    else {
        console.log("connected to db")
        // db.run (`CREATE TABLE users (
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     name text, 
        //     email text UNIQUE, 
        //     password text, 
        //     CONSTRAINT email_unique UNIQUE (email)
        //     )`, (err) => {
        //     if (err)
        //     {

        //         throw err
        //     }
        //     else {
        //         var insert = `insert into users (name, email, password) VALUES (?, ?, ?)`
        //         db.run(insert, ["admin", "admin@example.com", "admin1234"])
        //         db.run(insert, ["user", "user@example.com", "12345"])
        //     }
        // })
    }
})

module.exports = db;