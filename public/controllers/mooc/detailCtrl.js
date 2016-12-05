/**
 * Created by hongjiayong on 2016/12/5.
 */
var app = angular.module('myApp');
app.controller('detailCtrl',
    ['$scope', '$http', 'constService', 'divideService',
    function ($scope, $http, constService, divideService) {
    var course_name = $('#course_name').text();
    var course_id = $('#course_id').text();

    $scope.steps;

    this.$onInit = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/mooc/' + course_id + '/' + course_name + '/detail',
        })
            .then( res =>{
                var overview = res.data.course_detail.course_overview.overview_content;
                $('#overview-content').replaceWith(divideService.getHtml(overview));

                var steps = res.data.course_detail.course_steps;

                $scope.steps = steps;

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

}]);