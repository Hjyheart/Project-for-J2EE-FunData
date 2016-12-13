/**
 * Created by hongjiayong on 2016/12/6.
 */

app.controller('myProfileCtrl', ['$scope', '$http', 'constService',  'infoService',
    function ($scope, $http, constService, infoService) {
    this.$onInit = function () {
        //infoService.getInfo(constService.urls().)
        // 获取用户信息 这边应该是一个http请求

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
        ]
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

    $scope.createMooc = function () {
        $('#createMooc').modal({
            transition : 'vertical flip'
        }).modal('show');
    };

    // 创建竞赛
    $scope.createCompetition = function () {
        $('#createCompetition').modal({
            transition : 'vertical flip'
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