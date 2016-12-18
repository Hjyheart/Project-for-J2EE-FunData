/**
 * Created by hongjiayong on 2016/12/5.
 */
var app = angular.module('myApp');

app.service('divideService', function () {
    this.getHtml= function (text) {
        if(text === null){
            return;
        }
        var html = '<p>';
        for (var i = 0; i < text.length; i++){
            if (text[i] === "/"){
                if ( i + 1 < text.length && text[i + 1] === "n"){
                    html += '</p><p>';
                    i++;
                }
            }else {
                html += text[i];
            }
        }
        return html;
    };
});