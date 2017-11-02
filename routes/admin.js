var express = require('express');
var router = express.Router();

const adminuser = process.env.adminuser || 'allen'
const adminpass = process.env.adminpass || '123'

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.cookies.user === 'admin') {
    res.render('admin')
  } else {
    res.redirect('/admin/login')
  }  
})

router.get('/login', function(req, res, next) {
  if(req.cookies.user === 'admin') {
    res.render('admin')
  } else {
    res.render('adminlogin')
  }  
})

router.post('/login', function(req, res, next) {
  console.log('test')
  console.dir(req.body)
  if(req.body.user === adminuser && req.body.pass === adminpass) {     
       res.cookie('user', 'admin', {
         expires: new Date(new Date().getTime() + 86400000)
       })
       res.redirect('/admin')
  } else {
    res.render('adminlogin')
  }
});

router.get('/logout', function(req, res, next) {
  if(req.cookies.user === 'admin') {
    res.cookie('user', 'admin', {
      expires: new Date(new Date().getTime() - 86400000)
    })
    res.render('adminlogin')
  } else {
    res.render('adminlogin')
  }  
})

module.exports = router;
