const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./mydb.db')

const query = (offset = 0, limit = 18) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from articles order by id desc
                    limit $limit offset $offset`,{
                        $limit: limit,
                        $offset: offset
                    }, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    })
}

const createArticle = (newArticle) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            let now = new Date()
            db.run(`insert into articles 
                    (author, title, body, image, created) values 
                    ($author, $title, $body, $image, $created)`, {
                      $author: newArticle.author,
                      $title: newArticle.title,
                      $body: newArticle.body,
                      $image: newArticle.image,
                      $created: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}` 
                    }, err => {
                        if(err) return reject(err)
                        console.log(`this : ${JSON.stringify(this, null, 2)}`)
                        resolve(`insert new article done`)
                    })
        })
    })
}

const updateArticle = (updatedArticle) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            let now = new Date()
            db.run(`update articles 
                    set author = $author, title = $title, body = $body,
                        image = $image where id = $id`, {
                      $id: updatedArticle.id,
                      $author: updatedArticle.author,
                      $title: updatedArticle.title,
                      $body: updatedArticle.body,
                      $image: updatedArticle.image,
                    }, err => {
                        if(err) return reject(err)
                        console.log(`this : ${JSON.stringify(this, null, 2)}`)
                        resolve(`update article done`)
                    })
        })
    })
}

const deleteArticleById = (articleId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('delete from articles where id = $id', {
                $id: articleId,
            }, err => {
                if(err) return reject(err)
                resolve(`delete article id : ${articleId} done`)
            })
        })
    })
}

const deleteAllArticles = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('delete from articles', err => {
                if(err) return reject(err)
                resolve('delete all articles done')
            })
        })
    })
}



module.exports.query = query
module.exports.createArticle = createArticle
module.exports.updateArticle = updateArticle
module.exports.deleteArticleById = deleteArticleById
module.exports.deleteAllArticles = deleteAllArticles


