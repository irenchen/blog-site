var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

db.serialize(function() {
    console.log("drop table myTable")
    db.run("DROP TABLE mytable")
})

db.close()




