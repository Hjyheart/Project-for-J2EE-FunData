/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');

app.service('uploadService', function (constService, $http) {
    this.upload = function (type, id) {
        var token;
        $http({
            method: 'POST',
            url: constService.urls().getToken
        }).then( res=>{
            console.log(res.data);
            token = res.data;

            var loader = {
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'upload',         // 上传选择的点选按钮，必需
                uptoken: token.uptoken,
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                domain: 'oagx7gq4u.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
                container: 'dataset-upload',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '100mb',             // 最大文件体积限制
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,
                drop_element: 'dataset-upload',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积s
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
                        var _info = JSON.parse(info);
                        // 1->dataset 2->com 3->mooc
                        if (type === 1){
                            var url = "";
                            if(id.type.value === 1) {
                                url = `${constService.urls().confirmTitle}`
                            }
                            else {
                                url = `${constService.urls().confirmFile}`
                            }
                            $.ajax({
                                url: url,
                                type: 'POST',
                                data: {
                                    key: _info.key,
                                    username: id.username,
                                    datasetname: id.datasetname
                                },
                                success: function(data) {

                                },
                                cache: false
                            });
                        }else if (type === 2){

                        }else if (type === 3){

                        }


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
            };

            return Qiniu.uploader(loader);
        }).catch( err=>{
            console.log(err);
        });

    };

});
