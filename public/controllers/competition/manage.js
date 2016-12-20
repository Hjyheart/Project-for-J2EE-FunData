/**
 * Created by hongjiayong on 2016/12/17.
 */
app.controller('manageCtrl', ['$scope', '$http', 'constService','createService', 'authService', 'uploadService',
    function ($scope, $http, constService, createService, authService, uploadService) {
        var uploader;
        $scope.username = null;
        $scope.comId = $('#com-id').text();
        $scope.competition = null;
        $scope.editName = '';
        $scope.starttime = '';
        $scope.endtime = '';


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

        $scope.submitDes = function (competition) {
            $http({
                method: 'POST',
                url: constService.urls().editDes,
                params:{
                    'id': $scope.comId,
                    'des': $('#des-val').val()
                }
            }).then( res=>{
                console.log(res.data);
                $scope.competition.com_des = $('#des-val').val();
                $('#des-val').val('');
                $('#edit-des').transition('fade');
                $('#des-input').transition('fade left');

            }).catch( err=>{
                console.log(err);
            })
        };

        $scope.submitName = function (competition) {
            $http({
                method: 'POST',
                url: constService.urls().editName,
                params:{
                    'id': $scope.comId,
                    'name': $scope.editName
                }
            }).then( res=>{
                console.log(res.data);
                $scope.competition.com_name = $scope.editName;
                $scope.editName = '';
                $('#name-input').transition('fade');
                $('#edit-name').transition('fade');

            }).catch( err=>{
                console.log(err);
            })
        };

        $scope.editStartTime = function () {
            $('#start-time-input').transition('fade');
            $('#edit-start-time').transition('fade');
        };

        $scope.editEndTime = function () {
            $('#end-time-input').transition('fade');
            $('#edit-end-time').transition('fade');
        };

        $scope.submitStartTime = function (competition) {
            var start = $('#start-time-field').val().substring(6, 10) + '-' +
                $('#start-time-field').val().substring(0, 2) + '-' +
                $('#start-time-field').val().substring(3, 5) + ' 00:00:00';
            $http({
                method: 'POST',
                url: constService.urls().editStartTime,
                params:{
                    'time': start,
                    'id': $scope.comId
                }
            }).then( res=>{
                console.log(res.data);
                $scope.competition.com_start_time = start;
                $('#start-time-input').transition('fade');
                $('#edit-start-time').transition('fade');
            }).catch( err=>{
                console.log(err);
            })
        };

        $scope.submitEndTime = function (competition) {
            var end = $('#end-time-field').val().substring(6, 10) + '-' +
                $('#end-time-field').val().substring(0, 2) + '-' +
                $('#end-time-field').val().substring(3, 5) + ' 00:00:00';
            $http({
                method: 'POST',
                url: constService.urls().editEndTime,
                params:{
                    'time': end,
                    'id': $scope.comId
                }
            }).then( res=>{
                console.log(res.data);
                $scope.competition.com_end_time = end;
                $('#end-time-input').transition('fade');
                $('#edit-end-time').transition('fade');
            }).catch( err=>{
                console.log(err);
            })
        }

    }]);