/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');
app.controller('indexCtrl', ['$scope', '$http', 'constService', 'authService', function ($scope, $http, constService, authService) {
    $scope.username = null;
    this.$onInit = function () {
        // init user
        if (authService.getUser() !== null && authService.getUser() !== 'null'){
            $scope.username = authService.getUser();
        }
    };
}]);
