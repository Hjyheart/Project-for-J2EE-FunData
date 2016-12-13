/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');
app.controller('authCtrl', function ($scope, $http,
                                        authService) {
    $scope.isLogin = false;
    $scope.name;
    this.$onInit = function () {
        $scope.name = authService.getUser()
        $scope.isLogin = !( authService.getUser() === 'null'|| authService.getUser() === null );
    }

    $scope.logout = function () {
        $scope.isLogin = false;
        authService.setUser(null);
    }

});
