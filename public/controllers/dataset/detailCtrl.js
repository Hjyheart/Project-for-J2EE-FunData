/**
 * Created by huang on 16-11-28.
 */

var app = angular.module('myApp');
app.controller('detailCtrl', function ($scope, $http,
                                     uploadService,
                                     authService,
                                     detailService,
                                     constService) {
    $scope.PullRequests;

    $scope.Comments = [];
    $scope._comment;
    $scope.Contribute = 0;
    $scope.isAdmin = '0';
    $scope.pageStart = 0;
    $scope.datasetname=$('#datasetname')[0].innerText;
    $scope.username = null;
    $scope._type = null;
    $scope.types;
    var uploader;
    $scope.content = {
        page: 1,
        take: 5,
        maxSize: 5,
        count: 0,
        list: [],
        activate: moreContent
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
        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();
        }


        detailService.getDetail(constService.urls().getContent, 0, $scope.datasetname)
            .then( res => {
                    $scope.content.list = res.data.content;
                    $scope.content.count = res.data.count;
                    $scope.Contribute = res.data.contribute;
                    $scope.isAdmin = res.data.admin;
                    $scope.downloadUrl = res.data.url;
                    if($scope.isAdmin === 1){
                        $scope.types = [
                            {text: 'Title', value: 1},
                            {text: 'File', value: 2}
                        ]
                    }else{
                        $scope.types = [
                            {text: 'File', value: 2}
                        ]
                    }


            })
            .catch( err => {
                console.log(err);
            });

    };

    $scope.downloadMergeFile = function () {
        location = $scope.downloadUrl;

    };

    $scope.getContent =function () {
        detailService.getDetail(constService.urls().getContent, 0, $scope.datasetname)
            .then( res => {
                    $scope.content.list = res.data.content;

            })
            .catch( err => {
                console.log(err);
            });
    }

    $scope.getComments =function () {
        detailService.getDetail(constService.urls().getComment, 0, $scope.datasetname)
            .then( res => {
                    $scope.Comments = res.data.comments;

            })
            .catch( err => {
                console.log(err);
            });
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

    $scope.publishComment = function () {
        $http({
            method: "POST",
            url: constService.urls().comment,
            params: {
                "username": authService.getUser(),
                "content": $scope._comment,
                "datasetname": $scope.datasetname
            }
        })
            .then( res => {
                $scope.Comments = $scope.Comments.concat(res.data.comments);
                $scope._comment='';
            })
            .catch(err => {
                console.log(err);
            })

    }

    $scope.confirmPullRequest = function(pull, confirm) {
        $http({
            method: "POST",
            url: constService.urls().confirmRequest,
            params: {
                "request_id": pull.id,
                "confirm": confirm
            }
        })
            .then( res => {
                pull.type = 1;
            })
            .catch(err => {
                console.log(err);
            })

    }

    function moreContent(page){
        detailService.getDetail(constService.urls().getContent, page, $scope.datasetname)
            .then( res => {
                $scope.content.list = res.data.content;
                $scope.content.count = res.data.count;

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


    $scope.upload = function () {
        uploader = null;
        $scope.desc = '';
        $('newSubmition').modal('hide');
        $scope.getPullRequests();
    }

    $scope.newSubmition = function () {
        $('#newSubmition').modal('show');

    };

    $scope.select = function () {
        uploader = uploadService.upload(1, {username: authService.getUser(),
            datasetname: $scope.datasetname,
            type: $scope._type,
            desc: $scope.desc});
    }

})