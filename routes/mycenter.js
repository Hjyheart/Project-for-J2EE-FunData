/**
 * Created by hongjiayong on 2016/11/23.
 */

var express = require('express');
var router = express.Router();

/* MyCenter Profile*/
router.get('/profile', function (req, res, next) {
   res.render('./mycenter/profile', {title : 'profile'});
});

/* MyCenter Information */
router.get('/information', function (req, res, next) {
   res.render('./mycenter/information', {title : 'information'});
});

/* MyCenter MyDataset */
router.get('/mydataset', function (req, res, next) {
    res.render('./mycenter/mydataset', {title : 'mydataset'});
});

/* MyCenter MyCompetition */
router.get('/mycompetition', function (req, res, next) {
    res.render('./mycenter/mycompetition', {title : 'mycompetition'});
});

/* MyCenter MyMooc */
router.get('/mymooc', function (req, res, next) {
    res.render('./mycenter/mymooc', {title : 'mymooc'});
});

module.exports = router;