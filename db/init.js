var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

db.serialize(function() {
    console.log('create table articles')
    db.run(`CREATE TABLE IF NOT EXISTS articles 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL, 
                body TEXT NOT NULL,
                author TEXT NOT NULL,
                image TEXT NOT NULL,
                created TEXT NOT NULL
            )`)
    console.log('create table messages')
    db.run(`CREATE TABLE IF NOT EXISTS messages
            (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               author TEXT NOT NULL,
               body TEXT NOT NULL,
               aid INTEGER NOT NULL,
               reply TEXT,
               created TEXT NOT NULL
            )`)
})

db.close()




