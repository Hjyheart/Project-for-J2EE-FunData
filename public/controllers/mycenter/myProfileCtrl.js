/**
 * Created by hongjiayong on 2016/12/6.
 */

app.controller('myProfileCtrl', ['$scope', '$http', 'constService',  'infoService', 'authService', 'uploadService',
    function ($scope, $http, constService, infoService, authService, uploadService) {
    $scope.myCompetitions;
    $scope.username = authService.getUser();

    this.$onInit = function () {

        // 获取用户的数据集

        // 获取用户的课程
        $scope.myMoocs =[
            {
                'course_id': 1,
                'course_name': 'course1',
                'course_owner_name': 'jiayong',
                'course_des': 'kea'
            },
            {
                'course_id': 2,
                'course_name': 'course2',
                'course_owner_name': 'jiayong',
                'course_des': 'jiong'
            }
        ];
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
            $scope.myCompetitions = res.data.competitions;
        }).catch( err=>{
            console.log(err);
        });
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

    $scope.createDataset = function (username, description) {

        createService.create(constService.urls().createDataset, description, username)
            .then( res => {
                uploadService.upload(res.data.uptoken, res.data.key).start()

            })
    }

    $scope.createMooc = function () {
        $('#createMooc').modal({
            transition : 'vertical flip'
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
    $scope.submitCom = function () {
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

}]);