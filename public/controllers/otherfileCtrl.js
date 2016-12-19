/**
 * Created by hongjiayong on 2016/12/19.
 */
app.controller('otherCtrl', ['$scope', '$http', 'constService', 'authService','infoService', function ($scope, $http, constService, authService, infoService) {
    $scope.username = null;
    $scope.othername = $('#username').text();
    $scope.user = null;
    $scope.datasets = null;
    $scope.competitions = null;
    $scope.courses = null;

    this.$onInit = function () {
        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null') {
            $scope.username = authService.getUser();
        }
        // 获取该用户的信息
        $http({
            method: 'POST',
            url: constService.urls().getUserProfile,
            params:{
                'username': $scope.othername
            }
        }).then( res=>{
            console.log(res.data);
            $scope.user = res.data;
        }).then( err=>{
            console.log(err);
        });

        // 获取用户的数据集
        $http({
            method: 'POST',
            url: constService.urls().getMyProject,
            params: {
                'username': $scope.othername
            }
        }).then( res=>{
            console.log(res);
            $scope.datasets = res.data.datasets;
        }).catch( err=>{
            console.log(err);
        });

        // 获取用户的竞赛
        $http({
            method: 'POST',
            url: constService.urls().getHostCompetitions,
            params:{
                'page': 0,
                'username': $scope.othername
            }
        }).then( res=>{
            console.log(res);
            $scope.competitions = res.data.My_competitions.my_com;
        }).catch( err=>{
            console.log(err);
        });

        // 获取用户的课程
        $http({
            method: 'POST',
            url: constService.urls().getMyCourse,
            params:{
                'username': $scope.othername
            }
        }).then( res=>{
            console.log(res);
            $scope.courses = res.data.host.host_courses;
        }).catch( err=>{
            console.log(err);
        })
    };

    // 查看数据集详情
    $scope.datasetToDetail = function (datasetname) {
        window.location.href = '/dataset/' + datasetname + '/detail';
    };

    // 查看竞赛详情
    $scope.comToDetail = function (com) {
        window.location.href = '/competition/' + com.com_id + '/detail';
    };

    // 查看课程详情
    $scope.moocToDetail = function (course) {
        window.location.href = '/mooc/' + course.course_id + '/' + course.course_name + '/detail';
    };
}]);