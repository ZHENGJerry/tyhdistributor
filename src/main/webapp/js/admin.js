$(function(){
	//验证"登录手机"注册与否
/*	$('#log-username').keyup(function(){
		var reg_username=$(this).val();
		if(reg_username.length==11){

			$.ajax({
				url:'/tyhcontrol/adminLogin',
				type:'post',
				data:{
					'phone':reg_username,
				},
				success:function(data){
					//var data=data;
					if(data=="no"){
						alert('您的手机号未注册！');
						//$('.reg-main-cellphone').attr('disabled',true);
						return;
					}else{
						$('.login-main-cellphone').attr('disabled',false);
					}
				},
			});
		}
		
	});*/

	//登录“验证码”功能
	$('#log-validatenum').keyup(function(){
		var reg_validatenum=$(this).val();

		if(reg_validatenum.length==4){
			$.ajax({
				url:'/tyhadmin/infoValidateShow',
				type:'post',
				data:{
					'reg_validatenum':reg_validatenum,
				},
				success:function(data){
					var data=data;
					if(data=="no"){
						alert('您输入的验证码错误！');
						return;
					}else{
						$("#loginButton").attr('disabled',false);
					}
					
				},
			});
		}
		
	});
	
	$("#loginButton").click(function(){
		var username = $('#log-username').val();
		var password = $('#log-password').val();
		$.ajax({
			url:'/tyhadmin/userlogin',
			type:'post',
			data:{
				'username':username,
				'password':password,
			},
			success:function(data){
				var data=data;
				if(data=="no"){
					alert('您输入的用户名或密码有误！');
					return;
				}else{
					window.location.href='/tyhadmin/administrator.html';
				}
				
			},
		});
		
	});

	//点击登录"手机验证"向后台发送数据
	$('.login-main-cellphone').click(function(){
		var phone=$('#log-username').val();
		if(phone.length==11){
			$.ajax({
				url:'/tyhadmin/infoValidate',
				type:'post',
				data:{
					'phone':phone,
				},
			});

			//倒计时显示
			sendCode1($(this)[0]);
		}
		else{
			$(this).attr('disabled',true);
		}
		
	});

});