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
            getMyContribute: `${ServerHost}/dataset/getMyDataset`,
            getPullRequest: `${ServerHost}/dataset/getPullRequest`,
            getComment: `${ServerHost}/dataset/getComment`,
            getContent: `${ServerHost}/dataset/getDemoContent`,
            comment: `${ServerHost}/dataset/comment`,
            confirmRequest: `${ServerHost}/dataset/confirmRequest`,
            getConfirmRequest: `${ServerHost}/dataset/getConfirmRequest`,
            uploadFile: `${ServerHost}/dataset/uploadFile`,
            checkUpload: `${ServerHost}/dataset/checkUpload`,
            createDataset: `${ServerHost}/dataset/createDataset`,
            downloadUrl: `${ServerHost}/dataset/downloadUrl`,
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