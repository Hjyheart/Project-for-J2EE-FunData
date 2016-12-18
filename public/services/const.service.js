/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('constService', function () {
    var ServerHost = 'http://localhost:8080';
    //var ServerHost = 'http://192.168.1.9:8080';
    // var ServerHost = 'http://10.60.42.202:8080';
    //var ServerHost = 'http://192.168.1.4:8080';
    var ServerHost = 'http://localhost:8080';
    var FrontHost = 'http://localhost:3000';
    var _const = {
        urls: {
            //auth
            setSession: `${FrontHost}/login`,
            getSession: `${FrontHost}/checkLogin`,
            register: `${FrontHost}/register`,
            confirmTitle: `${ServerHost}/dataset/confirmTitle`,
            confirmFile: `${ServerHost}/dataset/confirmFile`,
            getUserProfile: `${ServerHost}/authorize/user`,
            changePwd: `${ServerHost}/authorize/edit`,
            // dataset
            getHotProject: `${ServerHost}/getHotProject`,
            getMyProject: `${ServerHost}/dataset/getMyDataset`,
            getMyContribute: `${ServerHost}/dataset/getMyContribute`,
            getPullRequest: `${ServerHost}/dataset/getPullRequest`,
            getComment: `${ServerHost}/dataset/getComment`,
            getContent: `${ServerHost}/dataset/getDemoContent`,
            comment: `${ServerHost}/dataset/comment`,
            confirmRequest: `${ServerHost}/dataset/confirmRequest`,
            getConfirmRequest: `${ServerHost}/dataset/getConfirmRequest`,
            getToken: `${ServerHost}/getToken`,
            getKey: `${ServerHost}/getKey`,
            checkUpload: `${ServerHost}/dataset/checkUpload`,
            createDataset: `${ServerHost}/dataset/createDataset`,
            downloadUrl: `${ServerHost}/dataset/downloadUrl`,
            // mooc
            addMooc: `${ServerHost}/course/add`,
            addStep: `${ServerHost}/course/addstep`,
            getMoocScreenHotCourse: `${ServerHost}/course/screen_hot_course`,
            getMoocBoutique: `${ServerHost}/course/boutique_course/more/`,
            getOtherCourse: `${ServerHost}/course/boutique_course/more/`,
            freshMoocBoutique: `${ServerHost}/course/fresh-boutique`,
            freshMoocOther: `${ServerHost}/course/fresh-other`,
            getDetailInit: `${ServerHost}/course/detail`,
            registerCourse: `${ServerHost}/course/register`,
            getMyCourse: `${ServerHost}/course/mycourses`,
            deleteMooc: `${ServerHost}/course/delete`,
            submitOverview: `${ServerHost}/course/editoverview`,
            confirmStepFile: `${ServerHost}/course/confirmsteppic`,
            // competition
            getMyCompetition: `${ServerHost}/competition/getInfo`,
            getCompetitions: `${ServerHost}/competition/show_competitions`,
            addCompetition: `${ServerHost}/competition/add`,
            getHostCompetitions: `${ServerHost}/competition/get_competition`,
            deleteCompetition: `${ServerHost}/competition/delete`,
            getCompetitionDetail: `${ServerHost}/competition/detail`,
            confirmDataFile: `${ServerHost}/competition/confirmDataFile`,
            confirmDataAns: `${ServerHost}/competition/confirmAnsFile`,
            confirmUserDataAns: `${ServerHost}/competition/confirmUserAns`,
            judgeIfRegister: `${ServerHost}/competition/applyIf`,
            competitionRegister: `${ServerHost}/competition/register`,
            competitionQuit: `${ServerHost}/competition/unregister`,
            getPersonAccurate: `${ServerHost}/competition/person/accurate`,
            getAccurateRank: `${ServerHost}/competition//accurate/rank`,
            addComment: `${ServerHost}/competition/comment/add`

        }
    };

    this.urls = function () {
        return _const.urls;
    }

});
