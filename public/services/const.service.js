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
            getMyProject: `${ServerHost}/dataset/getMyDataset`,
            getMyContribute: `${ServerHost}/dataset/getMyContribute`,
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
            getMoocScreenHotCourse: `${ServerHost}/course/screen_hot_course`,
            getMoocBoutique: `${ServerHost}/course/boutique_course/`,
            getOtherCourse: `${ServerHost}/course/boutique_course/`,
            freshMoocBoutique: `${ServerHost}/mooc/fresh-boutique`,
            freshMoocOther: `${ServerHost}/mooc/fresh-other`,
            getDetailInit: `${ServerHost}/course/`

        }
    };

    this.urls = function () {
        return _const.urls;
    }

});
