/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('listService', function ($http, infoService) {
    this.getList = function(url, pageStart) {
        return $http({
            method: "POST",
            url: url,
            params: {
                "user_id": infoService.getInfo('user_id'),
                "pageStart": pageStart
            }
        });
    }

})