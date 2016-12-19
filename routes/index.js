var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


/* GET login page. */
router.get('/login', function (req, res, next) {
   res.render('login', { title: "Login"});
});

router.post('/login', (req, res, next) => {
    console.log(req.query);
    request({
        url: `${_const.ServerHost}/authorize/login`,
        method: 'POST',
        form: {
            email: req.query.email,
            pwd: req.query.pwd
        }
    }, function (err, response, body) {
        console.log(body)
        var body = JSON.parse(body);
        if(body.username){
            res.send(body.username);
        }
        else{
            res.send("");
        }


    })

});

router.post('/checkLogin', function (req, res, next) {
    console.log(req.cookies);
    res.send(req.cookies.username);
});

/* GET test page */
router.get('/test', function (req, res, next) {
   res.render('error', { title: "test"});
});

/* GET register page */
router.get('/register', function (req, res, next) {
    res.render('register', { title: "register"});
});

router.post('/register', (req, res, next) => {
    request({
        url: `${_const.ServerHost}/authorize/register`,
        method: 'POST',
        form: {
            email: req.query.email,
            pwd: req.query.pwd,
            name: req.query.name,
        }
    }, function (err, response, body) {
        var body = JSON.parse(body);
        if(body.username){
            res.send(body.username);
        }
        else {
            res.send("");
        }


    })
});

/* Get other's profile */
router.get('/other/:name', function(req, res, next) {
    var username = req.params.name;
    res.render('otherprofile', { title: 'Other\'s profile', username: username });
});


/* for testing */
router.get('/test', function (req, res, next) {
    res.render('./dataset/detail', { title: 'detail'});
});


module.exports = router;
