/**
 * Created by huang on 16-11-28.
 */

var app = angular.module('myApp');
app.controller('detailCtrl', function ($scope, $http,
                                     uploadService,
                                     infoService,
                                     listService,
                                     constService) {
    $scope.PullRequests;
    $scope.Comments;
    $scope.Content;
    $scope.pageStart = 0;
    $scope.datasetname=$('datasetname')[0].innerText;

    this.$onInit = function () {
        listService.getList(constService.urls().getHotProject, $scope.pageStart)
            .then( res => {
                //TODO change res form
                $scope.HotProjects = res.data.datasets;
            })
            .catch( err => {
                console.log(err);
            });
        listService.getList(constService.urls().getMyProject, $scope.pageStart)
            .then( res => {
                //TODO change res form
                $scope.MyProjects = res.data.datasets;
            })
            .catch( err => {
                console.log(err);
            });
        listService.getList(constService.urls().getMyContribute, $scope.pageStart)
            .then( res => {
                //TODO change res form
                $scope.MyContributes = res.data.datasets;
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
                //TODO change res form
                $scope.HotProjects = $scope.HotProjects.concat(res.data.datasets);
                $("#freshDataSetBtn").removeClass('loading');
            })
            .catch( err => {
                console.log(err);
                $("#freshDataSetBtn").removeClass('loading');
            });

    };


    // $scope.upload = function () {
    //     uploadService.upload();
    // }

})