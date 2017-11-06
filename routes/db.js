var express = require('express')
var router = express.Router()
const multer = require('multer')
const upload = multer( { dest: './public/images/uploads' })
const dbService = require('../db/dbService')
const path = require('path')

/* GET all articles from database */
router.get('/article', (req, res, next) => {
  dbService.queryArticle()
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.get('/article/:offset/:limit', (req, res, next) => {
  dbService.queryArticle(req.params.offset, req.params.limit)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.get('/article/range/:start/:stop', (req, res, next) => {
  dbService.queryArticleByDate(req.params.start, req.params.stop)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.post('/article', upload.any(), (req, res, next) => {
  // console.log(req.files)
  // console.log(req.body)
  let newArticle = {
    author: req.body.author,
    title: req.body.title,
    youtube: req.body.youtube,
    body: req.body.body,
    image: req.files[0] ? '/images/uploads/' + req.files[0].filename : '/images/default.jpg'
  }
  dbService.createArticle(newArticle)
    .then(result => {
      console.log(result)
      return dbService.queryArticle()
    })
    .then(rows => res.json(rows))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.put('/article/:id', upload.any(), (req, res, next) => {
  // console.log(req.files)
  // console.log(req.body)
  let updatedArticle = {
    id: req.params.id,
    author: req.body.author,
    title: req.body.title,
    youtube: req.body.youtube,
    body: req.body.body,
    image: req.files[0] ? '/images/uploads/' + req.files[0].filename : req.body.orgImage
  }
  dbService.updateArticle(updatedArticle)
    .then(result => {
      console.log(result)
      return dbService.queryArticle()
    })
    .then(rows => res.json(rows))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.delete('/article/:id', (req, res, next) => {
  console.log(`delete article, id = ${req.params.id}`)
  dbService.deleteArticleById(req.params.id)
    .then(result => {
      return dbService.queryArticle()
    })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/article', (req, res, next) => {
  console.log(`delete all articles`)
  dbService.deleteAllArticles()
    .then(result => {
      res.json('delete all articles done')
    })
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/message', (req, res, next) => {
  dbService.queryAllMessage()
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.get('/message/:aid', (req, res, next) => {
  dbService.queryMessageByAid(req.params.aid)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.get('/message/not/replied', (req, res, next) => {
  dbService.queryMessageNotReplied()
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.get('/message/did/replied', (req, res, next) => {
  dbService.queryMessageDidReplied()
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.post('/message', upload.any(), (req, res, next) => {
  console.log(req.body)
  let newMessage = {
    author: req.body.author,
    body: req.body.body,
    aid: req.body.aid
  }
  dbService.createMessage(newMessage)
    .then(result => {
      console.log(result)
      return dbService.queryMessageByAid(req.body.aid)
    })
    .then(rows => res.json(rows))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.put('/message/:id', (req, res, next) => {
  console.log(req.body)
  console.log(req.params.id)
  dbService.updateMessageWithReply(req.params.id, req.body.reply)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.delete('/message/:id', (req, res, next) => {
  console.log(`delete message, id = ${req.params.id}`)
  dbService.deleteMessageById(req.params.id)
    .then(result => {
      res.json(result)
    })
    .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;
