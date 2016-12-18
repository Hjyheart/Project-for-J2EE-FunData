/**
 * Created by hongjiayong on 2016/12/5.
 */
// var app = angular.module('myApp');
app.controller('detailCtrl',
    ['$scope', '$http', 'constService', 'divideService', 'authService',
    function ($scope, $http, constService, divideService, authService) {
    var course_name = $('#course_name').text();
    var course_id = $('#course_id').text();

    $scope.steps;
    $scope.answered;
    $scope.unanswered;
    $scope.isApply = false;
    $scope.username = null;
    $scope.flag = -1;
    this.$onInit = function () {

        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();
        }

        $http({
            method: 'POST',
            url: constService.urls().getDetailInit,
            params: {
                id: course_id,
                username: authService.getUser()
            }

        })
            .then( res =>{
                console.log(res)
                // init overview
                var overview = res.data.course_overview;
                $('#overview-content').replaceWith(divideService.getHtml(overview));

                // init steps
                $scope.steps = res.data.course_steps.course_steps;
                $scope.flag = res.data.flag;
                // init q & a
                $scope.answered = res.data.course_qa.answered;
                $scope.unanswered = res.data.course_qa.unanswered;
            })
            .catch(err =>{
                console.log(err);
            });
    };

    $scope.showStep = function (step, index) {

        $('#' + index).replaceWith(divideService.getHtml(step.step_content));
        $('#overview-btn').removeClass('active');
        $('#comments-btn').removeClass('active');
        $('.ui.attached.tab.active').removeClass('active');
        $('#' + step.step_header).addClass('active');
    };

    $scope.showA = function (question) {
        $('#' + question.question_id).transition('vertical flip');
    };

    $scope.joinDeal = function () {
        $('#welcome').modal('show');
        $http({
            method: 'POST',
            url: constService.urls().registerCourse,
            params: {
                id: course_id,
                username: authService.getUser(),
                type: 1
            }

        })
            .then(res => {
                $scope.flag = 1;
            })
    };

    $scope.unJoinDeal = function () {
        $('#thanks').modal('show');
        $http({
            method: 'POST',
            url: constService.urls().registerCourse,
            params: {
                id: course_id,
                username: authService.getUser(),
                type: 0
            }

        })
            .then(res => {
                $scope.flag = 0;
            })
    };

    $scope.addQuestion = function () {
        $('#add-success').modal('show');
        $('#new-question').val('');
    };

    $scope.addAnswer = function (question, index) {
        console.log(index);
        console.log($('#' + index + '-answer').val());

        for (var i = 0; i < $scope.unanswered.length; i++){
            if ($scope.unanswered[i] === question){
                $scope.answered.push({
                    'question':{
                        'question_id': question.question_id,
                        'question_owner_name': question.question_owner_name,
                        'question_owner_id': question.question_owner_id,
                        'question_time': question.question_time,
                        'question_content': question.question_content
                    },
                    'answer':{
                        'answer_id': '1',
                        'answer_owner_name': $scope.user.user_name,
                        'answer_owner_id': $scope.user.user_id,
                        'answer_time': '2016.12.5',
                        'answer_content': $('#' + index + '-answer').val()
                    }
                });
                $('#' + index + '-answer').val('');
                $scope.unanswered.splice(i, 1);
                break;
            }
        }
    };

}]);