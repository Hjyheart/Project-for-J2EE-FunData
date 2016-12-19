/**
 * Created by hongjiayong on 2016/12/17.
 */
app.controller('manageCtrl', ['$scope', '$http', 'constService','createService', 'authService', 'uploadService',
    function ($scope, $http, constService, createService, authService, uploadService) {
        var uploader;
        $scope.username = null;
        $scope.comId = $('#com-id').text();
        $scope.competition = null;

        this.$onInit = function () {
            // init user
            if (authService.getUser() !== null && authService.getUser() !== 'null'){
                $scope.username = authService.getUser();
            }

            // 获取细节
            $http({
                method: 'POST',
                url: constService.urls().getCompetitionDetail,
                params:{
                    'compId': $scope.comId
                }
            }).then( res=>{
                console.log(res);
                $scope.competition = res.data;
            }).catch( err=>{
                console.log(err);
            });


        };

        $scope.downloadFile = function () {
            // download file
            $('#download-upload').transition('fade up');
            if ($('#download-btn').text() === 'download') {
                $('#download-btn').text('close download');
            }
            else {
                $('#download-btn').text('download');
            }
        };

        $scope.answerFile = function () {
            $('#answer-upload').transition('fade up');
            if ($('#answer-btn').text() === 'close answer') {
                $('#answer-btn').text('answer');
            }
            else {
                $('#answer-btn').text('close answer');
            }
        };


        $scope.uploadDownloadFile = function () {
            $('#upload-modual-header').text('datafile');
            $('.ui.modal').modal('show');
            var datafile = {
                'id': $scope.comId,
                'type': 1
            };
            uploader = uploadService.upload(2, datafile);
        };

        $scope.uploadAnsFile = function () {
            $('#upload-modual-header').text('ansfile');
            $('.ui.modal').modal('show');
            var ansfile = {
                'id': $scope.comId,
                'type': 2
            };
            uploader = uploadService.upload(2, ansfile);
        };

    }]);