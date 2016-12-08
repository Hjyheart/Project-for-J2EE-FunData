/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('infoService', function ($http, $q, constService) {


    this.setInfo = (key, value) => {
        infoService.info = value;
        //info[key] = value;
    }
    this.getInfo = (key) => {

        return $http({
            method: "POST",
            url: constService.urls().getSession,
        });

        //
        //     .then( res => {
        //         username = res.data;
        //     });
        // return username;
        //return defered.promise;
    }

});
