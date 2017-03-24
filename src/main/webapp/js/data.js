$(function(){

	// "登录"验证
	$.fn.loginForm=function(){
		//返回form()方法
		return $('.login-info').validate({
			onfocusout : false,
			onkeyup:false,
			rules:{
				log_username:{
					required:true,
				},
				log_password:{
					required:true,	
				},
				reg_validatenum:{
					required:true,
				}
			},
			messages:{
				log_username:{
					required:'请输入企业账号',
				},
				log_password:{
					required:'请输入密码',
				},
				reg_validatenum:{
					required:'请输入手机验证码',
				}
			},
			highlight: function(element, errorClass) {
				$(element).css('border', '1px solid #dc388f');
			},
			unhighlight:function(element, errorClass){
				$(element).css('border', 'none');
			},
			errorPlacement: function(error, element) { //错误信息位置设置方法
				console.log(error.text());
			}
		});
	};

	$.validator.addMethod("isPositive",function(value,element){
        var length = value.length;  
    	var regPhone = /^1([3578]\d|4[57])\d{8}$/;  
    	return this.optional(element) || ( length == 11 && regPhone.test( value ) ); 
    });

	//注册验证
	$.fn.regForm=function(){
		//返回form()方法
		return $('.regist-info').validate({
			onfocusout : false,
			onkeyup:false,
			// onsubmit:false,
			rules:{
				reg_username:{
					required:true,
					isPositive:true,
				},
				reg_password:{
					required:true,	
				},
				reg_email:{
					required:true,
					email:true,
				},
				reg_validatenum:{
					required:true,
				}
			},
			messages:{
				reg_username:{
					required:'请输入正确手机账号',
				},
				reg_password:{
					required:'请输入密码',
				},
				reg_email:{
					required:'请输入邮箱',
					email:'请输入正确的邮箱格式',
				},
				reg_validatenum:{
					required:'请输入手机验证码',
				}
			},
			highlight: function(element, errorClass) {
				$(element).css('border', '1px solid #dc388f');
			},
			unhighlight:function(element, errorClass){
				$(element).css('border', 'none');
			},
			errorPlacement: function(error, element) { //错误信息位置设置方法
				console.log(error.text());
			}
		});
	};

	$.validator.addMethod("ZhongWen",function(value,element){
          
    	var regPhone = /^[\u4E00-\u9FA5]+$/;  
    	return this.optional(element) || (regPhone.test( value ) ); 
    });

    $.validator.addMethod("tellphone",function(value,element){
          
    	var regPhone = /^((0\d{2,3})-)(\d{7,8})?$/;  
    	return this.optional(element) || (regPhone.test( value ) ); 
    });

	//下一步验证
	$.fn.companyForm=function(){
		//返回form()方法
		return $('.company').validate({
			onfocusout : false,
			onkeyup:false,
			rules:{
				reg_company_name:{
					required:true,
				},
				reg_company_address:{
					required:true,	
				},
				reg_company_phone:{
					required:true,
					tellphone:true,
				},
				reg_company_cellphone:{
					required:true,
					isPositive:true,
				},
				reg_company_administrator_name:{
					required:true,
				},
				reg_company_administrator_phone:{
					required:true,
					isPositive:true,
				},
				reg_company_bank:{
					required:true,
				},
				reg_company_bankcard:{
					required:true,	
				},
				reg_company_bankcard_name:{
					required:true,
				},
				reg_company_alipay:{
					required:true,
				},
				reg_company_receive_message:{
					required:true,
					isPositive:true,
				},
			},
			messages:{
				reg_company_name:{
					required:'请输入企业账号',
				},
				reg_company_address:{
					required:'请输入详细地址',
				},
				reg_company_phone:{
					required:'请输入座机电话',
				},
				reg_company_cellphone:{
					required:'请输入手机号码',
				},
				reg_company_administrator_name:{
					required:'请输入管理员姓名',
				},
				reg_company_administrator_phone:{
					required:'请输入管理员手机号码',
				},
				reg_company_bank:{
					required:'请输入银行账户名称',
				},
				reg_company_bankcard:{
					required:'请输入银行卡号',
				},
				reg_company_bankcard_name:{
					required:'请输入开户行名称',
				},
				reg_company_alipay:{
					required:'请输入支付宝账号',
				},
				reg_company_receive_message:{
					required:'请输入接收短信手机号',
				},
			},
			highlight: function(element, errorClass) {
				$(element).css('border', '1px solid #dc388f');
			},
			unhighlight:function(element, errorClass){
				$(element).css('border', 'none');
			},
			errorPlacement: function(error, element) { //错误信息位置设置方法
				console.log(error.text());
			}
		});
	};


	//个人分销商、导游验证
	$.fn.perBussForm=function(){
		//返回form()方法
		return $('.distributor').validate({
			onfocusout : false,
			onkeyup:false,
			rules:{
				reg_distributor_bank:{
					required:true,	
				},
				reg_distributor_bankcard:{
					required:true,	
				},
				reg_distributor_bankcard_name:{
					required:true,
				},
				reg_distributor_alipay:{
					required:true,
				},
				reg_distributor_receive_message:{
					required:true,
					isPositive:true,
				},
				idcardselect:{
					required:true,	
				},
				pass_file_img:{
					required:true,	
				},
			},
			messages:{
				reg_distributor_bank:{
					required:'请输入银行账户名称',
				},
				reg_distributor_bankcard:{
					required:'请输入银行卡号',
				},
				reg_distributor_bankcard_name:{
					required:'请输入开户行名称',
				},
				reg_distributor_alipay:{
					required:'请输入支付宝账号',
				},
				reg_distributor_receive_message:{
					required:'请输入接收短信手机号',
				},
				idcardselect:{
					required:'请您选择身份',
				},
				pass_file_img:{
					required:'请上传照片',
				},
			},
			highlight: function(element, errorClass) {
				$(element).css('border', '1px solid #dc388f');
			},
			unhighlight:function(element, errorClass){
				$(element).css('border', 'none');
			},
			errorPlacement: function(error, element) { //错误信息位置设置方法
				console.log(error.text());
			}
		});
	};

	//身份选择验证
	$.identiySelect=function(){
		return $('.distributor').validate({
			onfocusout : false,
			onkeyup:false,
			rules:{
				idcardselect:{
					required:true,	
				},
				pass_file_img:{
					required:true,	
				},
			},
			// messages:{
			// 	idcardselect:{
					// required:'请您选择身份',
				// },
				// pass_file_img:{
					// required:'请上传照片',
				// },
			// },
			// errorPlacement: function(error, element) { //错误信息位置设置方法
			// 	alert(error.text());
			// }
		});
	}



});




