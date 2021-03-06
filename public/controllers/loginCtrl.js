/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');
app.controller('loginCtrl', function ($scope, $http,
                                      constService,
                                        authService) {
    $scope.error = false;

    $scope.removeError = function () {
        $scope.error = false;
    }
    $scope.login = function (email, pwd) {
        $http({
            method: "POST",
            url: constService.urls().setSession,
            params: {
                "email": email,
                "pwd": pwd
            }
        })
            .then( res => {
                if(res.data===""){
                    $scope.error = true;
                }
                else{

                    authService.setUser(res.data);

                    location.href = "/";
                }

            })
    }

});
