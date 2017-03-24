//验证信息模板
function validate(reg,value){
	if(reg.test(value)){
		return true;
	}
	return;
}


// 用户名-中文或英文
function testName(value){
	var reg=/^([a-zA-Z]*|[\u4E00-\u9FA5\uf900-\ufa2d]*)$/ ;
	return validate(reg,value);
}

// 密码-6-10位 只含有字母和数字
function testPwd(value){
	var reg=/^[a-zA-Z0-9]{6,10}$/;
	return validate(reg,value);
}

// 电话号码（1开头11位）
function testPhone(value){
	var reg=/^1[34578]\d{9}$/ ;
	return validate(reg,value);
}

// 邮箱验证
function testEmail(value){
	var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	return validate(reg,value);
}

// 工号验证6位数字
function testjobNum(value){
	var reg=/^[0-9]{6}$/;
	return validate(reg,value);
}

// 身份证号验证
function testjIDCard(value){
	var reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
	return validate(reg,value);
}



// $(document).ready(function(){
// 	var aa=document.getElementById('username')
// 	$("#add-s-ok").click(function(){
// 		if(testName(username.value)){
// 			alert('');
// 		}
// 	};
// });
