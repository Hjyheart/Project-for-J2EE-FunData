/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('constService', function () {
    // var ServerHost = 'http://10.60.42.202:8080';
    var ServerHost = 'http://localhost:8080';
    // var FrontHost = 'http://192.168.1.103:3000';
    var FrontHost = 'http://localhost:3000';
    var _const = {
        urls: {
            //auth
            setSession: `${FrontHost}/login`,
            getSession: `${FrontHost}/checkLogin`,
            register: `${FrontHost}/register`,
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
            createDataset: `${ServerHost}/createDataset`,
            downloadUrl: `${ServerHost}/dataset/downloadUrl`,
            // mooc
            getMoocScreenHotCourse: `${ServerHost}/course/screen_hot_course`,
            getMoocBoutique: `${ServerHost}/course/boutique_course/more/`,
            getOtherCourse: `${ServerHost}/course/boutique_course/more/`,
            freshMoocBoutique: `${ServerHost}/mooc/fresh-boutique`,
            freshMoocOther: `${ServerHost}/mooc/fresh-other`,
            getDetailInit: `${ServerHost}/course/`,
            // competition
            getMyCompetition: `${ServerHost}/competition/getInfo`,
            getCompetitions: `${ServerHost}/competition/show_competitions`,
            addCompetition: `${ServerHost}/competition/add`,
            getHostCompetitions: `${ServerHost}/competition/get_competition`,
            deleteCompetition: `${ServerHost}/competition/delete`,
            getCompetitionDetail: `${ServerHost}/competition/detail`

        }
    };

    this.urls = function () {
        return _const.urls;
    }

});
