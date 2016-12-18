/**
 * Created by huang on 16-11-28.
 */

var app = angular.module('myApp');
app.controller('manageCtrl', function ($scope, $http,
                                     uploadService,
                                     authService,
                                     detailService,
                                     constService) {
    $scope.pullrequest = {
        page: 1,
        take: 5,
        maxSize: 5,
        count: 0,
        list: [],
        activate: morePullRequest
    };
    $scope.datasetname=$('#datasetname')[0].innerText;

    this.$onInit = function () {
        $scope.getPullRequests();
    }

    $scope.getPullRequests =function () {
        detailService.getDetail(constService.urls().getPullRequest, 0, $scope.datasetname)
            .then( res => {
                $scope.pullrequest.list = res.data.pullrequest;

            })
            .catch( err => {
                console.log(err);
            });
    }

    function morePullRequest(page){
        detailService.getDetail(constService.urls().getPullRequest, page, $scope.datasetname)
            .then( res => {
                $scope.pullrequest.list = res.data.pullrequest;
                $scope.pullrequest.count = res.data.count;
            })

            .catch( err => {
                console.log(err);
            });

    }
        $scope.toDatasetManage = function (name) {
            window.location.href = '/dataset/' + name + '/manage';

    }

    $scope.confirmPullRequest = function (name, id, index){
        $http({
            method: "POST",
            url: constService.urls().confirmRequest,
            params: {
                "id": id,
                "datasetname": name,
                "confirm": 1
            }
        })
            .then( res => {
                $scope.pullrequest.list[index].type = 1;
            })
    }

    $scope.rejectPullRequest = function (name, id, index){
        $http({
            method: "POST",
            url: constService.urls().confirmRequest,
            params: {
                "id": id,
                "datasetname": name,
                "confirm": 0
            }
        })
            .then( res => {
                $scope.pullrequest.list[index].type = 0;
            })

    }
})