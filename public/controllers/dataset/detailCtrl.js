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
    $scope.Comments;
    $scope._comment;
    $scope.Contribute = 0;
    $scope.isAdmin = '0';
    $scope.pageStart = 0;
    $scope.datasetname=$('#datasetname')[0].innerText;
    $scope.username = null;

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


            })
            .catch( err => {
                console.log(err);
            });

    };

    $scope.getContent =function () {
        detailService.getDetail(constService.urls().getContent, 0, $scope.datasetname)
            .then( res => {
                    $scope.Comments = res.data.comments;

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
                    $scope.Comments = res.data.comments;

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
                $scope.Comments = $scope.Comments.concat(res.data.comment);
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

    $scope.upload = function () {
        detailService.getDetail(constService.urls().uploadFile, 0, $scope.datasetname)
            .then( res => {
                    var uploader = uploadService.upload(res.data.uploadtoken, res.data.key);
                    uploader.start();
            })
            .catch( err => {
                console.log(err);
            });


    }

})