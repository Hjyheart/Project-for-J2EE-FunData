/**
 * Created by hongjiayong on 2016/11/25.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');


/* get mooc home */
router.get('/', function (req, res, next) {
    res.render('./mooc/home', { title: "mooc"});
});

/* get mooc detail */
router.get('/:name/detail', function(req, res, next) {
    var course_name = req.params.name;

    res.render('./mooc/detail', { title: course_name});
});

/* manger mooc */
router.get('/:name/manager', function (req, res, next) {
   var course_name = req.params.name;

   res.render('./mooc/manager', { title: course_name});
});

module.exports = router;