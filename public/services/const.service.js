/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('constService', function () {
    var ServerHost = 'http://localhost:8080';
    var _const = {
        urls: {
            getHotProject: `${ServerHost}/dataset/getHotProject`,
            getMyProject: `${ServerHost}/dataset/getMyProject`,
            getMyContribute: `${ServerHost}/dataset/getMyContribute`,
            getPullRequest: `${ServerHost}/dataset/getPullRequest`,
            getComment: `${ServerHost}/dataset/getComment`,
            getContent: `${ServerHost}/dataset/getContent`,
        }
    };

    this.urls = function () {
        return _const.urls;
    }

})