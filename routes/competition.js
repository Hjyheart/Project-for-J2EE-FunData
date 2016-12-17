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
router.get('/:competitionId/detail', function (req, res, next) {
    var com_id = req.params.competitionId;
    res.render('./competition/detail', {title: 'competition detail', comId: com_id});
});

/* Get competition manage page */
router.get('/:competitionId/manage', function (req, res, next) {
    var com_id = req.params.competitionId;
    res.render('./competition/manage', {title: "manage", comId: com_id});
});

module.exports = router;