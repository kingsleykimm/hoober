var sqlite3 = require("sqlite3").verbose()

const DBSOURCE = "./db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message)

    }})

exports.getTable = (db_name, callback) => {
    var sql = "select * from " + db_name;
    db.all(sql, (err, rows) => {
        if (err) {console.log(err)}
        else { callback(rows) }
    })


}

exports.createTables = () => {

        db.run (`CREATE TABLE users (
            NAME VARCHAR(255) PRIMARY KEY NOT NULL,
            PASSWORD VARCHAR(255) NOT NULL,
            EMAIL VARCHAR(255),
            PHONE NUMBER VARCHAR(255)
            )`, (err) => {
            if (err)
            {           
                console.log(err)     
            }

        })
        db.run(`CREATE TABLE requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            USER VARCHAR(255) NOT NULL,
            SPLITGAS VARCHAR(255) NOT NULL,
            DESTINATION VARCHAR(255) NOT NULL,
            DEPARTUREDATE DATE NOT NULL,
            DESCRIPTION VARCHAR(255) NOT NULL,
            FOREIGN KEY (USER) REFERENCES users(NAME)
        )`, (err) => {
            if (err) { }
        })

        db.run(`CREATE TABLE rides (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            USER VARCHAR(255) NOT NULL,
            RIDERS INTEGER NOT NULL,
            SPLITGAS VARCHAR(255) NOT NULL,
            DESTINATION VARCHAR(255) NOT NULL,
            DEPARTUREDATE DATE NOT NULL,
            DESCRIPTION VARCHAR(255) NOT NULL,
            DEPARTURELOCATION VARCHAR(255) NOT NULL,
            FOREIGN KEY (USER) REFERENCES users(NAME)
        )`, (err) => {
            if (err) { }
        })
}


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
    db.run('DROP TABLE users', (err) => console.log(err))
    db.run('DROP TABLE REQUESTS', (err) => console.log(err))
    db.run("DROP TABLE RIDES", (err) => console.log(err))
}
exports.database = db