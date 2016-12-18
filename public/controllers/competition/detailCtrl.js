/**
 * Created by hongjiayong on 2016/12/14.
 */
app.controller('detailCtrl', ['$scope', '$http', 'constService', 'authService','uploadService', function ($scope, $http, constService, authService, uploadService) {
    $scope.com_id = $('#com-id').text();
    $scope.isApply = false;
    $scope.competition;
    $scope.username = null;
    $scope.rates = null;
    $scope.ranks = null;
    var uploader;
    this.$onInit = function () {
        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();
            // 判断是否注册
            $http({
                method: 'POST',
                url: constService.urls().judgeIfRegister,
                params:{
                    'username': $scope.username,
                    'comId': $scope.com_id
                }
            }).then( res=>{
                if (res.data){
                    $scope.isApply = true;
                }
            }).catch( err=>{
                console.log(err);
            });


            var getAccurate = function () {
                // 获得用户的准确率
                $http({
                    method: 'POST',
                    url: constService.urls().getPersonAccurate,
                    params:{
                        'username': $scope.username,
                        'compId': $scope.com_id
                    }
                }).then( res=> {
                    console.log(res.data);
                    $scope.rates = res.data.user_accurate;

                    var value = [];
                    for (let i = 0; i < $scope.rates.length; i++) {
                        value.push({
                            "label": i + 1,
                            "value": $scope.rates[i].value
                        })
                    }

                    historicalBarChart = [
                        {
                            key: "Cumulative Return",
                            values: value
                        }
                    ];

                    nv.addGraph(function () {
                        var chart = nv.models.discreteBarChart()
                                .x(function (d) {
                                    return d.label
                                })
                                .y(function (d) {
                                    return d.value
                                })
                                .staggerLabels(true)
                                //.staggerLabels(historicalBarChart[0].values.length > 8)
                                .showValues(true)
                                .duration(250)
                            ;

                        d3.select('#chart svg')
                            .datum(historicalBarChart)
                            .call(chart);

                        nv.utils.windowResize(chart.update);
                        return chart;
                    });

                    setTimeout(getAccurate, 5000);

                }).catch( err=>{
                    console.log(err);
                });
            };

            getAccurate();

        }
            // 获取细节
          $http({
              method: 'POST',
              url: constService.urls().getCompetitionDetail,
              params:{
                  'compId': $scope.com_id
              }
          }).then( res=>{
              console.log(res);
              $scope.competition = res.data;
          }).catch( err=>{
              console.log(err);
          });

        // 获取rank
        var getRank = function () {
            $http({
                method: 'POST',
                url: constService.urls().getAccurateRank,
                params:{
                    'compId': $scope.com_id
                }
            }).then( res=>{
                $scope.ranks = res.data.rank;
            }).catch( err=>{
                console.log(err);
            })

            setTimeout(getRank, 5000);
        };

        getRank();

    };

    $scope.submitAnswer = function () {
        $('#upload-modal').modal('show');
        var useransfile = {
            'username': authService.getUser(),
            'id': $scope.com_id,
            'type': 3
        };
        uploader = uploadService.upload(2, useransfile);
        console.log(useransfile);
    };

    $scope.jiggle = function () {
        $('.teal.basic.button').transition({
            animation: 'jiggle',
            on: 'hover'
        });
    };

    $scope.shake = function () {
        $('.red.basic.button').transition({
            animation: 'shake',
            on: 'hover'
        });
    };

    $scope.register = function () {
        $http({
            method: 'POST',
            url: constService.urls().competitionRegister,
            params:{
                'username': $scope.username,
                'comId': $scope.com_id
            }
        }).then( res=>{
            if (res.data){
                $scope.isApply = true;
            }
        }).catch( err=>{
            console.log(err);
        })
    };

    $scope.quit = function () {
        $http({
            method: 'POST',
            url: constService.urls().competitionQuit,
            params:{
                'username': $scope.username,
                'comId': $scope.com_id
            }
        }).then( res=>{
            if (res.data){
                $scope.isApply = false;
            }
        }).catch( err=>{
            console.log(err);
        })
    };

    $scope.submitComment = function () {
        $http({
            method: 'POST',
            url: constService.urls().addComment,
            params:{
                'username': $scope.username,
                'compId': $scope.com_id,
                'content': $('#comment-content').val()
            }
        }).then( res=>{
            $http({
                method: 'POST',
                url: constService.urls().getCompetitionDetail,
                params:{
                    'compId': $scope.com_id
                }
            }).then( res=>{
                console.log(res);
                $scope.competition.comments = res.data.comments;
            }).catch( err=>{
                console.log(err);
            });
            $('#comment-content').val('');
        }).catch( err=>{
            console.log(err);
        })
    };

    $scope.downloadFile = function () {
        // download file
        $('#download-area').transition('fade up');
        if ($('#download-btn').text() === 'download') {
            $('#download-btn').text('close download');
        }
        else {
            $('#download-btn').text('download');
        }
    }
}]);