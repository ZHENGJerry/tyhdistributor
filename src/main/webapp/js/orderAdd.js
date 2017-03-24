
//验证出行人数量和信息是否相匹配
function validateUserInfo(){
	var num=$('.add-per-info').length;
	var adult=parseInt($('.audlt-num').text());	//成人数量
	var child=parseInt($('.child-num').text());	//儿童数量

	if(num<(adult+child)){
		alert('出行人信息未添加全！');
		return false;
	}
	return true;
}

$(function(){

	//全部分销商
	clickReplace($('.finace-settlment-state'),'.finace-settlment-state-click');

	//成人数量
	clickReplace($('.audlt-num-ge'),'.audlt-num');

	//儿童数量
	clickReplace($('.child-num-ge'),'.child-num');

	//证件号码
	clickDynamicReplace($('#table'),'.customer-indentify li a','.customer-indentify-click');

	//集合地点
	clickDynamicReplace($('#table'),'.customer-jihe li a','.customer-jihe-click');

	//操作
	clickDynamicReplace($('#table'),'.customer-uppdate li a','.customer-uppdate-click');

	//操作员工号
	clickReplace($('.customer-employee'),'.customer-employee-click');

	//页面初始加载
	var urlParam=getUrlValue();
	var send_data1='product='+urlParam[0]+'&time='+urlParam[1];

	ajaxTo('aa.html',send_data1,sucFuc);

	function sucFuc(data){
		var data=data;
		$('.order-product').val();	//产品名称
		$('.order-product-num').val();	//产品编号
		$('.order-product-date').val(urlParam[1]);	//日期
		$('.order-product-adult').val();	//成人价格
		$('.order-product-child').val();	//儿童价格
	}


	//添加出行人信息
	$('.add-travel').click(function(){
		var _html='<tr class="add-per-info">'
		        	+'<td>'
		        	+'	<div class="add-info" style="height:80px;">'
			        +'		<div class="order-td-left">删除</div>'
			        +'		<div id="add-travel-info">'
				    +'    		<div class="form-group" style="margin-left: 5px;display: inline-block" >'
					+'			    <div class="input-group routeproduct-time">'
					+'			      	<div class="input-group-addon">出行人姓名</div>'
					+'			        <input class="form-control form-width customer-add-name"  type="text" style="width:120px;">'
					+'			    </div>'
					+'			</div>'
					+'			<div class="form-group" style="margin-left: 5px;display: inline-block">'
					+'			    <div class="input-group routeproduct-time">'
					+'			      	<div class="input-group-addon">联系电话</div>'
					+'			        <input class="form-control form-width customer-add-tellphone"  type="text" style="width:120px;">'
					+'			    </div>'
					+'			</div>'
					+'			<div class="btn-group indentify" role="group">'
					+'			    <button type="button" class="btn btn-default first-btn">证件号码</button>'
					+'			    <div class="btn-group" role="group">'
					+'			        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:100px;margin-right: 10px;">'
					+'			       		<span class="customer-indentify-click">身份证</span><span class="caret"></span>'
					+'				    </button>'
					+'				    <ul class="dropdown-menu customer-indentify">'
					+'				        <li><a>身份证</a></li>'
					+'				        <li><a>护照</a></li>'
					+'				        <li><a>军官证</a></li>'
					+'				    </ul>'
					+'				    <input class="form-control form-width customer-add-identify"  type="text" style="width:180px;">'
					+'				</div>'
					+'			</div>'
					+'			<div class="btn-group gather-order" role="group">'
					+'			    <button type="button" class="btn btn-default first-btn" style="height:34px;">集合地点</button>'
					+'			    <div class="btn-group" role="group">'
					+'			        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:325px;">'
					+'			       		<span class="customer-jihe-click">全部</span><span class="caret" style="margin-top: 15px;"></span>'
					+'				    </button>'
					+'				    <ul class="dropdown-menu customer-jihe">'
					+'				        <li><a>全部</a></li>'
					+'				        <li><a>06：00 滨海国际机场T2航站楼总服务台</a></li>'
					+'				        <li><a>06：00 滨海国际机场T2航站楼总服务台</a></li>'
					+'				    </ul>'
					+'				</div>'
					+'			</div>'
					+'		</div>'
					+'		<div class="order-td-right">'
					+'			<div class="accout" role="group">'
					+'			    <div class="btn-group" role="group" >'
					+'			        <button type="button" class="btn btn-default dropdown-toggle order-operation" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
					+'			       		&nbsp;&nbsp;<span class="customer-uppdate-click">操作</span><span class="caret" style="margin-left: 10px;margin-top:15px!important;"></span>'
					+'				    </button>'
					+'				    <ul class="dropdown-menu customer-uppdate" style="min-width: 70px;">'
					+'				        <li><a>操作</a></li>'
					+'				        <li><a>修改</a></li>'
					+'				        <li><a>取消</a></li>'
					+'				        <li><a>确定</a></li>'
					+'				    </ul>'
					+'				</div>'
					+'			</div>'
					+'		</div>'
					+'	</div>'
		        	+'</td>'
		        +'</tr> ';

		        if(!$('#table').find('tbody').find('tr').eq(1).hasClass('add-per-info')){
		        	$('#table').find('tbody').find('tr').eq(0).after(_html);
		        }else{
		        	$('#table').find('tbody').find('.add-per-info').last().after(_html);
		        }
		       
	});

	//改变自定义价格
	$('#table').on('click', '.change-money', function() {
		$(this).parent().prev().attr('readonly',false);
	});



	//删除添加人信息
	$('#table').on('click','.order-td-left',function(){
		$(this).parent().parent().parent().remove();
	});
	
	//提交审核
	$('.orderAdd-submit').click(function(){

		if(!validateUserInfo()){
			return;
		}

		var send_data={};

		send_data.A=$('.order-product').val();	//产品名称
		send_data.B=$('.order-product-num').val();	//产品编号
		send_data.C=$('.order-product-date').val();	//日期
		send_data.D=$('.order-product-adult').val();	//成人价格
		send_data.E=$('.order-product-child').val();	//儿童价格
		send_data.F=$('.order-product-id').val();	//分销商Id
		send_data.H=$('.finace-settlment-state-click').text();	//全部分销商

		send_data.I=$('.order-product-username').val();	//联系人姓名
		send_data.J=$('.order-product-phone').val();	//联系人电话
		send_data.K=$('.audlt-num').text();	//成人数量
		send_data.L=$('.child-num').text();	//儿童数量


		send_data.R=$('.order-nums').val();	//订单号
		send_data.S=$('.customer-employee-click').text();	//员工号
		send_data.T=$('.order-customer-employee').val();	//员工名字
		send_data.U=$('.customer-add-money').val();	//结算金额

		//出行人信息
		var arr=[];
		var add_per_info=$('.add-per-info');
		for(var i=0;i<add_per_info.length;i++){
			var temp={};
			temp.a=add_per_info.eq(i).find('.customer-add-name').val();	//出行人姓名
			temp.b=add_per_info.eq(i).find('.customer-add-tellphone').val();	//联系电话
			temp.c=add_per_info.eq(i).find('.customer-indentify-click').text();	//证件号码类型
			temp.d=add_per_info.eq(i).find('.customer-add-identify').val();	//证件号码
			temp.e=add_per_info.eq(i).find('.customer-jihe-click').text();	//集合地点
			arr.push(temp);
		}
		send_data.chuxing=arr;

		console.log(send_data);

		//验证联系人姓名是否正确
		if(!testName($('.order-product-username').val())){
			$('.validate-info').show().text('* 联系人姓名只能是英文或中文');
			return;
		}

		//验证联系人电话是否正确
		if(!testName($('.order-product-phone').val())){
			$('.validate-info').show().text('* 联系人电话错误');
			return;
		}

		// ajaxTo('bb',JSON.stringify(send_data),fn);

	});

	//输入分销商ID显示对应的分销商名称
	$('.order-product-id').keyup(function(){
		if($(this).val().length==12){
			var send_data='fenxiaoshangid='+$(this).val();
			ajaxTo('cc',send_data,function(){
				$('.finace-settlment-state-click').val(list);
			});
		}
	});

	//点击全部"分销商"获取全部分销商名字
	$('.finace-settlment-state-click').click(function(){
		var send_data='product=产品编号';
		ajaxTo('cc',send_data,sucFuc);
		
		function sucFuc(list){
			$('.finace-settlment-state').remove();

			for(var i=0;i<list.length;i++){
				var _html='<li><a>全部分销商</a></li>';
			}

		}
	});

});