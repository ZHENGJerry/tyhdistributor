
//上传图片预览
$(".imgupload").each(function(i,ele){
    var This=this;
    upload( This,$(This).parent().find(".imgbox"));
    $(this).next().on("click",function(){
        //移入放大图片
        //创建图片的外包装盒
        var owrap=$("<div id='newwrap'>");
        owrap.css( "width",$("body").width() );
        owrap.css( "height",$("body").height() );
        //创建放大的图片
        var bigimg=$("<img>");
        bigimg.attr("src",$(this).attr("src"));
        bigimg.css("margin-top",($(window).height()-400)/2+$(document).scrollTop())
        //创建图片上的关闭按钮
        var close=$("<div id='close'>X</div>");
        close.css("top",($(window).height()-400)/2+$(document).scrollTop())
        close.css("right",(owrap.width()-400)/2)

        owrap.append( close );
        owrap.append( bigimg );
        $("body").append(owrap);
        //点击关闭按钮删除
        $("#close").on("click",function(){
            owrap.remove();
        })
    })
})



//设置文本输入框的高度
function seth(){
	$("textarea").each( function(i,ele){
        var tarh = $(ele).parent().height();
        $(ele).height(tarh);
    })
}
seth();

function upload(btn,wrap,fn){  
var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
    browse_button: btn,         // 上传选择的点选按钮，必需
    //uptoken: mtoken,
    get_new_uptoken: false,
    uptoken: "7qVwwPdf2eSQpudaQDm4_I3eeLEg102v6iSgbdRl:nKv4VEJcn16yMFme8Nl-RAFmK8g=:eyJzY29wZSI6InBpY3M0bHV4aWFuIiwiZGVhZGxpbmUiOjE0ODUwODExNzR9",
    //uptoken_url: "/tyhcontrol/qnytoken",
                 // 设置上传文件的时候是否每次都重新获取新的uptoken
    domain: 'http://pics.ctripfair.com/',     // bucket域名，下载资源时用到，必需
    //container: wrap,             // 上传区域DOM ID，默认是browser_button的父元素
    max_file_size: '5mb',             // 最大文件体积限制
    //flash_swf_url: '/Moxie.swf',  //引入flash，相对路径
   // max_retries: 3,                     // 上传失败最大重试次数
    dragdrop: true,                     // 开启可拖曳上传
    //drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: '4mb',                  // 分块上传时，每块的体积
    auto_start: true,                   
    init: {
        'FilesAdded': function(up, files) {
            for (var i= 0; i < files.length; i++) {
                var fileItem = files[i].getNative(),
                url = window.URL || window.webkitURL || window.mozURL;
                var src = url.createObjectURL(fileItem);
                wrap.attr('src',src);
            };
        },
       
        'FileUploaded': function(up, file, info) {
               // 每个文件上传成功后，处理相关的事情
               // 其中info是文件上传成功后，服务端返回的json，形式如：
               // {
               //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
               //    "key": "gogopher.jpg"
               //  }
               // 查看简单反馈
                var domain = "http://pics.ctripfair.com";
                var res = JSON.parse(info);
                var sourceLink = domain +"/"+ res.key;
                wrap.attr('src',sourceLink);
                // 获取上传成功后的文件的Url
        },
        'Error': function(up, err, errTip) {
               return ;
        },
    }
});

if(fn){
    fn();
}
}


//获取需要传送给后台的交互数据
var photo_con = [];
var text_con = [];
var img_con = [];
$("footer input").on("click",function(){
    getData();
    var result={
        'photo': photo_con,
        'text': text_con,
        'img': img_con
    }
    $.ajax({
        url: '/path/to/file',
        type: 'POST',
        data: JSON.stringify( result ),
        success: function(){

        }
    }) 
})

function getData(){
    //得到第一列中的选中的信息
    $(".photo-con").find("input:checked").each(function(i,ele){
        var data = $(ele).val();
        photo_con.push(data);
        return photo_con;
    })
    console.log(photo_con)
    //获取第二列的说明信息
    $(".text-con").each(function(i,ele){
        var data = $(ele).val();
        text_con.push(data);
        return text_con;
    })
    console.log(text_con);
    $(".imgbox").each(function(i,ele){
        var data = $(ele).src;
        img_con.push(data);
        return img_con;
    })
}