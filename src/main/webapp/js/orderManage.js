
$(function(){
	//选择团期、下单时间日历
	$('.order-manage-tuanqi,.form-control-from-time,.form-control-to-time').datepicker({
		 minDate:-9999,
	});

	//选择产品
	clickDynamicReplace($('.routeproduct-top'),'.order-income-state li a','.order-income-state-click');

	//订单状态
	clickReplace($('.order-manage'),'.order-manage-click');

	//操作员工号	
	clickDynamicReplace($('.routeproduct-top'),'.order-manage-employee li a','.order-manage-employee-click');

	//证件号码
	clickReplace($('.order-type'),'.order-type-click');

	//点击全部分销商
	var distributor_info=[];
	$('.routeproduct-top').on('click','.order-manage-id li a',function(){
		var fxId='';
		for(var i=0;i<distributor_info.length;i++){
			if($(this).text()==distributor_info[i].indent_user){
				fxId=distributor_info[i].id;
				break;
			}
		}

		$('.order-fen-id').val(fxId);		//分销商ID
		$('.order-manage-id-click').text($(this).text());	//分销商名称
	});

	//表格中的操作
	clickDynamicReplace($('#table'),'.order-manage-operation li a','.order-manage-operation-click');

	//页面加载数据
	//"选择产品"展示界面
	ajaxTo('selectProductName','',autoList);
	function autoList(list){
		var data=list;
		if(data){
			for(var i=0;i<data.length;i++){
				if(data[i]){
					var _html='<li><a>'+data[i].path_product_name+'</a></li>';
					$('.order-income-state').append(_html);
				}
			}
		}
	}

	var userName=$('.nav-right-name-ple span',window.parent.document).text();	//当前用户登录
	ajaxTo('selectOrderSupplier',JSON.stringify({username:userName}),sucFuc);
	function sucFuc(data){
		var data=data;
		if(data){
			for(var i=0;i<data.length;i++){
				// var account=parseInt(data[i].indent_count_adult)+parseInt(data[i].indent_count_child);
				var account='';
				var indent_pay_state='已付款';
				
				if(!data[i].indent_pay_state){
					indent_pay_state="未付款";
				}

				var _html=	'<tr>'
				        +' 	<td class="order-serial arial-sans"><label class="finace-xuhao"><input type="checkbox" class="finace-xh-select">&nbsp;'+(i+1)+'</label></td>'
				        +' 	<td class="order-num arial-sans">'+data[i].indent_number+'</td>'
				        +' 	<td class="order-product">'+data[i].path_product_name+'</td>'
				        +'  <td class="order-username arial-sans">'+data[i].indent_linkman_name+'</td>'
				        +'  <td class="order-tellphone">'+data[i].indent_linkman_phone+'</td>'
				        +'  <td class="order-account">'+account+'</td>'
				        +'  <td class="order-money">'+data[i].indent_allprice+'</td>'
				        +'  <td class="order-income-detail">'+indent_pay_state+'</td>'
				        +'  <td class="order-out-detail"><button type="button" class="btn btn-primary">详情</button></td>'
				        +'  <td class="order-detail">'
				        +'  	<div class="btn-group" role="group">'
						+'	       <button type="button" style="width:60px;" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
						+'	       		<span class="order-manage-operation-click">操作</span><span class="caret"></span>'
						+'		   </button>'
						+'		    <ul class="dropdown-menu order-manage-operation">'
						+'		        <li><a>操作</a></li>'
						+'		        <li><a>审核</a></li>'
						+'		        <li><a>取消</a></li>'
						+'		        <li><a>退款</a></li>'
						+'		        <li><a>删除</a></li>'
						+'		    </ul>'
						+'		</div>'
				        +'	</td>'
				        +'</tr>';

				$('#table').find('tbody').append(_html);
			}
		}
	}

	//点击"分销商"获取分销商列表
	var flagId=true;
	$('.order-manage-id-select').click(function(){
		// var send_data='username=18322695263';

		if(flagId){
			// ajaxTo('selectAllDistributorId','',fenFuc);
			ajaxTo('test.json','',fenFuc);
			flagId=false;
		}
		
		function fenFuc(list){
			distributor_info=list;

			for(var i=0;i<list.length;i++){
				var _html1='<li><a>'+list[i].indent_user+'</a></li>';
				$('.order-manage-id').append(_html1);
			}
		}
	});

	//填分销商ID回显对应信息
	$('.order-fen-id').keyup(function(){
		var $this=$(this);
		if($this.val().length==12){
			ajaxTo('test.json','',fenFuc);
		}else{
			$('.order-manage-id-click').text('全部分销商');
		}

		function fenFuc(list){
			for(var i=0;i<list.length;i++){

				if($this.val()==list[i].id){
					$('.order-manage-id-click').text(list[i].indent_user);
					break;
				}
			}
		}
	});



	//查询事件
	$('.finace-search').click(function(){
		var send_data={};
		send_data.username=userName;
		send_data.productName=$('.order-income-state-click').text();	//选择产品
		send_data.date=$('.order-manage-tuanqi').val();	//选择团期
		send_data.orderState=$('.order-manage-click').text();	//订单状态
		send_data.orderTimeBegin=$('.form-control-from-time').val();//开始时间
		send_data.orderTimeEnd=$('.form-control-to-time').val();	//停止时间
		send_data.orderNumber=$('.order-num-order').text();	//订单号
		// send_data.G=$('.order-manage-employee-click').text();	//操作员工号
		// send_data.H=$('.order-type-click').text();	//证件号码类型
		send_data.numberId=$('.order-indentify').val();	//证件号码
		// send_data.J=$('.order-phone').val();	//出行人电话
		send_data.people2Phone=$('.ordre-accision-phone').val();	//联系人电话
		// send_data.L=$('.order-fen-id').val();	//分销商ID
		// send_data.M=$('.order-manage-id-click').text();	//分销商商家

		//循环遍历判断是否有空值
		for(i in send_data){
			if(!send_data[i]){
				delete send_data[i];
			}
		}

		console.log(send_data);
		ajaxTo('selectOrderSupplier',JSON.stringify(send_data),sucFuc);

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
	$('#table').on('click','.finace-xh-select',function(){
		if(!$(this).prop('checked')){
			$('.finace-order-select').prop('checked',false);
		}
	});


	//添加订单
	$('.order-add').click(function(){
		var product=$('.order-income-state-click').text();
		var time=$('.order-manage-tuanqi').val();
		
		if(product=='全部产品'){
			modalFade('modal/modalOrderAdd.html');
			return false;
		}

		if(!time){
			modalFade('modal/modalOrderAdd.html');
			return false;
		}
		window.location.href='orderAdd.html?product=120120120&time=2017-02-16';
	});

	//付款
	$('.order-pay').click(function(){
		var count=0;
		var checkbox=$('#table').find('tbody').find('.finace-xh-select');
		for(var i=0;i<checkbox.length;i++){
			if($(checkbox[i]).prop('checked')){
				count++;
			}
		}
		if(count==1){
			// window.location.href="aa.html?订单号=";
			alert('a');
		}
		
		
	});



});