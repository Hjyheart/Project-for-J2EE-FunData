/**
 * Created by hongjiayong on 2016/11/23.
 */

var express = require('express');
var router = express.Router();
var _const = require('../const');

/* MyCenter Profile*/
router.get('/profile/:email', function (req, res, next) {
    request({
        url: `${_const.ServerHost}/profile`,
        method: 'POST',
        form: {
            name: req.params.email
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render('./mycenter/profile', {title : 'profile'});
});

/* MyCenter Information */
router.get('/information', function (req, res, next) {

    res.render('./mycenter/information', {title : 'information'});
});

/* MyCenter MyDataset */
router.get('/mydataset/:email', function (req, res, next) {
    request({
        url: `${_const.ServerHost}/dataset`,
        method: 'POST',
        form: {
            email: req.params.email
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render('./mycenter/mydataset', {title : 'mydataset'});
});

/* MyCenter MyCompetition */
router.get('/mycompetition/:email', function (req, res, next) {
    request({
        url: `${_const.ServerHost}/competition`,
        method: 'POST',
        form: {
            email: req.params.email
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render('./mycenter/mycompetition', {title : 'mycompetition'});
});

/* MyCenter MyMooc */
router.get('/mymooc/:email', function (req, res, next) {
    request({
        url: `${_const.ServerHost}/mooc`,
        method: 'POST',
        form: {
            email: req.params.email
        }
    }, function (err, response, body) {
        console.log(body);
    });
    res.render('./mycenter/mymooc', {title : 'mymooc'});
});

module.exports = router;