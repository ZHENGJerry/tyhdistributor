 $(function(){

	//产品审核详情页
	$.ajax({
		url:'/tyhcontrol/selectPathProductByNumAndType',
		type:'post',
		data:GetRequest(),
		success:SuccFunction,
	});

	function SuccFunction(data){

		 var data=data;
//		var data=JSON.parse(data);
		// console.log(data);

		$('.input_type').val(data.path_product_type);		//产品分类
		$('.input_name').val(data.path_product_name);		//产品名称
		$('.input_id').val(data.path_product_num);		//产品编号
		$('.input_briefIntro').val(data.path_product_intro);	//产品简介
		$('.input_terminal').val(data.path_product_destination);	//目的地
		$('.input_tag').val(data.path_product_label);		//标签
		$('.input_residual').val(data.path_product_residue);	//余位设定
		$('.ssi-upload-look').attr('src',data.path_product_advertisingpicture+'?imageslim');	//上传宣传图

		//上传产品图
		var arr1=new Array();
		var str=data.path_product_productpicture;
		arr1=str.split(',');

		$('#imgUpload_container').find('.imgimg').remove();
		$.each(arr1,function(index,element){
			var _html='<div class="imgUpload_container" id="imgUpload_container">'+
		    	'<div class="imgimg">'+
		    		'<div class="imgimg-top" >'+
		    			'<img class="imgi img+"'+index+' src="'+arr1[index]+'?imageslim" alt="">'+
		    		'</div>'+
		    	'</div>'+
		    '</div>';

		    $('#imgUpload_container').append(_html);
		});

		//发团时间--日历时间
		if(data.path_product_starttype==0){
			var arr2=data.calendarList;
			$('.comple_fatuan').find('.fatuan_tr').remove();
			for(var i=0;i<arr2.length;i++){
				var obj=arr2[i];
				console.log(obj);
				var _html='<tr class="fatuan_tr">'+
					'<td class="timeType_select" rowspan="100">'+
						'<span class="times tag_select">日历时间</span>'+
					'</td>'+
					'<td class="tuanqi_times  show_times" nowrap>'+
						'<input type="text" class="times_start form-control" readonly name="cyclic_begintime" style="width: 95px;" value="'+obj.calendar_begintime+'">'+
						'-'+
						'<input type="text" class="times_end form-control" readonly name="cyclic_endtime" style="width: 95px;" value="'+obj.calendar_endtime+'">'+
					'</td>'+
					'<td class="">'+
						'<input type="text" class="start_city form-control" readonly name="cyclic_city" style="width: 90px;" value="'+obj.calendar_city+'">'+
					'</td>'+
					'<td class="marketPrice">'+
					        '<span>成人</span>'+
						    '<input type="text" class="marketPrice_ad form-control" readonly name="cyclic_price_market_man" style="width: 80px;" value="'+obj.calendar_price_market_man+'"><br>'+
					        '<span>儿童</span>'+
						    '<input type="text" class="marketPrice_ch form-control" readonly name="cyclic_price_market_child" style="width: 80px;" value="'+obj.calendar_price_market_child+'">'+			
					'</td>'+
					'<td class="waimaiPrice">'+
						'<span>成人</span>'+
						'<input type="text" class="waimaiPrice_ad form-control" readonly name="cyclic_price_takeout_man" style="width: 80px;" value="'+obj.calendar_price_takeout_man+'"><br>'+
						'<span>儿童</span>'+
						'<input type="text" class="waimaiPrice_ch form-control" readonly name="cyclic_price_takeout_child" style="width: 80px;" value="'+obj.calendar_price_takeout_child+'">'+
					'</td>'+
					'<td class="fenxiaoPrice">'+
						'<span>成人</span>'+
						'<input type="text" class="fenxiaoPrice_ad form-control" readonly name="cyclic_price_distrinutiom_man" style="width: 80px;" value="'+obj.calendar_price_distribution_man+'"><br>'+
						'<span>儿童</span>'+
						'<input type="text" class="fenxiaoPrice_ch form-control" readonly name="cyclic_price_distribution_child" style="width: 80px;" value="'+obj.calendar_price_distribution_child+'">'+
					'</td>'+
				    '<td class="handle">'+
				    	'<span>预览</span>'+
				    '</td>'+
				'</tr>';

				$('.comple_fatuan').append(_html);
				$('.comple_fatuan').find('.fatuan_tr').nextAll().find('.timeType_select').remove();
			}
		}
		else{
			//发团时间--循环时间
			var arr2=data.cyclicList;
			$('.comple_fatuan').find('.fatuan_tr').remove();
			for(var i=0;i<arr2.length;i++){
				var obj=arr2[i];
				// console.log(obj);
				var _html='<tr class="fatuan_tr">'+
					'<td class="timeType_select" rowspan="100">'+
						'<span class="days tag_select">每周循环</span>'+
					'</td>'+
					'<td class="tuanqi_days  show_days">'+
						'<input type="text" class="youxiao_begin form-control" readonly name="calendar_begintime" style="width: 95px;margin-top:5px;margin-left:3px;" value="'+obj.cyclic_begintime+'">'+
	                	'-'+
	                	'<input type="text" class="youxiao_end form-control" readonly name="calendar_endtime" style="width: 95px;margin-top:5px;margin-left:3px;" value="'+obj.cyclic_endtime+'">'+
	                	'<br>'+
	                	'<input type="text" class="form-control" style="margin-top:5px; width:200px;" value="'+obj.cyclic_week+'">'+
					'</td>'+
					'<td class="">'+
						'<input type="text" class="start_city form-control" readonly name="cyclic_city" style="width: 90px;" value="'+obj.cyclic_city+'">'+
					'</td>'+
					'<td class="marketPrice">'+
					        '<span>成人</span>'+
						    '<input type="text" class="marketPrice_ad form-control" readonly name="cyclic_price_market_man" style="width: 80px;" value="'+obj.cyclic_price_market_man+'"><br>'+
					        '<span>儿童</span>'+
						    '<input type="text" class="marketPrice_ch form-control" readonly name="cyclic_price_market_child" style="width: 80px;" value="'+obj.cyclic_price_market_child+'">'+			
					'</td>'+
					'<td class="waimaiPrice">'+
						'<span>成人</span>'+
						'<input type="text" class="waimaiPrice_ad form-control" readonly name="cyclic_price_takeout_man" style="width: 80px;" value="'+obj.cyclic_price_takeout_man+'"><br>'+
						'<span>儿童</span>'+
						'<input type="text" class="waimaiPrice_ch form-control" readonly name="cyclic_price_takeout_child" style="width: 80px;" value="'+obj.cyclic_price_takeout_child+'">'+
					'</td>'+
					'<td class="fenxiaoPrice">'+
						'<span>成人</span>'+
						'<input type="text" class="fenxiaoPrice_ad form-control" readonly name="cyclic_price_distrinutiom_man" style="width: 80px;" value="'+obj.cyclic_price_distrinution_man+'"><br>'+
						'<span>儿童</span>'+
						'<input type="text" class="fenxiaoPrice_ch form-control" readonly name="cyclic_price_distribution_child" style="width: 80px;" value="'+obj.cyclic_price_distribution_child+'">'+
					'</td>'+
				    '<td class="handle">'+
				    	'<span>预览</span>'+
				    '</td>'+
				'</tr>';

				$('.comple_fatuan').append(_html);
				$('.comple_fatuan').find('.fatuan_tr').nextAll().find('.timeType_select').remove();
			}
		}


		//集合时间、地点
		var time=data.gatherList;
		// console.log(time);
		$('.comple_gather').find('.gather_tr').remove();
		for(var i=0;i<time.length;i++){
			var str2=time[i];
			var _html='<tr class="gather_tr">'+
				'<td class="gather_time"><input type="text" readonly class="gather-time" name="gather_time" value="'+str2.gather_time+'"></td>'+
				'<td class="gather_site"><input type="text" readonly class="gather-place" name="gather_place" value="'+str2.gather_place+'"></td>'+
				'<td class="handle">'+
					'<span>预览</span>'+
				'</td>'+
			'</tr>';

			$('.comple_gather').append(_html);
		}


		//行程安排
		var arr3=new Array();
		arr3=data.schedulingList;
		$('.sec_schedule').find('.schedule').remove();
		for(var i=0;i<arr3.length;i++){
			var obj=arr3[i];
			// console.log(obj);
			var arr=obj.scheduling_picture.split(',');		//图片地址
			// console.log(arr);

			var _html='<table class="schedule right">'+
		    '<tr class="schedule_tr">'+
		    	'<td rowspan="6">'+
		    		'<h4>第<span class="schedule_day">'+(i+1)+'</span>天</h4>'+
		    	'</td>'+
		    	'<td>'+
		    		'<textarea name="scheduling_describe" readonly class="scheduling-describe" cols="80" rows="5">'+obj.scheduling_describe+'</textarea>'+
		    	'</td>'+
		    	'<td rowspan="6" style="width:56px;">'+
		    		'<span>预览</span>'+
		    	'</td>'+
		    '</tr>'+
		    '<tr>'+
		    	'<td>'+
		    	    '<span class="span_advice product-img" style="margin-left:-1050px;">图片预览</span>'+
		    	    '<div class="imgimg-1">'+
			    		'<div class="imgimg-top-1">'+
			    			'<img class="imgg imgg-1" id="imgm-1-1" src="'+arr[0]+'?imageslim" alt="">'+
			    		'</div>'+
			    	'</div>'+
			    	'<div class="imgimg-1">'+
			    		'<div class="imgimg-top-1">'+
			    			'<img class="imgg imgg-2" id="imgm-1-2" src="'+arr[1]+'?imageslim" alt="">'+
			    		'</div>'+
			    	'</div>'+
			    	'<div class="imgimg-1">'+
			    		'<div class="imgimg-top-1">'+
			    			'<img class="imgg imgg-3" id="imgm-1-3" src="'+arr[2]+'?imageslim" alt="">'+
			    		'</div>'+
			    	'</div>'+
		    	'</td>'+
		    '</tr>'+
		    '<tr class="form-inline"> '+
		    	'<td class="hotel" style="text-align: left;">'+
		    	    '<span style="margin-left:35px;">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿：</span>'+
		    	    '<input type="text" readonly class="form-control" style="width:160px;display: inline-block;" value="'+obj.scheduling_stay+'">'+
		    	'</td>'+
		    '</tr>'+
		    '<tr class="form-inline">'+
		    	'<td style="text-align: left;">'+
		    	    '<span style="margin-left:35px;">酒店名称:</span>'+
		    	    '<input type="text" readonly class="hotel_name form-control" name="scheduling_hotel" value="'+obj.scheduling_hotel+'">'+
		    	'</td>'+
		    '</tr>'+
		    '<tr class="form-inline">'+
		    	'<td class="food" style="text-align: left;">'+
		    	    '<span style="margin-left:35px;">包&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;餐:</span>'+
		    	    '<input type="text" readonly class="hotel_name form-control" name="scheduling_hotel" value="'+obj.scheduling_eat+'">'+
		    	'</td>'+
		    '</tr>'+
	    '</table>';

	    $('.sec_schedule').append(_html);

	}



		$('.path-product-feature').val(data.path_product_feature);		//线路特色
		$('.path-product-notice').val(data.path_product_notice);		//预订须知
		$('.path-product-attention').val(data.path_product_attention);	//注意事项
		

	}

	//审核通过跳转界面
	$('.last_page2').click(function(){
		$.ajax({
			url:'/tyhcontrol/updateProductStateByNum',
			type:'post',
			data:'path_product_num='+$('.input_id').val(),
		});
		window.location.href="audit.html";
	});


	//审核未通过跳转界面
	$('.route_submit').click(function(){
		window.location.href="audit.html";
	});



});