/**
 * Created by hongjiayong on 2016/12/14.
 */
app.controller('detailCtrl', ['$scope', '$http', 'constService', 'authService', function ($scope, $http, constService, authService) {
    $scope.com_id = $('#com-id').text();
    $scope.competition;
    this.$onInit = function () {
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
}]);