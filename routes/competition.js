/**
 * Created by hongjiayong on 2016/12/1.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');

/* Get competition home page */
router.get('/', function (req, res, next) {
    res.render('./competition/home', {title: 'competition'});
});

/* Get specific competition page */
router.get('/:competitionId/:competitionName/detail', function (req, res, next) {
    var com_name = req.params.competitionName;
    console.log('in');
    res.render('./competition/detail', {title: com_name});
});

/* Get competition manage page */
router.get('/:competionId/:competitionName/manage', function (req, res, next) {
    var com_name = req.params.competitionName;
    res.render('./competition/manage', {title: com_name});
});

module.exports = router;