var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

db.serialize(function() {
    console.log("create table myTable")
    db.run(`CREATE TABLE IF NOT EXISTS myTable 
            (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT NOT NULL, 
             age INT NOT NULL
            )`)
})

db.close()




