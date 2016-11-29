var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');

/* Dataset Home */
//render the home page
router.get('/', function(req, res, next) {
  res.render('./dataset/home', { title: 'Express' });
});

//get the dataset list
router.post('/', function(req, res, next) {
    var user_id = req.body.user_id;
    request({
        url: `${_const.ServerHost}/`,
        method: 'POST',

        body: `user_id=${user_id}`

    }, function (err, response, body) {
        console.log(body);
    });
})

/* Dataset Detail */
// TODO: 三个数据集区分我的和不是我的
router.get('/:datasetId/:datasetName/detail', function(req, res, next) {
    var db_id = req.params.datasetId;
    var db_name = req.params.datasetName;
    request({
        url: `${_const.ServerHost}/lookup`,
        method: 'POST',
        form: {
            db_id: db_id
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render('./dataset/detail', { title: db_name });
});

module.exports = router;
