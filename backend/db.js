var sqlite3 = require("sqlite3").verbose()

const DBSOURCE = "./db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message)
        throw err;
    }
    else {
        console.log("connected to db")
        db.run (`CREATE TABLE users (
            NAME VARCHAR(255) PRIMARY KEY,
            PASSWORD VARCHAR(255) NOT NULL
            )`, (err) => {
            if (err)
            {                
            }

        })

        db.run(`CREATE TABLE requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            request_name text

        )`, (err) => {
            if (err) {}
        })
    }
})

exports.addUser = (user) => {
    return new Promise ((resolve, reject) => {
    let statement = `INSERT INTO users (name, password) VALUES (?, ?)`
    db.run(statement, [user["username"], user["password"]], 
        (err) => {
            if (err) {
                reject(false)
            }
            else {
                resolve(true)
            }
        }
    )})
}

exports.reset = () => {
    db.run('DROP TABLE USERS')
    db.run('DROP TABLE REQUESTS')
}
exports.database = db