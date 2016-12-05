/**
 * Created by hongjiayong on 2016/12/5.
 */
// var app = angular.module('myApp');
app.controller('detailCtrl',
    ['$scope', '$http', 'constService', 'divideService',
    function ($scope, $http, constService, divideService) {
    var course_name = $('#course_name').text();
    var course_id = $('#course_id').text();

    $scope.steps;
    $scope.answered;
    $scope.unanswered;
    $scope.user;

    this.$onInit = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/mooc/' + course_id + '/' + course_name + '/detail',
        })
            .then( res =>{
                // init user
                $scope.user = res.data.user;

                // init overview
                var overview = res.data.course_detail.course_overview.overview_content;
                $('#overview-content').replaceWith(divideService.getHtml(overview));

                // init steps
                var steps = res.data.course_detail.course_steps;
                $scope.steps = steps;

                // init q & a
                $scope.answered = res.data.course_detail.course_qa.answered;
                $scope.unanswered = res.data.course_detail.course_qa.unanswered;
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
        $scope.user.user_flag = 0;
        // 注册异步
    };

    $scope.unJoinDeal = function () {
        $('#thanks').modal('show');
        $scope.user.user_flag = -1;
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