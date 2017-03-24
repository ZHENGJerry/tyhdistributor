$(function(){

	$.ajax({
		url:'/tyhcontrol/selectAllCompanyByState',
		type:'post',
		success:sucFunction,
	});

	$('.info-intro').find('tbody').find('tr').remove();
	function sucFunction(data){
		var arr=data;

		for(var i=0;i<arr.length;i++){
			var obj=arr[i];
			// console.log(obj);
			var _html='<tr class="info-color">'+
					'<td rowspan="6" class="info-middle">'+(i+1)+'</td>'+
					'<td>手机号</td>'+
					'<td class="info-cellphone">'+obj.reg_username+'</td>'+
					'<td>邮箱</td>'+
					'<td>'+obj.reg_email+'</td>'+
					'<td rowspan="6" class="info-middle">'+
						'<select class="support-sort" name="support-sort">'+
							'<option value="路线供应商">路线供应商</option>'+
							'<option value="酒店供应商">酒店供应商</option>'+
							'<option value="景区门票供应商">景区门票供应商</option>'+
							'<option value="车辆供应商">车辆供应商</option>'+
							'<option value="保险供应商">保险供应商</option>'+
							'<option value="机票火车票供应商">机票火车票供应商</option>'+
							'<option value="签证供应商">签证供应商</option>'+
						'</select>'+
					'</td>'+
					'<td rowspan="6" class="info-middle">'+
						'<button class="btn btn-primary btn-pass">审核通过</button>'+
						'<br>'+
						'<button class="btn btn-primary btn-not-pass">不审核通过</button>'+
					'</td>'+
		        '</tr>'+
		        '<tr>'+
					'<td>注册地点</td>'+
					'<td>'+obj.company_address_nationwide+','+obj.company_address_county+'</td>'+
					'<td>详细地址</td>'+
					'<td>'+obj.reg_company_address+'</td>'+
		        '</tr>'+
		        '<tr>'+
					'<td>座机电话</td>'+
					'<td>'+obj.reg_company_phone+'</td>'+
					'<td>业务人手机号码</td>'+
					'<td>'+obj.reg_company_cellphone+'</td>'+
		        '</tr>'+
		        '<tr>'+
					'<td>管理员姓名</td>'+
					'<td>'+obj.reg_company_administrator_name+'</td>'+
					'<td>管理员手机号码</td>'+
					'<td>'+obj.reg_company_administrator_phone+'</td>'+
		        '</tr>'+
		        '<tr>'+
					'<td>银行账户名称</td>'+
					'<td>'+obj.reg_company_bank+'</td>'+
					'<td>银行卡号</td>'+
					'<td>'+obj.reg_company_bankcard+'</td>'+
		        '</tr>'+
		        '<tr>'+
					'<td>开户行名称</td>'+
					'<td>'+obj.reg_company_bankcard_name+'</td>'+
					'<td>支付宝信息</td>'+
					'<td>'+obj.reg_company_alipay+'</td>'+
		        '</tr>';
		    
		    $('.info-intro').find('tbody').append(_html);


			$('.btn-pass').eq(i).click(function(){
			    	var data1=$(this).parent().prev().find('.support-sort option:selected').val();
			    	var cellphone=$(this).parent().parent().find('.info-cellphone').text();
			    	var send_data='role3='+data1+'&username='+cellphone;
			    	$.ajax({
			    		url:'/tyhcontrol/updateRole3',
			    		type:'post',
			    		data:send_data,
			    	});
			    	alert('正在审核，请等待...');

			    	setTimeout(function(){
			    		window.location.href='/tyhcontrol/collect-info.html';
			    	},2000);
			}); 

			$('.btn-not-pass').eq(i).click(function(){

			    	alert('您的审核未通过');

			    	setTimeout(function(){
			    		window.location.href='/tyhcontrol/collect-info.html';
			    	},1000);
			}); 


		}
		
	}


});