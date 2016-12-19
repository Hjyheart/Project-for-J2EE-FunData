/**
 * Created by huang on 16-11-28.
 */
app.controller('registerCtrl', ['$scope', '$http', 'constService', 'authService', function ($scope, $http,
                                        constService,
                                        authService) {
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
                console.log(res)
                authService.setUser(res.data);
                location.href = '/'
            })
            .catch(err => {
                console.log(err);
            })
    }

}]);
