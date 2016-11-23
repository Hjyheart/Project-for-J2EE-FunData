var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
   res.render('login', { title: "login"});
});

router.post('/login', (req, res, next) => {

    var email = req.body.email;


    request({
        url: `${_const.ServerHost}/login`,
        method: 'POST',
        form: {
            email: email,
            pwd: req.body.pwd
        }
    }, function (err, response, body) {
        console.log(body);

    })

});

/* GET test page */
router.get('/test', function (req, res, next) {
   res.render('error', { title: "test"});
});

/* GET register page */
router.get('/register', function (req, res, next) {
    res.render('register', { title: "register"});
});

router.post('/register', () => {
    request({
        url: `${_const.ServerHost}/register`,
        method: 'POST',
        form: {
            email: req.body.email,
            pwd: req.body.pwd,
            f_name: req.body.f_name,
            l_name: req.body.l_name
        }
    }, function (err, response, body) {
        console.log(body);

    })
});

module.exports = router;
