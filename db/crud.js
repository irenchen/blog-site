var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

function insert() {
    db.serialize(function() {
        var insert = db.prepare("INSERT INTO articles (title, body, author, image, created) values (?, ?, ?, ? , ?)")
        insert.run('article test1', 'test1 test1', 'david', '/images/default.jpg', '2017-10-01')
        insert.run('article test2', 'test2 test2', 'allen', '/images/default.jpg', '2017-10-05')
        insert.run('article test3', 'test3 test3', 'joe', '/images/default.jpg', '2017-10-15')
        insert.run('article test4', 'test4 test4', 'rebecca', '/images/default.jpg', '2017-10-22')
        insert.run('article test5', 'test5 test5', 'carol', '/images/default.jpg', '2017-10-27')
        insert.run('article test6', 'test6 test6', 'mark', '/images/default.jpg', '2017-11-01')
        insert.finalize()
    })

    db.close()
}

function query() {
    db.serialize(function() {
        db.each('SELECT * FROM articles', function(err, row) {
            if(err) return console.error(err)
            console.log(`${row.id} : ${row.title} : ${row.body}`)
        })
    })
    
    db.close()
}

function remove(articleId) {
    db.serialize(function() {
        db.run('delete from articles where id = $id', {
            $id: articleId,
        }, function(err) {
            if(err) return console.log(err)
            db.close()
            console.log('delete article done')
        })
    })
}

function removeAll() {
    db.serialize(function() {
        db.run('delete from articles', function(err) {
            if(err) return console.log(err)
            db.close()
            console.log('delete all articles done')
        })
    })
}
insert()
// query()
// remove(3)
// removeAll()

