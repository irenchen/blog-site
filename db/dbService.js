const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./mydb.db')

const queryArticle = (offset = 0, limit = 18) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from articles
                    order by id desc
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

const queryArticleByDate = (start, stop, offset = 0, limit = 18) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from articles 
                    where created >= $start and created <= $stop
                    order by id desc
                    limit $limit offset $offset`,{
                        $start: start,
                        $stop: stop,
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
                    (author, title, body, image, created, youtube) values 
                    ($author, $title, $body, $image, $created, $youtube)`, {
                      $author: newArticle.author,
                      $title: newArticle.title,
                      $body: newArticle.body,
                      $image: newArticle.image,
                      $created: convertDateToString(now),
                      $youtube: newArticle.youtube 
                    }, err => {
                        if(err) return reject(err)
                        resolve(`insert new article done`)
                    })
        })
    })
}

function convertDateToString(now) {
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    let d = now.getDate().toString() // 1 -> 01, 10 -> 10
    d = d.length == 1 ? '0' + d : d
    return `${y}-${m}-${d}`
}

const updateArticle = (updatedArticle) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            let now = new Date()
            db.run(`update articles 
                    set author = $author, title = $title, body = $body,
                        image = $image, youtube = $youtube where id = $id`, {
                      $id: updatedArticle.id,
                      $author: updatedArticle.author,
                      $title: updatedArticle.title,
                      $body: updatedArticle.body,
                      $image: updatedArticle.image,
                      $youtube: updatedArticle.youtube,
                    }, err => {
                        if(err) return reject(err)
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

const queryAllMessage = (offset = 0, limit = 100) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from messages
                    order by id desc
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

const queryMessageByAid = (aid, offset = 0, limit = 18) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from messages where aid = $aid
                    order by id desc
                    limit $limit offset $offset`,{
                        $aid: aid,
                        $limit: limit,
                        $offset: offset
                    }, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    })
}

const queryMessageNotReplied = (offset = 0, limit = 30) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from messages
                    where reply is null
                    order by id desc
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

const queryMessageDidReplied = (offset = 0, limit = 100) => {    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`select * from messages
                    where reply is not null
                    order by id desc
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

const createMessage = (newMessage) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`insert into messages 
                    (aid, author, body, created) values 
                    ($aid, $author, $body, $created)`, {
                      $aid: newMessage.aid,
                      $author: newMessage.author,
                      $body: newMessage.body,
                      $created: (new Date()).toLocaleString() 
                    }, err => {
                        if(err) return reject(err)
                        resolve(`insert new message done`)
                    })
        })
    })
}

const updateMessageWithReply = (mid, reply) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`update messages 
                    set reply = $reply
                    where id = $id`, {
                      $id: mid,
                      $reply: reply,
                    }, err => {
                        if(err) return reject(err)
                        resolve(`update message done`)
                    })
        })
    })
}

const deleteMessageById = (messageId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('delete from messages where id = $id', {
                $id: messageId,
            }, err => {
                if(err) return reject(err)
                resolve(`delete message id : ${messageId} done`)
            })
        })
    })
}


module.exports.queryArticle = queryArticle
module.exports.queryArticleByDate = queryArticleByDate
module.exports.createArticle = createArticle
module.exports.updateArticle = updateArticle
module.exports.deleteArticleById = deleteArticleById
module.exports.deleteAllArticles = deleteAllArticles

module.exports.queryAllMessage = queryAllMessage
module.exports.queryMessageByAid = queryMessageByAid
module.exports.queryMessageNotReplied = queryMessageNotReplied
module.exports.queryMessageDidReplied = queryMessageDidReplied
module.exports.createMessage = createMessage
module.exports.updateMessageWithReply = updateMessageWithReply
module.exports.deleteMessageById = deleteMessageById




