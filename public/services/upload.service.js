/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');

app.service('uploadService', function (constService) {
    this.upload = function () {
        return Qiniu.uploader({
            runtimes: 'html5,flash,html4',      // 上传模式，依次退化
            browse_button: 'upload',         // 上传选择的点选按钮，必需
            uptoken: 'QHa9Dulo5qj0Acl7ZMrNkOztkHE_G5at-Yx4F2zG:WuiEcAHLPA8vuybxmvF7eqEOW50=:eyJzY29wZSI6IndsZHh5MTIzIiwiZGVhZGxpbmUiOjE0ODE3Mjk0MDZ9',

            get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
            domain: 'oagx7gq4u.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
            container: 'dataset-upload',             // 上传区域DOM ID，默认是browser_button的父元素
            max_file_size: '100mb',             // 最大文件体积限制
            max_retries: 3,                     // 上传失败最大重试次数
            dragdrop: true,
            drop_element: 'dataset-upload',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                  // 分块上传时，每块的体积
            auto_start: true,

            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        console.log(file);
                    });
                },
                'BeforeUpload': function(up, file) {
                    // 每个文件上传前，处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时，处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                    console.log(info);
                },
                'Error': function(up, err, errTip) {
                    console.log(err)
                    //上传出错时，处理相关的事情
                },
                'UploadComplete': function() {
                    //队列文件处理完毕后，处理相关的事情
                },
                'Key': function (up, file) {
                    var key = '';
                    $.ajax({
                        url: `${constService.urls().getKey}`,
                        type: 'POST',
                        async: false,//这里应设置为同步的方式
                        data: {
                            name: file.name
                        },
                        success: function(data) {
                            key = data.name;
                        },
                        cache: false
                    });
                    return key;
                }
            }
        });
    }
});
