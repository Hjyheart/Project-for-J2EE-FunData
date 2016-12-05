/**
 * Created by huang on 16-11-29.
 */
var app = angular.module('myApp');

app.service('infoService', function () {
    var info = {

        username: 'fdsf'
    };
    this.setInfo = function(key, value){
        info[key] = value;
    }
    this.getInfo = function(key) {
        return info[key];
    }

})
