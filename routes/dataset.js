var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');

/* Dataset Home */
router.get('/', function(req, res, next) {
  res.render('./dataset/home', { title: 'Express' });
});

router.get('/lookup', function(req, res, next) {
    res.render('./dataset/lookup', { title: 'Express' });
});

/* Dataset Detail */
router.get('/:datasetName/detail', function(req, res, next) {
    var db_name = req.params.datasetName;

    request({
        url: `${_const.ServerHost}/lookup`,
        method: 'POST',
        form: {
            db_name: db_name
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render('./dataset/detail', { title: db_name });
});

module.exports = router;
