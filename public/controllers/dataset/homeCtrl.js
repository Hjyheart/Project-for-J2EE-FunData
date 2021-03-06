/**
 * Created by huang on 16-11-28.
 */

var app = angular.module('myApp');
app.controller('homeCtrl', function ($scope, $http,
                                     authService,
                                     listService,
                                     constService) {
    $scope.HotProjects;
    $scope.MyProjects;
    $scope.MyContributes;
    $scope.username = null;

    $scope.pageStart = 0;

    this.$onInit = function () {
        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();
        }

        listService.getList(constService.urls().getHotProject, $scope.pageStart)
            .then( res => {
                    $scope.HotProjects = res.data.datasets;

            })
            .catch( err => {
                console.log(err);
            });
        listService.getList(constService.urls().getMyProject, $scope.pageStart)
            .then( res => {
                    $scope.MyProjects = res.data.datasets;


            })
            .catch( err => {
                console.log(err);
            });
        listService.getList(constService.urls().getMyContribute, $scope.pageStart)
            .then( res => {
                    $scope.MyContributes = res.data.dataset;

            })
            .catch( err => {
                console.log(err);
            });
    };

    $scope.fresh = function () {
        $scope.pageStart++;
        $("#freshDataSetBtn").addClass('loading');
        listService.getList(constService.urls().getHotProject, $scope.pageStart)
            .then( res => {
                    $scope.HotProjects = $scope.HotProjects.concat(res.data.datasets);
                    $("#freshDataSetBtn").removeClass('loading');

            })
            .catch( err => {
                console.log(err);
                $("#freshDataSetBtn").removeClass('loading');
            });
    };

    $scope.toDetail = function (project) {
        window.location.href = 'dataset/' + project.name + '/detail';
    }



});