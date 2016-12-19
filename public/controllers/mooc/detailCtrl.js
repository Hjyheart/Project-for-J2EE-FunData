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
        $('#' + index + "-step").addClass('active');
    };

    $scope.showA = function (question, index) {
        $('#' + index + '-reply').transition('vertical flip');
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
        $http({
            method: 'POST',
            url: constService.urls().addQuestion,
            params:{
                'username': $scope.username,
                'courseId': course_id,
                'content':  $('#new-question').val()
            }
        }).then( res=>{
           console.log(res);
            $('#add-success').modal('show');

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
                    $scope.answered = res.data.course_qa.answered;
                    $scope.unanswered = res.data.course_qa.unanswered;
                })
                .catch(err =>{
                    console.log(err);
                });

        }).catch( err=>{
            console.log(err);
        });
        $('#new-question').val('');
    };

    $scope.addAnswer = function (question, index) {
        console.log(question);
        console.log($('#' + index + '-answer').val());

        $http({
            method: 'POST',
            url: constService.urls().addAnswer,
            params:{
                'username': $scope.username,
                'questionId': question.question.question_id,
                'content': $('#' + index + '-answer').val()
            }
        }).then( res=>{
            console.log(res.data);
            $('#' + index + '-reply').transition('vertical flip');
            $('#' + index + '-answer').val('');
            $('#answer-success').modal('show');
        }).catch( err=>{
            console.log(err);
        });
    };

}]);