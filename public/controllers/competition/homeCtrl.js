/**
 * Created by hongjiayong on 2016/12/13.
 */
app.controller('homeCtrl', ['$scope', '$http', 'constService', 'authService', function ($scope, $http, constService, authService) {
    $scope.competitions_active = [];
    $scope.competitions_unactive = [];
    $scope.competitions;
    this.$onInit = function () {

        if (authService.getUser() !== 'null' && authService.getUser() !== null){
            $http({
                method: 'POST',
                url: constService.urls().getHostCompetitions,
                params:{
                    'page': 0,
                    'username': authService.getUser()
                }
            }).then( res=>{
                console.log(res.data);
                $scope.competitions = res.data.competitions;
                for (let i = 0; i < res.data.competitions.length; i++) {
                    if (res.data.competitions[i].com_active_flag) {
                        $scope.competitions_active.push(res.data.competitions[i]);
                    } else {
                        $scope.competitions_unactive.push(res.data.competitions[i]);
                    }
                }
                $scope.myPcompetitions = res.data.My_competitions.my_participate_com;
                $scope.mycompetitions = res.data.My_competitions.my_com;
            }).catch( err=>{
                console.log(err);
            });
        }else {

            $http({
                method: 'POST',
                url: constService.urls().getCompetitions,
                params: {
                    'page': 0
                }
            }).then(res => {
                $scope.competitions = res.data.competitions;
                for (let i = 0; i < res.data.competitions.length; i++) {
                    if (res.data.competitions[i].com_active_flag) {
                        $scope.competitions_active.push(res.data.competitions[i]);
                    } else {
                        $scope.competitions_unactive.push(res.data.competitions[i]);
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }
    };

    $scope.toComDetail = function (competition) {
        window.location.href = '/competition/' + competition.com_id + '/detail'
    };

    $scope.loadCompetition = function () {
        $('#load-competition-btn').addClass('loading');
        var sum = $('#competition-active-container').children().length + $('#competition-other-container').children().length;

        if (sum % 8 !== 0){
            $('#load-competition-btn').removeClass('loading');
            return;
        }else{
            var page = Math.floor(sum / 8);
        }

        $http({
            method: 'POST',
            url: constService.urls().getCompetitions,
            params:{
                'page': page
            }
        }).then( res=>{
            for (let i = 0; i < res.data.competitions.length; i++){
                if (res.data.competitions[i].com_active_flag){
                    $scope.competitions_active.push(res.data.competitions[i]);
                }else{
                    $scope.competitions_unactive.push(res.data.competitions[i]);
                }
            }
            $('#load-competition-btn').removeClass('loading');
        }).catch( err=>{
            console.log(err);
        })
    };

}]);