/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('detailService', function ($http, authService) {
    this.getDetail = function(url, pageStart, datasetName) {
        return $http({
                method: "POST",
                url: url,
                params: {
                    "username": authService.getUser(),
                    "page": pageStart,
                    "datasetname": datasetName
                }
            });
    }

});