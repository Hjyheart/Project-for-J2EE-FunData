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
router.get('/:id/:name/detail', function(req, res, next) {
    var course_name = req.params.name;
    var course_id = req.params.id;

    res.render('./mooc/detail', { title: course_name, name: course_name, id: course_id});
});

/* manger mooc */
router.get('/:id/:name/manager', function (req, res, next) {
   var course_name = req.params.name;
    var course_id = req.params.id;

   res.render('./mooc/manager', { title: course_name, moocId: course_id});
});

module.exports = router;