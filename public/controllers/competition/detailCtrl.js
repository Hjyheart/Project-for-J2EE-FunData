/**
 * Created by hongjiayong on 2016/12/14.
 */
app.controller('detailCtrl', ['$scope', '$http', 'constService', 'authService','uploadService', function ($scope, $http, constService, authService, uploadService) {
    $scope.com_id = $('#com-id').text();
    $scope.isApply = false;
    $scope.competition;
    $scope.username = null;
    var uploader;
    this.$onInit = function () {
        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();
        }
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

        historicalBarChart = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : 1 ,
                        "value" : 100
                    } ,
                    {
                        "label" : 2 ,
                        "value" : 45
                    },
                    {
                        "label" : 3 ,
                        "value" : 67
                    },
                    {
                        "label" : 4 ,
                        "value" : 73
                    }
                ]
            }
        ];

        nv.addGraph(function() {
            var chart = nv.models.discreteBarChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
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

}]);