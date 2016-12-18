/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('infoService', function ($http, authService) {
    this.getInfo = function(url) {
        return $http({
            method: "POST",
            url: url,
            params: {
                "username": authService.getUser(),


            }
        })


    }

});
