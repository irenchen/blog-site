var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

function insert() {
    db.serialize(function() {
        var insert = db.prepare("INSERT INTO myTable (name, age) values (?, ?)")
        insert.run('joe', 25)
        insert.finalize()
    })

    db.close()
}

// insert()

function query() {
    db.serialize(function() {
        db.each('SELECT * FROM mytable', function(err, row) {
            console.log(`${row.id} : ${row.name} : ${row.age}`)
        })
    })
    
    db.close()
}

query()


