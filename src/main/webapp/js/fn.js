var wait=60;
function sendCode1(obj){
	if(wait==0){	
		obj.disabled=false;
		obj.innerHTML='获取验证码';
		wait=60;
	}
	else{
		obj.disabled=true;
		obj.innerHTML='重新发送('+wait+')';
		obj.style.width=95+'px';
		obj.style.right=55+'px';
		wait--;
		setTimeout(function(){
			sendCode1(obj);
		},1000);
	}
}

var wait2=60;
function sendCode2(obj){
	if(wait2==0){	
		obj.disabled=false;
		obj.innerHTML='获取验证码';
		wait2=60;
	}
	else{
		obj.disabled=true;
		obj.innerHTML='重新发送('+wait2+')';
		obj.style.width=95+'px';
		obj.style.top=4+'px';
		obj.style.right=30+'px';
		wait2--;
		setTimeout(function(){
			sendCode2(obj);
		},1000);
	}
}
