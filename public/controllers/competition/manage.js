/**
 * Created by hongjiayong on 2016/12/17.
 */
app.controller('manageCtrl', ['$scope', '$http', 'constService','createService', 'authService', 'uploadService',
    function ($scope, $http, constService, createService, authService, uploadService) {
        var uploader;
        $scope.username = null;
        $scope.comId = $('#com-id').text();

        this.$onInit = function () {
            // init user
            if (authService.getUser() !== null && authService.getUser() !== 'null'){
                $scope.username = authService.getUser();
            }

            // 获取该竞赛信息
            // $http({
            //     method: 'POST',
            //     url: constService.urls().getCompetitionDetail
            // })


        };

        $scope.downloadFile = function () {
            // download file
            $('#download-area').transition('fade up');
            if ($('#download-btn').text() === 'download') {
                $('#download-btn').text('close download');
                uploader = uploadService.upload();
            }
            else {
                $('#download-btn').text('download');
            }
        };


        $scope.submitDownload = function () {
            // $http({
            //     method: 'POST',
            //     url: constService.urls().confirmDataFile,
            //     params:{
            //         'key': uploadService.getKey(),
            //         'comId': $scope.comId
            //     }
            // }).then( res=>{
            //     console.log(res);
            // }).catch( err=>{
            //     console.log(err);
            // });
            console.log(uploadService.getKey());
        };


    }]);