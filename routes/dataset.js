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
});

/* Dataset Detail */
// TODO: 三个数据集区分我的和不是我的

router.get('/:datasetName/detail', function(req, res, next) {
    var db_name = req.params.datasetName;
    console.log(db_name)
    res.render('./dataset/detail', { title: db_name });
});

/* Dataset Manager */
router.get('/:datasetName/manage', function (req, res, next) {

    var db_name = req.params.datasetName;
   res.render('./dataset/manage', {title: db_name});
});

module.exports = router;
