/**
 * Created by hongjiayong on 2016/12/6.
 */

app.controller('myProfileCtrl', ['$scope', '$http', 'constService','createService', 'authService', 'infoService', 'uploadService',
    function ($scope, $http, constService, createService, authService, infoService, uploadService) {
    $scope.myCompetitions = [];
    $scope.myCourses = [];
    $scope.myDatasets = [];
    $scope.myCompetitions;
    $scope.myprofile = null;
    var uploader;
    $scope.username = null;

    this.$onInit = function () {

        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();

            var fresh = function () {
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

                setTimeout(fresh, 5000);
            };

            fresh();

        }else{
            window.location.href = '/login';
        }


        var freshDataset = function () {
            // 获取用户的数据集
            infoService.getInfo(constService.urls().getMyProject)
                .then( res => {
                    console.log(res);
                    $scope.myDatasets = res.data.datasets;
                })
                .catch(err => {
                    console.log(err);
                });

            setTimeout(freshDataset, 5000);
        };

        freshDataset();


        var freshCourse = function () {
            infoService.getInfo(constService.urls().getMyCourse)
                .then( res => {
                    console.log(res);
                    $scope.myCourses = res.data.join.join_courses;
                    $scope.myCourses = $scope.myCourses.concat(res.data.host.host_courses);
                })
                .catch(err => {
                    console.log(err);
                });
            setTimeout(freshCourse, 5000);
        };

        freshCourse();

        var freshCompetition = function () {
            // 获取用户的竞赛
            $http({
                method: 'POST',
                url: constService.urls().getHostCompetitions,
                params:{
                    'page': 0,
                    'username': authService.getUser()
                }
            }).then( res=>{
                console.log(res);
                $scope.myCompetitions = res.data.My_competitions.my_com;
            }).catch( err=>{
                console.log(err);
            });

            setTimeout(freshCompetition, 5000);
        };

        freshCompetition();

    };


    // js for mooc
    $scope.moocToDetail = function (course) {
        window.location.href = '/mooc/' + course.course_id + '/' + course.course_name + '/detail';
    };

    $scope.moocShowWarning = function (course) {
        $('#confirmDeleteMooc').modal({
            transition : 'vertical flip'
        }).modal('show');
    };

    $scope.moocManager = function (course) {
        window.location.href = '/mooc/' + course.course_id + '/' + course.course_name +  '/manager';
    };

    $scope.createDataset = function createDataset() {
        $('#createDataset').modal('show');
        //uploader = uploadService.upload(1, {username: $scope.username, datasetname: name});

    };

    $scope.submitDataset = function (name, description) {
        createService.createDateset(constService.urls().createDataset, description, name)
            .then( res => {
                //uploader.start();
            })
    };

    $scope.createMooc = function () {
        $('#createMooc').modal({
            transition : 'vertical flip'
        }).modal('show');
    };

    $scope.submitMooc = function (courseName, description) {
        $http({
            method: 'POST',
            url: constService.urls().addMooc,
            params: {
                'username': authService.getUser(),
                'coursename': courseName,
                'des': description
            }
        }).then( res=>{
            console.log(res);
            // 获取用户的课程
            $scope.myCourses = $scope.myCourses.concat(res.data);
        }).catch( err=>{
            console.log(err);
        });
    };

    $scope.moocToDetail = function(course){
        location.href = `/mooc/${course.id}/${course.name}/detail`
    };

    $scope.moocManager = function(course){
        location.href = `/mooc/${course.id}/${course.name}/manager`
    };

    $scope.moocShowWarning =function(course, index){
        $('#confirmDeleteMooc').modal({
            'transision': 'vertical flip',
            onApprove : function() {
                $http({
                    method: 'POST',
                    url: constService.urls().deleteMooc,
                    params:{
                        'id': course.id,
                        'username': $scope.username
                    }
                }).then( res => {
                    $scope.myCourses.splice(index, 1);
                }).catch( err =>{
                    console.log(err);
                });
            }
        }).modal('show');
    };
    // 查看竞赛详情
    $scope.comToDetail = function (com) {
        window.location.href = '/competition/' + com.com_id + '/detail';
    };


    $scope.comToManage = function (com) {
        window.location.href = '/competition/' + com.com_id + '/manage';
    };

    // 创建竞赛
    $scope.createCompetition = function () {
        $('#createCompetition').modal({
            transition : 'vertical flip'
        }).modal('show');
    };

    // 提交竞赛数据
    $scope.createCom = function () {
        var start = $('#start-time').val().substring(6, 10) + '-' +
            $('#start-time').val().substring(0, 2) + '-' +
            $('#start-time').val().substring(3, 5) + ' 00:00:00';

        var end = $('#end-time').val().substring(6, 10) + '-' +
            $('#end-time').val().substring(0, 2) + '-' +
            $('#end-time').val().substring(3, 5) + ' 00:00:00';

        $http({
            method: 'POST',
            url: constService.urls().addCompetition,
            params:{
                'username': authService.getUser(),
                'compName': $('#com-name').val(),
                'start': start,
                'end': end,
                'des': $('#com-des').val()
            }
        }).then( res=>{
            console.log(res);
            // 获取用户的竞赛
            $http({
                method: 'POST',
                url: constService.urls().getHostCompetitions,
                params:{
                    'page': 0,
                    'username': authService.getUser()
                }
            }).then( res=>{
                console.log(res);
                $scope.myCompetitions = res.data.My_competitions.my_com;
            }).catch( err=>{
                console.log(err);
            });
        }).catch( err=>{
            console.log(err);
        });
    };

    // 删除竞赛
    $scope.comShowWarning = function (com) {
        $('#confirmDeleteCompetition').modal({
            'transision': 'vertical flip',
            onApprove : function() {
                $http({
                    method: 'POST',
                    url: constService.urls().deleteCompetition,
                    params:{
                        'comId': com.com_id,
                        'username': $scope.username
                    }
                }).then( res=>{
                    // 获取用户的竞赛
                    $http({
                        method: 'POST',
                        url: constService.urls().getHostCompetitions,
                        params:{
                            'page': 0,
                            'username': authService.getUser()
                        }
                    }).then( res=>{
                        console.log(res);
                        $scope.myCompetitions = res.data.My_competitions.my_com;
                    }).catch( err=>{
                        console.log(err);
                    });
                }).catch( err =>{
                    console.log(err);
                });
            }
        }).modal('show');
    };

    $scope.upload = function () {
        console.log($('#upload-file').val());
        $('#file-progress').transition('vertical flip');
        $('#file-progress').progress({
            percent: 100,
            text: {
                active  : '{value} of {total}',
                success : 'Upload compelete!'
            }
        });
        $('#file-progress').transition('vertical flip');
        $scope.fileNum += 1;
        $('#upload-file').val('');

    };

    // 改密码弹框
    $scope.showEdit = function () {
        $('#edit').modal('show');
    };

    // 改密码
    $scope.changePassword = function () {
        $http({
            method: 'POST',
            url: constService.urls().changePwd,
            params:{
                'username': $scope.username,
                'oldpwd': $scope.oldpwd,
                'newpwd': $scope.newpwd
            }
        }).then( res=>{
            if (res.data){
                $('#change-success').modal('show');
            }else{
                $('#change-error').modal('show');
            }
        }).catch( err=>{
            console.log(err);
        })
    };

    // 换头像
    $scope.changeImg = function () {
        $('#new-image').modal('show');
        var data = {
            'username': $scope.username,
        };
        uploader = uploadService.upload(4, data);
    };
}]);