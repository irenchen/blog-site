var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

db.serialize(function() {
    console.log("drop table articles")
    db.run("DROP TABLE articles")
})

db.close()




