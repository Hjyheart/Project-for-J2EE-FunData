/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('listService', function ($http, authService) {
    this.getList = function(url, pageStart) {
        return $http({
                method: "POST",
                url: url,
                params: {
                    "username": authService.getUser(),
                }
        })


    }

});
