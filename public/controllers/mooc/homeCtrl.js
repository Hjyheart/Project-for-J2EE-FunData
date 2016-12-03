/**
 * Created by hongjiayong on 2016/12/3.
 */
var app = angular.module('myApp', []);
app.controller('homeCtrl', function ($scope, $http) {
    // $scope.screen_hot_course;
    $scope.mooc_title;
    // $scope.boutique_course;
    // $scope.other_course;

    this.$onInit = function () {
       $http({
           method: 'POST',
           url: 'http://127.0.0.1:8080/mooc/init',
       }).then( res =>{
           $scope.mooc_title = res.data;
       });
    };

    // this.getList = function(url, pageStart) {
    //     return $http({
    //         method: "POST",
    //         url: url,
    //         params: {
    //             "user_id": infoService.getInfo('user_id'),
    //             "pageStart": pageStart
    //         }
    //     });
    // }

});