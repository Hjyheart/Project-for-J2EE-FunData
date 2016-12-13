/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('authService', function ($http, $q, constService) {
    this.getUser = function() {
        return sessionStorage.getItem('username');
    }

    this.setUser = function(username) {
        return sessionStorage.setItem('username', username);
    }

});
