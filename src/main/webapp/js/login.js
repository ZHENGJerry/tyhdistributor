$(function(){
	

	//登录密码显示
	$('.login-password-show').click(function(){

		if ($("#log-password").attr("type") == "password") {
            $("#log-password").attr("type", "text");
            $("#login-main .login-password-show").css('background','url("img/pass_close.png") no-repeat center center');
        }
        else {
            $("#log-password").attr("type", "password");
            $("#login-main .login-password-show").css('background','url("img/pass_open.png") no-repeat center center');
        }
	});

	//注册密码显示
	$('.reg-password-show').click(function(){

		if ($("#reg-password").attr("type") == "password") {
            $("#reg-password").attr("type", "text");
            $("#login-main .reg-password-show").css('background','url("img/pass_close.png") no-repeat center center');
        }
        else {
            $("#reg-password").attr("type", "password");
            $("#login-main .reg-password-show").css('background','url("img/pass_open.png") no-repeat center center');
        }
	});


	//验证"登录手机"注册与否
	$('#reg-username').keyup(function(){
		var reg_username=$(this).val();
		if(reg_username.length==11){

			$.ajax({
				url:'/tyhcontrol/userValidate',
				type:'post',
				data:{
					'reg_username':reg_username,
				},
				success:function(data){
					var data=data;
					if(data=="no"){
						alert('您的账号已注册！');

						$('.reg-main-cellphone').attr('disabled',true);
					}
				},
			});

			//解封"获取验证码"
			$('.reg-main-cellphone').attr('disabled',false);
		}
		else if(reg_username.length<11){
			$('.reg-main-cellphone').attr('disabled',false);
		}
		
	});

	

	//离开注册"验证码"向后台提交ajax
	$('#reg-validatenum').keyup(function(){
		var reg_validatenum=$(this).val();

		if(reg_validatenum.length==4){
			$.ajax({
				url:'/tyhcontrol/infoValidateShow',
				type:'post',
				data:{
					'reg_validatenum':reg_validatenum,
				},
				success:function(data){
					var data=data;
					if(data=="no"){
						alert('您输入的验证码错误！');
					}
					else{
						$('.per-info-company').attr('disabled',false);
						$('.per-info-person').attr('disabled',false);
					}
				},
			});
		}
		
	});


	//登录“验证码”功能
	$('#log-validatenum').keyup(function(){
		var reg_validatenum=$(this).val();

		if(reg_validatenum.length==4){
			$.ajax({
				url:'/tyhcontrol/infoValidateShow',
				type:'post',
				data:{
					'reg_validatenum':reg_validatenum,
				},
				success:function(data){
					var data=data;
					if(data=="no"){
						alert('您输入的验证码错误！');
					}else{
						// 点击"登录"
						$('.login-in').unbind('click').click(function(){
					        //登录验证
							if($('.login-in').loginForm().form()){
					        	//提交表单
						        $('.login-info').ajaxSubmit({
						        	url:'/tyhcontrol/userlogin',
						        	type : 'post',
									success:function(data){
										var data=data;
										if(data=="yes"){
											window.location.href='/tyhcontrol/index.html';
										}else{
											alert('您的账号或密码错误！');
										}
									},
						        });
							}
						});
					}	
				},
			});
		}
		
	});


	/*// 点击"登录"
	$('.login-in').click(function(){

        //登录验证
		if($(this).loginForm().form()){
        	//提交表单
	        $('.login-info').ajaxSubmit({
	        	url:'/tyhcontrol/userlogin',
	        	type : 'post',
				success:function(data){
					var data=data;
					if(data=="yes"){
						window.location.href='/tyhcontrol/index.html';
					}
					else{
						alert('您的账号或密码错误！');
					}
				},
	        });

		}
		
	});*/


	//点击"注册手机验证"向后台发送数据
	$('.reg-main-cellphone').click(function(){
		var phone=$('#reg-username').val();
		if(phone.length==11){
			$.ajax({
				url:'/tyhcontrol/infoValidate',
				type:'post',
				data:{
					'phone':phone,
				},
			});

			//倒计时显示
			sendCode2($(this)[0]);
		}
		else{
			$(this).attr('disabled',true);
		}
		
	});

	//点击登录"手机验证"向后台发送数据
	$('.login-main-cellphone').click(function(){
		var phone=$('#log-username').val();
		if(phone.length==11){
			$.ajax({
				url:'/tyhcontrol/infoValidate',
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

	//登录账号11位时解封"获取验证码"
	$('#log-username').keyup(function(){
		if($(this).val().length==11){
			$('.login-main-cellphone').attr('disabled',false);
		}
	});



	// "立即注册"事件
	$('#login-main .login-main-reg').click(function(){
		$('#login-main .login').css('display','none');
		$('#login-main .login-reg-interfance').css('display','block');
	});

	// "我是企业"点击事件
	$('#login-main .per-info-company').click(function(){

		//验证是否已填
		if($(this).regForm().form()){		
			$('#login-main .login-reg-interfance').css('display','none');
			$('#login-main .business').css('display','block');
			$('#login-main .business .company').css('display','block');
			$('#login-main .business .reg-interface .page1').css('display','block');
			$('.reg-compay-btn').css('display','block');
			$('#login-main .form-horizontal .regist .reg-interface .distributor').css('display','none');

			//将值赋值给role1
			$('#role1').val($(this).text());
		}

	});

	// "我是个人"点击事件
	$('#login-main .per-info-person').click(function(){

		//首先验证是否已填信息
		if($(this).regForm().form()){		//验证成功
			$('#login-main .login-reg-interfance').css('display','none');
			$('#login-main .business').css('display','block');
			$('#login-main .business .company').css('display','block');
			$('#login-main .distributor').css('display','block');
			$('#login-main .distributor-person').css('display','block');

			//将值赋值给role1
			$('#role1').val($(this).text());
		}


	});

	//管理员输入正确号码解封
	$('#reg-company-administrator-phone').keyup(function(){
		if($(this).val().length==11){
			$('.reg-compay-btn').attr('disabled',false);
		}
	});

	// "下一步"事件
	$('.reg-compay-btn').click(function(){

		//验证是否已填
		if($(this).companyForm().form()){
			$(this).css('display','none');
			$('#login-main .company .page1').css('display','none');
			$('#login-main .company').find('.page2').css('display','block');
		}

	});

	//"我是供应商"点击事件
	$('.support-company').click(function(){
		//验证信息是否已填
		if($(this).companyForm().form()){
			$('.support-company-info').dialog('open');
			$('.register-company').removeAttr('disabled');
			$('.sale-company').attr('disabled','disabled');
			
			//将值付给隐藏域
			$('#role2').val($(this).text());
		}
	});

	$('.support-company-info').dialog({
		autoOpen:false,
		modal:true,
		resizable: false,
		draggable: false,
		buttons: [
		    {
		      text: "我已阅读",
		      click: function() {
		        $( this ).dialog( "close" );
		      }
		    }
		]
	}).parent().parent().find('.ui-widget-header').hide();

	//"我是分销商"点击事件
	$('.sale-company').click(function(){
		//验证信息是否已填
		if($(this).companyForm().form()){
			$('.sale-company-info').dialog('open');
			$('.register-company').removeAttr('disabled');
			$('.support-company').attr('disabled','disabled');

			//将值付给隐藏域
			$('#role2').val($(this).text());
		}
	});

	$('.sale-company-info').dialog({
		autoOpen:false,
		modal:true,
		resizable: false,
		draggable: false,
		buttons: [
		    {
		      text: "我已阅读",
		      click: function() {
		        $( this ).dialog( "close" );
		      }
		    }
		]
	}).parent().parent().find('.ui-widget-header').hide();

	// "个人分销商"点击事件
	$('.per-distributor').click(function(){

		//判断信息是否已填
		if($(this).perBussForm().form()){
			$('.per-distributor-info').dialog('open');
			$('.register-distributor').removeAttr('disabled');
			// $('.register-guide').attr('disabled','disabled');
			$('.per-guide').attr('disabled','disabled');

			//将值付给隐藏域
			$('#role2').val($(this).text());
		}
		
	});

	$('.per-distributor-info').dialog({
		autoOpen:false,
		modal:true,
		resizable: false,
		draggable: false,
		buttons: [
		    {
		      text: "我已阅读",
		      click: function() {
		        $( this ).dialog( "close" );
		      }
		    }
		]
	}).parent().parent().find('.ui-widget-header').hide();

	//个人分销商的"确定注册"
	$('.register-distributor').click(function(){
		$(this).attr('disabled','disabled');

		$('.distributor').ajaxSubmit({
        	url:'/tyhcontrol/register',
        	type : 'post',  
			data:{
				'reg_username':$('#reg-username').val(),
				'reg_password':$('#reg-password').val(),
				'reg_email':$('#reg-email').val(),
				'reg_validatenum':$('#reg-validatenum').val(),
				'company_address_nationwide':$('.company-address-nationwide').text(),
				'company_address_county':$('.company-address-county').text(),
				'role1':$('#role1').val(),
				'role2':$('#role2').val(),
			},
			clearForm : true,
			success:function(data){
				var data=data;
				if(data=="yes"){
					$('.reg-sueccss').dialog('open');

				}
			},
			error:function(event, errorText, errorType){
				alert(errorText + errorType);
			},
        });
		
	});

	// 我是供应商、分销商的"确定注册"
	$('.company').submit(function(){
		$('.register-company').attr('disabled','disabled');
		//供应商提交表单
		if(!($('.support-company').attr('disabled')=='disabled')){
			$('.company').ajaxSubmit({
	        	url:'/tyhcontrol/register',
	        	type : 'post',  
				data:{
					'reg_username':$('#reg-username').val(),
					'reg_password':$('#reg-password').val(),
					'reg_email':$('#reg-email').val(),
					'reg_validatenum':$('#reg-validatenum').val(),
					'company_address_nationwide':$('.company-address-nationwide').text(),
					'company_address_county':$('.company-address-county').text(),
					'role1':$('#role1').val(),
					'role2':$('#role2').val(),
				},
				clearForm : true,
				success:function(data){
					var data=data;
					if(data=="yes"){
						$('.reg-sueccss').dialog('open');
					}
				},
				error:function(event, errorText, errorType){
					alert(errorText + errorType);
				},
	        });
		}
		//分销商提交表单
		if(!($('.sale-company').attr('disabled')=='disabled')){
			$('.company').ajaxSubmit({
	        	url:'/tyhcontrol/register',
	        	type : 'post', 
				data:{
					'reg_username':$('#reg-username').val(),
					'reg_password':$('#reg-password').val(),
					'reg_email':$('#reg-email').val(),
					'reg_validatenum':$('#reg-validatenum').val(),
					'company_address_nationwide':$('.company-address-nationwide').text(),
					'company_address_county':$('.company-address-county').text(),
					'role1':$('#role1').val(),
					'role2':$('#role2').val(),
				},
				clearForm : true,
				success:function(data){
					var data=data;
					if(data=="yes"){
						$('.reg-sueccss').dialog('open');
					}
				},
				error:function(event, errorText, errorType){
					alert(errorText + errorType);
				},
	        });
		}

        return false;
	});

	// "领队/导游"点击事件
	$('#login-main .per-guide').click(function(){
		//判断信息是否已填
		if($(this).perBussForm().form()){
			$('#login-main .distributor-person').css('display','none');
			$('#login-main .distributor-guide').css('display','block');

			//将值付给隐藏域
			$('#role2').val($(this).text());
		}


		// 七牛云图片上传
	     Qiniu.uploader({
	        runtimes: 'html5,flash,html4',
	        browse_button: 'pass-file-img',
	        container: 'pass-file',
	        max_file_size: '2mb',
	        flash_swf_url: '/Moxie.swf',
	        unique_names:true,     //自动生成唯一文件名
	        // uptoken:"7qVwwPdf2eSQpudaQDm4_I3eeLEg102v6iSgbdRl:l85gh6CaPEAo8XqbHzeYL_7L25c=:eyJzY29wZSI6InBpY3M0bHV4aWFuIiwiZGVhZGxpbmUiOjE0ODM2NzEzMDB9",
	        uptoken_url: $('#upkoen_url').val(),
	        domain: $('#domain').val(),   //测试域名,bucket域名，下载资源时用到，必需
	        get_new_uptoken: false,                //设置上传文件的时候是否每次都重新获取新的uptoken
	        auto_start: true,                  //自动上传
	        log_level: 5,
	        init: {
	           	//图片上传成功
	            'FilesAdded': function(up, files) {
	                for (var i = 0; i < files.length; i++) {
	                    var fileItem = files[i].getNative(),
	                    url = window.URL || window.webkitURL || window.mozURL;

	                    var src = url.createObjectURL(fileItem);
	                    $('#img-preview').attr('src',src);
	                }
	            },
	            
	        	'FileUploaded': function(up, file, info) {

	                var domain = "http://pics.ctripfair.com";
	                var res = JSON.parse(info);
	                var sourceLink = domain +"/"+ res.key;

	                $('#hidden-img').val(sourceLink);
	                $('.register-guide').attr('disabled',false);
	            },

	            //图片上传失败
	            'Error': function(up, err, errTip) {
	               $('.register-guide').attr('disabled',true);
	               alert('图片上传失败！');
	        	},
	        }
	    });

	});

	// 领队/导游的"确定注册"
	$('.distributor').submit(function(){

		if($.identiySelect().form()){

			$(".register-guide").attr('disabled','disabled');

			$(this).ajaxSubmit({
	        	url:'/tyhcontrol/register',
	        	type : 'post',  
				data:{
					'reg_username':$('#reg-username').val(),
					'reg_password':$('#reg-password').val(),
					'reg_email':$('#reg-email').val(),
					'reg_validatenum':$('#reg-validatenum').val(),
					'company_address_nationwide':$('.company-address-nationwide').text(),
					'company_address_county':$('.company-address-county').text(),
					'role1':$('#role1').val(),
					'role2':$('#role2').val(),
				},
				clearForm : true,
				success:function(data){
					var data=data;
					if(data=="yes"){
						$('.reg-sueccss').dialog('open');
						// window.location.href='/tyhcontrol/login.html';
					}
				}
	        });
		}

		return false;
	});

	// 注册提示信息
	$('.reg-sueccss').dialog({
		autoOpen:false,
		modal:true,
		resizable: false,
		draggable: false,
		buttons: [
		    {
		      text: "我已阅读",
		      click: function() {
		        window.location.href='/tyhcontrol/login.html';
		      }
		    }
		]
	}).parent().parent().find('.ui-widget-header').hide();

	//登录提示信息
	$('.log-success').dialog({
		autoOpen:false,
		modal:true,
		resizable: false,
		draggable: false,
		buttons: [
		    {
		      text: "我已阅读",
		      click: function() {
		        $( this ).dialog( "close" );
		      }
		    }
		]
	}).parent().parent().find('.ui-widget-header').hide();

	// 城市选择
	$('.show-address').click(function(){
      $('#select-city').dialog('open');
      // $('#select-city').parent().find('.ui-button').attr('disabled',true);
    });

    $("#select-city").dialog({
        autoOpen:false,
    	width:445,
        title:'请选择城市',
      	modal: true,
      	draggable: false,
      	resizable: false,
      	buttons: [ { 
      		text: "确定", 
      		click: function() { 
      			var _province=$('#province1').val();
			    var _city=$('#city1').val();
			    
			    // "我是企业"地点选择
		    	$('.company-address-nationwide').text(_province);
		    	$('.company-address-county').text(_city);
			   	
			   	// "个人分销商"地点选择
		    	$('.distributor-address-nationwide').text(_province);
		    	$('.distributor-address-county').text(_city);
				

      			$( this ).dialog( "close" ); 
      	} } ],
    });



});