$(function(){

	//"正常"事件处理
	$('.routeproduct-normal').click(function(){
		$('#routeproduct .page1').show();
		$('#routeproduct .page2').hide();
	});

	//"仓库中"事件处理
	$('.routeproduct-warehouse').click(function(){
		$('#routeproduct .page1').hide();
		$('#routeproduct .page2').show();
	});


	//查询订单界面
	//点击'搜索'
	$('.routeproduct-audit').click(function(){
		$(this).next().show();
	});

	//订单状态
	$('.audit-state').find('li').click(function(){
		$('.routeproduct-audit').text($(this).text());
		$(this).parent().hide();
	});

	//下单时间
	$('.form-control-from-time').datepicker();
	$('.form-control-to-time').datepicker();
	
	//搜索
	// $('.btn-info-search').click(function(){
	// 	var obj={};
	// 	obj.product_num=$('.product-num').val();
	// 	$.ajax({
	// 		url:'',
	// 		type:'post',
	// 		data:,
	// 		success:sucFunction,
	// 	});
	// });


});