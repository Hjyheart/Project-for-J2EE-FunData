/**
 * Created by hongjiayong on 2016/12/3.
 */
// var app = angular.module('myApp', ['ng-pagination']);
app.controller('homeCtrl',[ '$scope', '$http', 'constService', function ($scope, $http, constService) {
    $scope.screen_hot_course;
    $scope.mooc_title;
    $scope.boutique_course;
    $scope.other_course;

    this.$onInit = function () {
       // 获取荧幕热门课程
       $http({
           method: 'GET',
           url: constService.urls().getMoocScreenHotCourse
       }).then( res =>{
           $scope.screen_hot_course = res.data;
       }).catch(err =>{
           console.log(err);
       });

        // 获取精品课程
        $http({
            method: 'GET',
            url: constService.urls().getMoocBoutique + '0'
        }).then( res=>{
            $scope.boutique_course = res.data.boutique_course;
        }).catch(err =>{
            console.log(err);
        });

        // 获取其他课程
        $http({
            method: 'GET',
            url: constService.urls().getOtherCourse + '0'
        }).then( res=>{
            $scope.other_course = res.data.boutique_course;
        }).catch(err =>{

        });

    };

    $scope.turnToDetail = function (course) {
        window.location.href = '/mooc/' + course.course_id + '/' + course.course_name +'/detail';
    };

    $scope.freshCourseOthers = function () {
        $('#freshCourseOthersBtn').addClass('loading');
        var end = $('#other-course-container').children().length;
        $http({
            method: 'GET',
            url: constService.urls().getOtherCourse + Math.floor(end / 8) + '/8',
        }).then(res =>{
            for (var i = 0; i < res.data.boutique_course.length; i++){
                $scope.other_course.push({
                    'course_id': res.data.boutique_course[i].course_id,
                    'course_name': res.data.boutique_course[i].course_name,
                    'course_join_sum': res.data.boutique_course[i].course_join_sum,
                    'course_teacher_name':res.data.boutique_course[i].course_teacher_name,
                    'course_rank': res.data.boutique_course[i].course_rank
                });
            }
            $('#freshCourseOthersBtn').removeClass('loading');
        }).catch(err =>{
            console.log(err);
        });
    };

    $scope.freshCourseBoutique = function () {
        $("#freshCourseBoutiqueBtn").addClass('loading');
        var end = $('#boutique-course-container').children().length;
        $http({
            method: 'GET',
            url: constService.urls().getMoocBoutique + Math.floor(end / 8) + '/8',
        }).then( res =>{

            for (var i = 0; i < res.data.boutique_course.length; i++){
                $scope.boutique_course.push({
                    'course_id': res.data.boutique_course[i].course_id,
                    'course_name': res.data.boutique_course[i].course_name,
                    'course_join_sum': res.data.boutique_course[i].course_join_sum,
                    'course_teacher_name':res.data.boutique_course[i].course_teacher_name,
                    'course_rank': res.data.boutique_course[i].course_rank
                });
            }
            $("#freshCourseBoutiqueBtn").removeClass('loading');
        }).catch(err =>{
            console.log(err);
        });
    };



}]);