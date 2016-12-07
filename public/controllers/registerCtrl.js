/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');
app.controller('registerCtrl', function ($scope, $http,
                                        constService,
                                        infoService) {
    $scope.error = false;

    $scope.removeError = function () {
        $scope.error = false;
    }
    $scope.signUp = function (email, pwd, repwd, name) {
        if( pwd !== repwd) {
            $scope.error = true;
        }

        $http({
            method: "POST",
            url: constService.urls().register,
            params: {
                "email": email,
                "pwd": pwd,
                "name": name
            }
        })
            .then( res => {
                infoService.setInfo("username", res.data);
            })
    }

});
