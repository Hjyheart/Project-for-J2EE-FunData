/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('createService', function ($http, authService) {
    this.createDateset = function(url, description, datasetName) {
        return $http({
                method: "POST",
                url: url,
                params: {
                    "username": authService.getUser(),
                    "desc": description,
                    "datasetname": datasetName
                }
            });
    }
    
    this.createMooc = function (url, courseName, courseDes, teacher ) {
        return $http({
            method: 'POST',
            url: url,
            params: {

            }
        });
    }

});