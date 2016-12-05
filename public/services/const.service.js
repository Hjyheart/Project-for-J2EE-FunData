/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('constService', function () {
    var ServerHost = 'http://localhost:8080';
    var _const = {
        urls: {
            // dataset
            getHotProject: `${ServerHost}/dataset/getHotProject`,
            getMyProject: `${ServerHost}/dataset/getMyProject`,
            getMyContribute: `${ServerHost}/dataset/getMyContribute`,
            getPullRequest: `${ServerHost}/dataset/getPullRequest`,
            getComment: `${ServerHost}/dataset/getComment`,
            getContent: `${ServerHost}/dataset/getContent`,
            // mooc
            getMoocInit: `${ServerHost}/mooc/init`,
            freshMoocBoutique: `${ServerHost}/mooc/fresh-boutique`,
            freshMoocOther: `${ServerHost}/mooc/fresh-other`,
            getDetailInit: `${ServerHost}/mooc/detail/init`

        }
    };

    this.urls = function () {
        return _const.urls;
    }

});