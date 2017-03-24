$(function(){
    //日历默认格式
    $.datepicker.setDefaults({
        dateFormat: "yy-mm-dd",
        dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ],
        minDate:0,
        monthNames: [ "一月 ", "二月 ", "三月 ", "四月 ", "五月 ", "六月 ", "七月 ", "八月 ", "九月 ", "十月 ", "十一月 ", "十二月 " ],
        showOtherMonths: true,
    });
});


//验证是否登录跳出登录界面
function ValidateLogin(){
	window.parent.location.href='/tyhcontrol/login.html';
}


//添加七牛云"上传图片"方法
//参数1为按钮id，参数2为盛放容器，参数3为点击上传按钮
function   Up(btn,container,btn2){
	var uploader = Qiniu.uploader({
    	runtimes: 'html5,flash,html4',
        browse_button: btn,
        max_file_size: '2mb',
        flash_swf_url: '/Moxie.swf',
        unique_names:true,     //自动生成唯一文件名
        // uptoken:"7qVwwPdf2eSQpudaQDm4_I3eeLEg102v6iSgbdRl:SdGJsQS-Phanm3TdCy0i1Zxt6K4=:eyJzY29wZSI6InBpY3M0bHV4aWFuIiwiZGVhZGxpbmUiOjE0ODQ5MDI2ODd9",
        uptoken_url: $('#upkoen_url_1').val(),
        domain: $('#domain_1').val(),   //测试域名,bucket域名，下载资源时用到，必需
        get_new_uptoken: false,                //设置上传文件的时候是否每次都重新获取新的uptoken
        auto_start: true,                  //自动上传
        log_level: 5,
        init: {
           	// 图片上传成功
            'FilesAdded': function(up, files) {
                for (var i= 0; i < files.length; i++) {
                    var fileItem = files[i].getNative(),
                    url = window.URL || window.webkitURL || window.mozURL;

                    var src = url.createObjectURL(fileItem);
                    $(container).attr('src',src);
                }
            },
            
        	'FileUploaded': function(up, file, info) {

                var domain = "http://pics.ctripfair.com";
                var res = JSON.parse(info);
                var sourceLink = domain +"/"+ res.key;

                $(container).attr('src',sourceLink);
            },

            //图片上传失败
            'Error': function(up, err, errTip) {
               
               alert('图片上传失败！');
        	},
        }
        	
    });
    // $(btn2).click(function(){
    // 	uploader.start();
    // });
}

//获取url的参数
function GetRequest() {  
    var url = location.search; 
    var A='';  
    var theRequest = new Object();  
    if (url.indexOf("?") != -1) {  
        A= url.substr(1);    
    }  
    return A;
}

//获取url的参数每一个value
function getUrlValue() {  
    var url = location.search.split('&'); 
    var arr=[];
    for(var i=0;i<url.length;i++){
        var temp=url[i].split('=');
        arr.push(temp[1]);
    }  
    return arr;
}

/*
这是静态的
点击下拉框css1获取值
cObj是一个jquery对象
*/
function clickReplace(cObj,css1){
    cObj.find('li').click(function(){
        $(css1).text($(this).find('a').text());
    });
}


/*
动态点击下拉框css1获取值
pObj是依赖的父亲
sObj是儿子需要点击的事件的类
css是盛放的文字
*/
function clickDynamicReplace(pObj,sObj,css){
    pObj.on('click', sObj, function(){
        $(this).parent().parent().parent().find(css).text($(this).text());
    });
}


//模态框弹出
function modalFade(url,fn){
    var dialog=$(window.parent.document.body).find('#myModal');
    dialog.load(url,function(){
        dialog.modal('show');
        if(fn){
            fn();
        }
        
    });

}

//向后台访问，传值json形式
function ajaxTo(url,send_data,fn1,fn2){
    $.ajax({
        url:url,
        type:'post',
        contentType:'application/json;charset=UTF-8',
        data:send_data,
        success:function(list){
            if(fn1){
                 fn1(list);   
            }
            if(fn2){
               fn2(list); 
           }
        },
    });
}


//向后台访问，传值key=value形式
function ajaxToCommen(url,send_data,fn1,value){
    $.ajax({
        url:url,
        type:'post',
        data:send_data,
        success:function(list){
            if(fn1){
                if(!value){
                 fn1(list);   
                }else{
                     fn1(list,value);   
                }
            }
        },
    });
}

//设置cookie，time是天数
function setCookie(key,value){
    document.cookie=key+'='+value;
}

//获取cookie
function getCookie(key) {
    var arr = document.cookie.split('; ');
    for(var i = 0; i < arr.length; i++) {
        var arrName = arr[i].split('=');
        if(arrName[0] == key) {
            return arrName[1];
        }
    }
    return '';
}

//删除cookie
function deleteCookie(key){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()-1);
    document.cookie=key+"=1; expires="+ oDate; 
}