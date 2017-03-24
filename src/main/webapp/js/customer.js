$(function(){

	//客户群组
	clickDynamicReplace($('.routeproduct-top'),'.customer-income-state li a','.customer-sort');

	//表格中的"操作"栏
	clickDynamicReplace($('#table'),'.customer-order-state li a','.customer-order-state-click');

	var customerId={};
	//页面初始化
	ajaxToCommen('selectAllSupplierCustomerGroup','',customerShow);
	function customerShow(list){
		if(list){
			$('.customer-income-state').find('li').eq(0).siblings().remove();
			for(var i=0;i<list.length;i++){
				customerId[list[i].group_name]=list[i].group_number;
				var _html='<li><a>'+list[i].group_name+'</a></li>';
				$('.customer-income-state').append(_html);
			}
		}
	}

	//页面初始化2
	ajaxToCommen('selectSupplierCustomer','',customerInfoShow);
	function customerInfoShow(list){
		if(list.length){
			$('#table').find('tbody').children().remove();
			for(var i=0;i<list.length;i++){
				var _html='<tr>\
				          	<td class="finace-serial arial-sans"><label class="finace-xuhao"><input type="checkbox" class="finace-xh-select">&nbsp;'+(i+1)+'</label></td>\
				         	<td class="finace-num arial-sans">'+list[i].customer_id+'</td>\
				         	<td class="finace-username">'+list[i].customer_name+'</td>\
				          	<td class="finace-tellphone arial-sans">'+list[i].customer_phone+'</td>\
				          	<td class="finace-fenzu">'+list[i].group_number+'</td>\
				          	<td class="finace-account">10</td>\
				          	<td class="finace-money">12345元</td>\
				          	<td class="finace-order-total"><button type="button" class="btn btn-primary">查看</button></td>\
				          	<td class="finace-out-detail">\
				          		<div class="btn-group" role="group">\
							        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:100px;">\
							       		<span class="customer-order-state-click">操作</span><span class="caret"></span>\
								    </button>\
								    <ul class="dropdown-menu customer-order-state" style="min-width:80px;">\
								        <li><a>操作</a></li>\
								        <li><a>客户分组</a></li>\
								        <li><a>移动分组</a></li>\
								        <li><a>删除客户</a></li>\
								    </ul>\
								</div>\
				          	</td>\
				        </tr>';

				        $('#table').find('tbody').append(_html);
			}
		}else{
			$('#table').find('tbody').children().remove();
			var _html='<tr><td style="width:940px;text-align: center;display: inline-block;line-height: 30px;">暂无结果</td></tr>';
			$('#table').find('tbody').append(_html);
		}
	}


	//新建分组
	$('.customer-group').click(function(){
		modalFade('modal/modalAddCustomer.html',function(){
			$parent=$(window.parent.document.body);
			$parent.find('#myModal').find('.customer-sure').click(function(){
				var fzName=$parent.find('#myModal').find('.add-group').val();
				if(fzName){
					ajaxToCommen('insertSupplierCustomerGroup',{suppCustomer_group_name:fzName},funSuc);
					function funSuc(list){
						$('.customer-income-state').find('li').eq(0).siblings().remove();
						for(var i=0;i<list.length;i++){
							customerId[list[i].group_name]=list[i].group_number;
							var _html='<li><a>'+list[i].group_name+'</a></li>';
							$('.customer-income-state').append(_html);
						}
						$parent.find('#myModal').modal('hide');
					}
				}
			});
		});
	});

	//添加用户
	$('.customer-adduser').click(function(){

		modalFade('modal/modalCustomer.html',function(){
			$parent=$(window.parent.document.body);

			//获取分组
			ajaxToCommen('selectAllSupplierCustomerGroup','',funSuc);
			function funSuc(list){
				//如果有数据
				if(list){
					$parent.find('.bm-fw').text(list[0].group_name);
					for(var i=0;i<list.length;i++){
						customerId[list[i].group_name]=list[i].group_number;
						var _html='<li><a>'+list[i].group_name+'</a></li>';
						$parent.find('.bmTotal').append(_html);
					}

					$parent.find('.customer-sure').click(function(){
						var send_data={};
						send_data.customer_name=$parent.find('#myModal .customer-username').val();//客户姓名
						send_data.customer_phone=$parent.find('#myModal .customer-tellphone').val();//联系电话
						send_data.customer_company=$parent.find('#myModal .customer-danwei').val();//所属单位
						send_data.customer_email=$parent.find('#myModal .customer-email').val();//电子邮箱
						send_data.group_number=customerId[$parent.find('#myModal .bm-fw').text()];//客户分组
						send_data.company_position=$parent.find('#myModal .customer-career').val();//职位名称

						for(var i in send_data){
							if(!send_data[i]){
								$parent.find('#myModal .customer-info').show().text('* 信息未填完整');
								return;
							}
						}
						//检验客户姓名是否正确
						if(!testName(send_data['customer_name'])){
							$parent.find('#myModal .customer-info').show().text('* 姓名仅为中文或英文');
							return;
						}
						// 联系电话验证
						if(!testPhone(send_data['customer_phone'])){
							$parent.find('#myModal .customer-info').show().text('* 请输入正确的电话号码');
							return;
						}
						// 电子邮箱验证
						if(!testEmail(send_data['customer_email'])){
							$parent.find('#myModal .customer-info').show().text('* 请输入正确的邮箱');
							return;
						}

						console.log(send_data);
						ajaxTo('addSupplierCustomer',JSON.stringify(send_data),fn1);
						function fn1(){
							$parent.find('#myModal').modal('hide');
						}
					});
				}else{
					//没有分组
				}
			}

			//事件绑定
			$parent.get(0).onclick = function(ev){
			    var ev = ev || window.event;
			    var target = ev.target || ev.srcElement;
			    
			    if(target.nodeName.toLowerCase() == 'a'){
			    	$parent.find('.bm-fw').text(target.innerHTML);
			    }
			}
		});
	});


	//"查询"事件
	$('.finace-search').click(function(){
		var send_data={};
		var group=$('.customer-sort').text();
		if(group=='全部'){
			send_data.group_number=-1;//客户群组
		}else{
			send_data.group_number=customerId[group];//客户群组
		}
		send_data.customer_id=$('.customer-id').val();//客户ID
		send_data.customer_phone=$('.customer-phone').val();//手机号码

		ajaxTo('selectSupplierCustomerByConditions',JSON.stringify(send_data),customerInfoShow);
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