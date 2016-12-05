/**
 * Created by hongjiayong on 2016/12/3.
 */
var app = angular.module('myApp');
app.controller('homeCtrl',[ '$scope', '$http', 'constService', function ($scope, $http, constService) {
    $scope.screen_hot_course;
    $scope.mooc_title;
    $scope.boutique_course;
    $scope.other_course;

    this.$onInit = function () {
       $http({
           method: 'POST',
           url: constService.urls().getMoocInit
       }).then( res =>{
           $scope.screen_hot_course = res.data.screen_hot_course;
           $scope.boutique_course = res.data.boutique_course;
           $scope.other_course = res.data.other_course;
       }).catch(err =>{
           console.log(err);
       });


    };

    $scope.turnToDetail = function (course) {
        window.location.href = '/mooc/' + course.course_id + '/' + course.course_name +'/detail';
    };

    $scope.freshCourseOthers = function () {
        $('#freshCourseOthersBtn').addClass('loading');
        var end = $('#other-course-container').children().length;
        $http({
            method: 'POST',
            url: constService.urls().freshMoocOther,
            params: {
                'current': end
            }
        }).then(res =>{
            for (var i = 0; i < res.data.other_course.length; i++){
                $scope.other_course.push({
                    'course_id': res.data.other_course[i].course_id,
                    'course_name': res.data.other_course[i].course_name,
                    'course_join_sum': res.data.other_course[i].course_join_sum,
                    'course_teacher_name':res.data.other_course[i].course_teacher_name,
                    'course_teacher_id': res.data.other_course[i].course_teacher_id,
                    'course_des': res.data.other_course[i].course_des
                });
            }
        }).catch(err =>{
            console.log(err);
        });

        setTimeout(function () {
            $('#freshCourseOthersBtn').removeClass('loading');
        }, 1000);
    };

    $scope.freshCourseBoutique = function () {
        $("#freshCourseBoutiqueBtn").addClass('loading');
        var end = $('#boutique-course-container').children().length;
        $http({
            method: 'POST',
            url: constService.urls().freshMoocBoutique,
            params:{
                'current': end
            }
        }).then( res =>{

            for (var i = 0; i < res.data.boutique_course.length; i++){
                $scope.boutique_course.push({
                    'course_id': res.data.boutique_course[i].course_id,
                    'course_name': res.data.boutique_course[i].course_name,
                    'course_join_sum': res.data.boutique_course[i].course_join_sum,
                    'course_teacher_name':res.data.boutique_course[i].course_teacher_name,
                    'course_teacher_id': res.data.boutique_course[i].course_teacher_id,
                    'course_des': res.data.boutique_course[i].course_des
                });
            }
        }).catch(err =>{
            console.log(err);
        })
        setTimeout(function () {
            // 在这里刷新mooc
            $("#freshCourseBoutiqueBtn").removeClass('loading');
        }, 1000);
    };



}]);