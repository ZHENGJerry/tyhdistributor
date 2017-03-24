$(function(){

	//产品状态
	clickReplace($('.product-statue'),'.product-statue-click');

	//表格中的"操作"栏
	clickDynamicReplace($('#table'),'.finace-income-state li a','.finace-income-state-click');

	//查询点击事件
	// $('.finace-search').click(function(){

	// });

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