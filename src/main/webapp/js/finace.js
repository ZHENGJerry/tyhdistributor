
$(function(){
	//选择时间的日历
	$('.form-control-from-time,.form-control-to-time').datepicker({
		minDate:-9999
	});

	//收支状态
	clickReplace($('.finace-income-state'),'.income-outcome');

	//订单类型
	clickReplace($('.finace-type-state'),'.finace-type-state-replace');

	//全部分销商
	clickReplace($('.finace-distribution-state'),'.form-fenxiaoshang');

	//结款状态
	clickReplace($('.finace-settlment-state'),'.finace-settlment-state-click');

	//公司员工
	clickReplace($('.finace-employee-state'),'.finace-employee-state-click');


	//"查询"事件
	$('.finace-search').click(function(){
		var send_data={};
		send_data.income=$('.income-outcome').text();//收支状态
		send_data.order_type=$('.finace-type-state-replace').text();//订单类型
		send_data.B=$('.form-control-from-time').val();//开始时间
		send_data.C=$('.form-control-to-time').val();//停止时间
		send_data.D=$('.form-phone').val();//分销商电话
		send_data.E=$('.form-userid').val();//分销商ID
		send_data.F=$('.form-fenxiaoshang').text();//"全部分销商"取值
		send_data.G=$('.finace-settlment-state-click').text();//借款状态
		send_data.H=$('.finace-employee-state-click').text();//公司员工单号
		send_data.I=$('.employee-name').val();//公司员工姓名


		console.log(send_data);

		// ajaxTo(url,JSON.stringify(send_data),fn);
	});


	//"选择全部"点击事件
	$('.finace-order-select').click(function(){
		
		if($(this).prop('checked')){
			$('#table').find('tbody').find('.finace-xh-select').prop('checked',true);
		}else{
			$('#table').find('tbody').find('.finace-xh-select').prop('checked',false);
		}

	});

	//序号里边选中状态
	$('#table').find('tbody').find('.finace-xh-select').click(function(){
		if($('.finace-order-select').prop('checked')){
			$('.finace-order-select').prop('checked',false);
		}
	});

});