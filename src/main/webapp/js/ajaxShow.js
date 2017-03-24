 function executeScript(html){
    
    var reg = /<script[^>]*>([^\x00]+)$/i;
    //对整段HTML片段按<\/script>拆分
    var htmlBlock = html.split("<\/script>");
    for (var i in htmlBlock) 
    {
        var blocks;//匹配正则表达式的内容数组，blocks[1]就是真正的一段脚本内容，因为前面reg定义我们用了括号进行了捕获分组
        if (blocks = htmlBlock[i].match(reg)) 
        {
            //清除可能存在的注释标记，对于注释结尾-->可以忽略处理，eval一样能正常工作
            var code = blocks[1].replace(/<!--/, '');
            try 
            {
                eval(code) //执行脚本
            } 
            catch (e) 
            {
            }
        }
    }
}

function showLocal(url,id){
	var xhr='';
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");			//IE6
	}
	xhr.open('post',url,true);
	xhr.send();
	xhr.onreadystatechange=function() {   
    
        if (xhr.readyState == 4) {
            
            if (xhr.status == 200) {      
                document.getElementById(id).innerHTML=xhr.responseText;    //重设页面中id="content"的div里的内容
                executeScript(xhr.responseText);
            }
            //错误状态处理
            else if (xhr.status == 404){
                alert("出错了（错误代码：404 Not Found）!"); 
                return;
            }
            else if (xhr.status == 403) {  
                alert("出错了（错误代码：403 Forbidden）"); 
                return;
            }
            else {
                alert("出错了（错误代码：" + request.status + "）"); 
                /* 对出现了其他错误代码所示错误的处理   */
                return;
            }   
        } 
    }
}