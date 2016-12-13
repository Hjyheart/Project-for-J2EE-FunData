/**
 * Created by hongjiayong on 2016/12/13.
 */
// TODO:需要知道登录机制才可以做侧边栏 并需要调整前端的样式
app.controller('homeCtrl', ['$scope', '$http', 'constService', function ($scope, $http, constService) {
    $scope.competitions_active;
    $scope.competitions_unactive;
    $scope.competitions;
    this.$onInit = function () {
        $http({
            method: 'POST',
            url: constService.urls().getCompetitions,
            params:{
                'page': 0
            }
        }).then( res=>{
            $scope.competitions = res.data.competitions;
            for (let i = 0; i < res.data.competitions.length; i++){
                if (res.data.competitions[i].com_active_flag){
                    $scope.competitions_active.push(res.data.competitions[i]);
                }else{
                    $scope.competitions_unactive.push(res.data.competitions[i]);
                }
            }
        }).catch( err=>{
            console.log(err);
        });
    };

    $scope.toComDetail = function (competition) {
        window.location.href = '/competition/' + competition.com_id + '/detail'
    };

    $scope.loadCompetition = function () {
        $('#load-competition-btn').addClass('loading');
        var page = Math.floor($('#competition-container').children().length / 8);
        $http({
            method: 'POST',
            url: constService.urls().getCompetitions,
            params:{
                'page': page
            }
        }).then( res=>{
            for (let i = 0; i < res.data.competitions.length; i++){
                $scope.competitions.push({
                    'com_join_num': res.data.competitions[i].com_join_num,
                    'com_id': res.data.competitions[i].com_id,
                    'com_des': res.data.competitions[i].com_des,
                    'com_owner_id': res.data.competitions[i].com_owner_id,
                    'com_active_flag': res.data.competitions[i].com_active_flag,
                    'com_owner_name': res.data.competitions[i].com_owner_name,
                    'com_name': res.data.competitions[i].com_name
                });
            }
            $('#load-competition-btn').removeClass('loading');
        }).catch( err=>{
            console.log(err);
        })
    };

}]);