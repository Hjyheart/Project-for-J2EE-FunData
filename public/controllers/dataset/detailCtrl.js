/**
 * Created by huang on 16-11-28.
 */

var app = angular.module('myApp');
app.controller('detailCtrl', function ($scope, $http,
                                     uploadService,
                                     infoService,
                                     detailService,
                                     constService) {
    $scope.PullRequests;
    $scope.Comments;
    $scope.Content;
    $scope.Contribute = 0;
    $scope.isAdmin = '0';
    $scope.pageStart = 0;
    $scope.datasetname=$('#datasetname')[0].innerText;

    $scope.content = {
        page: 1,
        take: 5,
        maxSize: 5,
        count: 0,
        list: [],
        activate: moreContent
    };

    $scope.comment = {
        page: 1,
        take: 5,
        maxSize: 5,
        count: 0,
        list: [],
        activate: moreComment
    };

    $scope.pullrequest = {
        page: 1,
        take: 5,
        maxSize: 5,
        count: 0,
        list: [],
        activate: morePullRequest
    };

    this.$onInit = function () {
        detailService.getDetail(constService.urls().getContent, $scope.pageStart, $scope.datasetname)
            .then( res => {
                $scope.content.list = res.data.content;
                $scope.content.count = res.data.count;
                $scope.Contribute = res.data.contribute;
                $scope.isAdmin = res.data.admin;

            })
            .catch( err => {
                console.log(err);
            });

    };

    function moreContent(){
        detailService.getDetail(constService.urls().getContent, $scope.pageStart, $scope.datasetname)
            .then( res => {
            $scope.content.list = res.data.content;
            //$scope.content.count = res.data.count;
            $scope.content.count = 100;
            })
            .catch( err => {
                console.log(err);
            });
    }

    function moreComment(){
        detailService.getDetail(constService.urls().getComment, $scope.pageStart, $scope.datasetname)
            .then( res => {
                $scope.comment.list = res.data.comments;
                //$scope.content.count = res.data.count;
                $scope.comment.count = 100;
            })
            .catch( err => {
                console.log(err);
            });
    }

    function morePullRequest(){
        detailService.getDetail(constService.urls().getPullRequest, $scope.pageStart, $scope.datasetname)
            .then( res => {
                $scope.content.list = res.data.content;
                //$scope.content.count = res.data.count;
                $scope.content.count = 100;
            })
            .catch( err => {
                console.log(err);
            });
    }
    // $scope.upload = function () {
    //     uploadService.upload();
    // }

})