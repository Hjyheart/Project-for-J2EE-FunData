/**
 * Created by hongjiayong on 2016/11/23.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var _const = require('../const');

/* MyCenter Profile*/
// TODO 名字 email follow人数 注册时间 我的数据集 我的竞赛 我的mooc
router.get('/profile/:email', function (req, res, next) {
    // request({
    //     url: `${_const.ServerHost}/profile`,
    //     method: 'POST',
    //     form: {
    //         name: req.params.email
    //     }
    // }, function (err, response, body) {
    //     console.log(body);
    // });
    res.render('./mycenter/profile', {title : 'profile', userName: 'luo xue'});
});

/* MyCenter Information */
router.get('/information', function (req, res, next) {
   res.render('./mycenter/information', {title : 'information'});
});

/* MyCenter Friends */
router.get('/friends', function (req, res, next) {
    res.render('./mycenter/friends', {title : 'friends'});
});

// TODO 异步嵌套
module.exports = router;