var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

db.serialize(function() {
    console.log("create table articles")
    db.run(`CREATE TABLE IF NOT EXISTS articles 
            (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             title TEXT NOT NULL, 
             body TEXT NOT NULL,
             author TEXT NOT NULL,
             image TEXT NOT NULL,
             created TEXT NOT NULL
            )`)
})

db.close()




