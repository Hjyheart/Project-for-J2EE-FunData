/**
 * Created by hongjiayong on 2016/12/18.
 */
app.controller('informationCtrl', ['$scope', '$http', 'constService', 'authService',
    function ($scope, $http, constService, authService) {
        $scope.username = null;
        $scope.myprofile = null;
        $scope.mydataset = null;
        $scope.mycompetition = null;

        this.$onInit = function () {
            // init user
            if (authService.getUser() !== null && authService.getUser() !== 'null') {
                $scope.username = authService.getUser();
                // 获取用户的数据
                $http({
                    method: 'POST',
                    url: constService.urls().getUserProfile,
                    params:{
                        'username': $scope.username
                    }
                }).then( res=>{
                    $scope.myprofile = res.data;
                }).catch( err=>{
                    console.log(err);
                });

                // 获取我的数据集
                $http({
                    method: 'POST',
                    url: constService.urls().getMyProject,
                    params:{
                        'username': $scope.username
                    }
                }).then( res=>{
                    $scope.mydataset = res.data.datasets;
                    console.log(res.data);

                    for (let i = 0; i < $scope.mydataset.length; i++){
                        // 数据集的评论
                        $http({
                            method: 'POST',
                            url: constService.urls().getComment,
                            params:{
                                'datasetname': $scope.mydataset[i].datasetname
                            }
                        }).then( res=>{
                            console.log(res.data.comments);
                            $scope.mydataset[i].comments = res.data.comments;
                        }).catch( err=>{
                            console.log(err);
                        })
                    }
                }).catch( err=>{
                    console.log(err);
                });

                // 获取我的竞赛
                $http({
                    method: 'POST',
                    url: constService.urls().getHostCompetitions,
                    params:{
                        'page': 0,
                        'username': $scope.username
                    }
                }).then( res=>{
                    $scope.mycompetition = res.data.My_competitions.my_com;
                    console.log($scope.mycompetition);
                    for (let i = 0; i < $scope.mycompetition.length; i++){
                        // 获取我的竞赛的评论
                        $http({
                            method: 'POST',
                            url: constService.urls().getCompetitionDetail,
                            params:{
                                'compId': $scope.mycompetition[i].com_id
                            }
                        }).then( res=>{
                            console.log(res.data);
                            $scope.mycompetition[i].comments = res.data.comments;
                        }).catch( err=>{
                            console.log(err);
                        })
                    }
                }).catch( err=>{
                    console.log(err);
                })

            }else{
                window.location.href = '/login';
            }
        };

    }]);