/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('infoService', function ($http, authService) {
    this.getInfo = function(url, pageStart) {
        return authService.getInfo().then( username => {
            return $http({
                method: "POST",
                url: url,
                params: {

                    "username": username,
                    "page": pageStart
                }
            })

        })
    }

});
