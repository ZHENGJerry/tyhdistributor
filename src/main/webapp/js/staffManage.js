//增加查看信息
function addBmInfo(num,name,email,phone,site){
	return '<ul class="staff-info">\
				<li>\
					<input type="checkbox" class="s-info-selt">\
					<span class="s-info-num">'+num+'</span>\
					<span class="s-info-name">'+name+'</span>\
					<span  class="s-info-email" style="text-align: center;">'+email+'</span>\
					<span class="s-info-tel">'+phone+'</span>\
					<span class="s-info-job">'+site+'</span>\
					<span class="s-info-btn">\
						<input type="button"  value="配置" disabled>\
					</span>\
				</li>\
			</ul>';
}

//删除员工
function deleteBmInfo(num,name,email,phone,site){
	return '<ul class="staff-info">\
				<li>\
					<input type="checkbox" class="s-info-selt">\
					<span class="s-info-num">'+num+'</span>\
					<span class="s-info-name">'+name+'</span>\
					<span  class="s-info-email" style="text-align: center;">'+email+'</span>\
					<span class="s-info-tel">'+phone+'</span>\
					<span class="s-info-job">'+site+'</span>\
					<span class="s-info-btn">\
						<input type="button" class="delete-Staff" value="删除" disabled>\
					</span>\
				</li>\
			</ul>';
}

//部门调动信息
function changeBmInfo(num,name,email,phone,site){

	return '<ul class="staff-info">\
				<li>\
					<input type="checkbox" class="s-info-selt">\
					<span class="s-info-num">'+num+'</span>\
					<span class="s-info-name">'+name+'</span>\
					<span  class="s-info-email" style="text-align: center;">'+email+'</span>\
					<span class="s-info-tel">'+phone+'</span>\
					<span class="s-info-job">'+site+'</span>\
					<span class="s-info-btn">\
						<div class="btn-group" role="group">\
					        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:120px;">\
					       		<span class="">部门调动</span><span class="caret"></span>\
						    </button>\
						    <ul class="dropdown-menu bn-xg">\
						        <li><a>部门调动</a></li>\
						    </ul>\
						</div>\
					</span>\
				</li>\
			</ul>';
}


$(function(){
	//当前登录账户
  	var nowUser=$(window.parent.document.body).find('.nav-right-name-ple').find('span').text();
  	var bmNumbering={};//保存部门编号
  	var employeeBH={};//保存员工编号

	//页面初始加载信息
	ajaxToCommen('supplierAccountManagerController/findAllSupplierDepartment.action','',funcSucc,'查看信息');//要数据
	function funcSucc(list,value){
		
		if(list.length){
			//插入员工
			$('.staff-total').text('');
			$('.staff-total').children().remove();
			if(list[0].supplierEmployees.length){
				for(var i=0;i<list[0].supplierEmployees.length;i++){
					employeeBH[list[0].supplierEmployees[i].employee_phone]=list[0].supplierEmployees[i].employee_number;
					var _html='';
					if(value=="查看信息"){
						_html=addBmInfo((i+1),list[0].supplierEmployees[i].employee_name,list[0].supplierEmployees[i].employee_phone,list[0].supplierEmployees[i].employee_email,list[0].supplierEmployees[i].employee_position);
					}else if(value=="删除员工"){
					 	_html=deleteBmInfo((i+1),list[0].supplierEmployees[i].employee_name,list[0].supplierEmployees[i].employee_phone,list[0].supplierEmployees[i].employee_email,list[0].supplierEmployees[i].employee_position);
					}else if(value=="部门调动"){
						_html=changeBmInfo((i+1),list[0].supplierEmployees[i].employee_name,list[0].supplierEmployees[i].employee_phone,list[0].supplierEmployees[i].employee_email,list[0].supplierEmployees[i].employee_position,list[i].department_name);
					}
					$('.staff-total').append(_html);
				}
			}else{
				$('.staff-total').text('此部门暂无员工');
			}

			//插入部门
			$('.bm-total').text('');
			$('.bm-total').children().remove();
			for(var i=0;i<list.length;i++){
				bmNumbering[list[i].department_name]=list[i].department_number;//保存部门编号

				var _html2=	'<div class="add-bm">\
								<p class="bm-detail">'+list[i].department_name+'</p>\
								<span class="add-bm-del" style="display: none;">×</span>\
							</div>';
				$('.bm-total').append(_html2);//插入部门
			}

			if(value=="部门调动"){
				$('.staff-total').find('.bn-xg').find('li').eq(0).siblings().remove();
				for(var i=0;i<list.length;i++){
					var _html3= '<li><a>'+list[i].department_name+'</a></li>';
					$('.staff-total').find('.bn-xg').append(_html3);
				}
			}
			$('.add-bm').eq(0).addClass('add-select');
		}else{
			$('.bm-total').text('暂无部门');
			$('.staff-total').text('暂无员工');
		}

	}
	
	//点击按钮切换class，显示指定的内容
	$(".main-menu li").on("click",function(){
		$(this).attr('class','select').siblings().attr('class','');
		$('.bm-total .add-bm-del').hide();
		$('.detail-right').find('.right-head').text($(this).text());	
	});

	//查看信息
	$('#select-info').click(function(){
		$('.staff-info-del').hide();
		$('.staff-total').show();
		ajaxToCommen('supplierAccountManagerController/findAllSupplierDepartment.action','',funcSucc,'查看信息');//要数据
	});

	//添加部门
	$('#add-bm').click(function(){
		$('.add-bm-name').find('.bmValidate').remove();//删除验证规则信息
		$('.add-bm').removeClass('add-select');

		$('.bm-total').find('.add-bm-del').show();
		$('.add-bm-info').val('');	//清空状态

		//隐藏员工信息
		$('.staff-info-del').show();
		$('.staff-total').hide();
	});

	//删除员工头部信息
	$('#del-staff').click(function(){
		$('.staff-info-del').hide();
		$('.staff-total').show();
		ajaxToCommen('supplierAccountManagerController/findAllSupplierDepartment.action','',funcSucc,'删除员工');//要数据
	});


	//部门调动头部信息
	$('#change-bm').click(function(){
		$('.staff-info-del').hide();
		$('.staff-total').show();
		ajaxToCommen('supplierAccountManagerController/findAllSupplierDepartment.action','',funcSucc,'部门调动');//要数据
	});

	//点击部门按钮切换class，显示指定的内容
	$('.bm-total').on('click', '.add-bm', function() {
		$(this).siblings().removeClass('add-select');
		$(this).addClass('add-select');

		var nowBm=$('.main-menu').find('.select').text();
		if(nowBm=="查看信息" || nowBm=="删除员工" || nowBm=="部门调动"){
			var bmBH=$(this).find('.bm-detail').text();
			ajaxToCommen('supplierAccountManagerController/findSupplierDepartmentAllEmployees.action',{employee_department_number:bmNumbering[bmBH]},updateStaff,nowBm);//要数据
			function updateStaff(list,value){
				if(list.length){
					//插入员工
					$('.staff-total').text('');
					$('.staff-total').children().remove();
					for(var i=0;i<list.length;i++){
						var _html='';
						if(value=="查看信息"){
							_html=addBmInfo((i+1),list[i].employee_name,list[i].employee_phone,list[i].employee_email,list[i].employee_position);
						}else if(value=="删除员工"){
						 	_html=deleteBmInfo((i+1),list[i].employee_name,list[i].employee_phone,list[i].employee_email,list[i].employee_position);
						}else if(value=="部门调动"){
							_html=changeBmInfo((i+1),list[i].employee_name,list[i].employee_phone,list[i].employee_email,list[i].employee_position,list[i].department_name);
						}
						$('.staff-total').append(_html);

						employeeBH[list[i].employee_phone]=list[i].employee_number;
					}

					if(value=="部门调动"){
						$('.staff-total').find('.bn-xg').find('li').eq(0).siblings().remove();
						var key=[];
						for(var i in bmNumbering){
							key.push(i);
						}
						for(var i=0;i<key.length;i++){
							var _html3= '<li><a>'+key[i]+'</a></li>';
							$('.staff-total').find('.bn-xg').append(_html3);
						}
					}
				}else{
					$('.staff-total').text('此部门暂无员工');
				}
			}
		}
	});
	

	//添加部门确认
	$('.add-bm-ok').click(function(){
		if($('.add-bm-info').val()){
			if(testName($('.add-bm-info').val())){ //验证规则
				$('.add-bm-name').find('.bmValidate').remove();//删除验证规则信息
				
				var _html='<div class="add-bm">\
							<p class="bm-detail">'+$('.add-bm-info').val()+'</p>\
							<span class="add-bm-del">×</span>\
						</div>';

				if($('.bm-total').text()=='暂无部门'){
					$('.bm-total').text('').append(_html);
				}else{
					$('.bm-total').append(_html);
				}
				
				var send_data='department_name='+$('.add-bm-info').val()+'&reg_username='+nowUser;
				ajaxToCommen('supplierAccountManagerController/addSupplierDepartment.action',send_data);

				$('.add-bm-info').val('');	//清空状态
			}else{
				var _html='<span  class="bmValidate"> * 部门名称仅是英文或中文</span>'
				$('.add-bm-name').append(_html);
			}
			
		}
	});

	//添加部门取消
	$('.add-bm-name .add-bm-del').click(function(){
		$('.add-bm-info').val('');	//清空状态
	});

	//添加员工
	$('#add-staff').click(function(){
		//员工隐藏
		$('.staff-info-del').hide();
		$('.staff-total').hide();

		var $parent=$(window.parent.document.body);
		var bmNum=$('.bm-total').find('.bm-detail');

		//判断是否有部门
		if(bmNum.length>0){
			modalFade('modal/modalAddStaff.html',fn);
			
			function fn(){
				//部门显示第一条信息
				$parent.find('.bm-fw').text($(bmNum[0]).text());
				for(var i=0;i<bmNum.length;i++){
					// console.log($(bmNum[i]).text());
					var _html='<li><a>'+$(bmNum[i]).text()+'</a></li>';
					$parent.find('.bmTotal').append(_html);
				}

				//部门选项
				//事件绑定
				$parent.find('#myModal').get(0).onclick = function(ev){
				    var ev = ev || window.event;
				    var target = ev.target || ev.srcElement;
				    console.log(target.innerHTML);
				    if(target.nodeName.toLowerCase() == 'a'){
				    	$parent.find('.bm-fw').text(target.innerHTML);
				    }
				}

				//密码显示与隐藏
				var count=0;
				$parent.find('.password-toggle').click(function(){
					if(count%2==0){
						$(this).prop('src','/tyhcontrol/img/pass_close.png');
						$(this).prev().prop('type','text');
					}else{
						$(this).prop('src','/tyhcontrol/img/pass_open.png');
						$(this).prev().prop('type','password');
					}
					count++;
				});

				// 向后台发送数据
				$parent.find('#myModal .customer-sure').click(function(){
					 var staffInfo={};
					 staffInfo.reg_username=$parent.find("#myModal .customer-danwei").val();//登录名
					 staffInfo.employee_name=$parent.find("#myModal .customer-username").val();	//员工姓名
					 staffInfo.reg_password=$parent.find("#myModal .customer-tellphone").val();	//登录密码
					 staffInfo.employee_phone=$parent.find("#myModal .customer-danwei").val();	//联系电话
					 staffInfo.employee_email=$parent.find("#myModal .customer-email").val();	//电子邮箱
					 staffInfo.employee_number=$parent.find("#myModal .customer-user-sort").val();	//工号

					 var F=$parent.find("#myModal .bm-fw").text();	//所属部门
					 staffInfo.employee_department_number=bmNumbering[F];
					 staffInfo.employee_position=$parent.find("#myModal .customer-career").val();	//职位名称

					for(var i in staffInfo){
						if(!staffInfo[i]){
							$parent.find('#myModal .staff-tip').show().text('* 信息未填完整');
							return;
						}
					}

					if(!testName(staffInfo['employee_name'])){
						$parent.find('#myModal .staff-tip').show().text('* 员工姓名仅为中文或英文');
						return;
					}
					if(!testPhone(staffInfo['employee_phone'])){
						$parent.find('#myModal .staff-tip').show().text('* 请输入正确联系电话');
						return;
					}
					if(!testEmail(staffInfo['employee_email'])){
						$parent.find('#myModal .staff-tip').show().text('* 请输入正确邮箱');
						return;
					}

					ajaxTo('supplierAccountManagerController/addSupplierEmployee.action',JSON.stringify(staffInfo),fn1);
					function fn1(){
						$parent.find('#myModal .staff-tip').hide();
						$parent.find('#myModal').modal('hide');
						$('#select-info').trigger('click');
					}
				});
			}
		}else{
			modalFade('modal/modalInfo.html',fn);
			function fn(){
				$parent.find('#myModal #modal-body').text("目前无部门,请先创建部门,正在跳转...");
				$parent.find('#myModal .modal-footer').hide();

				setTimeout(function(){
					$parent.find('#myModal').modal('hide');
					$('#add-bm').trigger('click');
				},2000);
			}
		}
	});

	//复选框选中状态
	$('.detail-right').on('click', '.s-info-selt', function() {

		if($(this).prop('checked')){
			$(this).parent().find('input').eq(1).prop('disabled',false);
		}else{
			$(this).parent().find('input').eq(1).prop('disabled',true);
		}
	});

	

	//删除员工
	$('.detail-right').on('click', '.delete-Staff', function() {
		var $this=$(this);
		var phone=$this.parent().prev().prev().prev().text();

		$.ajax({
			url:'supplierAccountManagerController/deleteSupplierEmployee.action',
			type:'post',
			data:{
				employee_number:employeeBH[phone]
			},
			success:function(list){
				if(list){
					$this.parent().parent().parent().remove();

					var checkboxNum = $('.detail-right').find('.s-info-num');
					if(!checkboxNum.length){
						$('.staff-total').text('此部门暂无员工');
					}else{
						for(var i=0;i<checkboxNum.length;i++){
							$('.detail-right-bottom').find('.s-info-num').eq(i).text((i+1));
						}
					}
				}
			}
		});
		
	});


	//删除部门--删除对应的员工
	$('#detail-wrap').on('click','.bm-total .add-bm-del',function(){

		var index=$('.add-bm-del').index(this);
		var $this=$(this);

		modalFade('modal/modalInfo.html',deleteStaff);
		function deleteStaff(){
			$(window.parent.document.body).find('#myModal #modal-body').text("删除部门会对应删除该组的所有员工信息，确定删除吗？");
			
			$(window.parent.document.body).find('#myModal .modal-footer .btn-ok').click(function(){
				var text=$this.prev().text();
				ajaxToCommen('supplierAccountManagerController/deleteDepartmentCatchDeleteEmployee.action',{department_number:bmNumbering[text]},deleteBM);
				function deleteBM(){
					$(window.parent.document.body).find('#myModal').modal('hide');
					$this.parent().remove();
					delete bmNumbering[text];

					if($('.bm-total').text()==''){
						$('.bm-total').text('暂无部门');
					}
				}
			});
		}
	});


	//部门调动
	$('.detail-right-bottom').on('click', '.bn-xg li a', function() {
		var bname=$(this).text();

		if(bname!=$('.add-select').find('.bm-detail').text() && bname!=="部门调动"){
			var $this=$(this);
			var text=$(this).parent().parent().parent().parent().parent().find('.s-info-email').text();

			$.ajax({
				url:'supplierAccountManagerController/updateSupplierEmployee.action',
				type:'post',
				data:{
					employee_number:employeeBH[text],
					employee_department_number:bmNumbering[bname]
				},
				success:function(list){
					if(list){
						$this.parent().parent().parent().parent().parent().parent().remove();

						var checkboxNum = $('.detail-right').find('.s-info-num');
						if(!checkboxNum.length){
							$('.staff-total').text('此部门暂无员工');
						}else{
							for(var i=0;i<checkboxNum.length;i++){
								$('.detail-right-bottom').find('.s-info-num').eq(i).text((i+1));
							}
						}
					}
				}
			});
		}
	});


});