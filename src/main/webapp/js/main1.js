/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */


$(function() {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: '1000mb',
        flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),  //是否可以支持选择多个文件上传
        uptoken:"7qVwwPdf2eSQpudaQDm4_I3eeLEg102v6iSgbdRl:WNmUiMoLsz_xAfkW4rKCTaat0fA=:eyJzY29wZSI6InBpY3M0bHV4aWFuIiwiZGVhZGxpbmUiOjE0ODM1Mzc4ODZ9",
        // uptoken_url: $('#uptoken_url').val(),
        // uptoken_func: function(){
        //     var ajax = new XMLHttpRequest();
        //     ajax.open('GET', $('#uptoken_url').val(), false);
        //     ajax.setRequestHeader("If-Modified-Since", "0");
        //     ajax.send();
        //     if (ajax.status === 200) {
        //         var res = JSON.parse(ajax.responseText);
        //         console.log('custom uptoken_func:' + res.uptoken);
        //         return res.uptoken;
        //     } else {
        //         console.log('custom uptoken_func err');
        //         return '';
        //     }
        // },
        // domain: 'oizgfh6ef.bkt.clouddn.com',   //测试域名,bucket域名，下载资源时用到，必需
        domain: $("#domain").val(),   //测试域名,bucket域名，下载资源时用到，必需
        get_new_uptoken: false,                //设置上传文件的时候是否每次都重新获取新的uptoken
        // downtoken_url: 'http://ctripfair/tyhcontrol/qnytoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
        // unique_names: true,      // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
        // save_key: true,          // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
        // x_vars: {                // 查看自定义变量
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        auto_start: true,                  //自动上传
        log_level: 5,
        init: {
            'FilesAdded': function(up, files) {
                $('table').show();
                $('#success').hide();
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });

               
            },
            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                $('#success').show();
            },
            'FileUploaded': function(up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info);

                // var domain = up.getOption('domain');
                var domain = "http://pics.ctripfair.com";
                var res = JSON.parse(info);
                var sourceLink = domain +"/"+ res.key;
                alert(sourceLink);
                // console.log(sourceLink);
            },
            'Error': function(up, err, errTip) {
                $('table').show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
                // ,
                // 'Key': function(up, file) {
                //     var key = "";
                //     // do something with key
                //     return key
                // }
        }
    });

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });
    $('#container').on(
        'dragenter',
        function(e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function(e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });
    


    var getRotate = function(url) {
        if (!url) {
            return 0;
        }
        var arr = url.split('/');
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === 'rotate') {
                return parseInt(arr[i + 1], 10);
            }
        }
        return 0;
    };

    // $('#myModal-img .modal-body-footer').find('a').on('click', function() {
    //     var img = $('#myModal-img').find('.modal-body img');
    //     var key = img.data('key');
    //     var oldUrl = img.attr('src');
    //     var originHeight = parseInt(img.data('h'), 10);
    //     var fopArr = [];
    //     var rotate = getRotate(oldUrl);
    //     if (!$(this).hasClass('no-disable-click')) {
    //         $(this).addClass('disabled').siblings().removeClass('disabled');
    //         if ($(this).data('imagemogr') !== 'no-rotate') {
    //             fopArr.push({
    //                 'fop': 'imageMogr2',
    //                 'auto-orient': true,
    //                 'strip': true,
    //                 'rotate': rotate,
    //                 'format': 'png'
    //             });
    //         }
    //     } else {
    //         $(this).siblings().removeClass('disabled');
    //         var imageMogr = $(this).data('imagemogr');
    //         if (imageMogr === 'left') {
    //             rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
    //         } else if (imageMogr === 'right') {
    //             rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
    //         }
    //         fopArr.push({
    //             'fop': 'imageMogr2',
    //             'auto-orient': true,
    //             'strip': true,
    //             'rotate': rotate,
    //             'format': 'png'
    //         });
    //     }

    //     $('#myModal-img .modal-body-footer').find('a.disabled').each(function() {

    //         var watermark = $(this).data('watermark');
    //         var imageView = $(this).data('imageview');
    //         var imageMogr = $(this).data('imagemogr');

    //         if (watermark) {
    //             fopArr.push({
    //                 fop: 'watermark',
    //                 mode: 1,
    //                 image: 'http://www.b1.qiniudn.com/images/logo-2.png',
    //                 dissolve: 100,
    //                 gravity: watermark,
    //                 dx: 100,
    //                 dy: 100
    //             });
    //         }

    //         if (imageView) {
    //             var height;
    //             switch (imageView) {
    //                 case 'large':
    //                     height = originHeight;
    //                     break;
    //                 case 'middle':
    //                     height = originHeight * 0.5;
    //                     break;
    //                 case 'small':
    //                     height = originHeight * 0.1;
    //                     break;
    //                 default:
    //                     height = originHeight;
    //                     break;
    //             }
    //             fopArr.push({
    //                 fop: 'imageView2',
    //                 mode: 3,
    //                 h: parseInt(height, 10),
    //                 q: 100,
    //                 format: 'png'
    //             });
    //         }

    //         if (imageMogr === 'no-rotate') {
    //             fopArr.push({
    //                 'fop': 'imageMogr2',
    //                 'auto-orient': true,
    //                 'strip': true,
    //                 'rotate': 0,
    //                 'format': 'png'
    //             });
    //         }
    //     });

    //     var newUrl = Qiniu.pipeline(fopArr, key);

    //     var newImg = new Image();
    //     img.attr('src', 'images/loading.gif');
    //     newImg.onload = function() {
    //         img.attr('src', newUrl);
    //         img.parent('a').attr('href', newUrl);
    //     };
    //     newImg.src = newUrl;
    //     return false;
    // });

});
