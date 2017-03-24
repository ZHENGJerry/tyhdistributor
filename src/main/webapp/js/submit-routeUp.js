$(function(){

	var ruote_up_obj_1={};
	var ruote_up_obj_2;	//字符串拼接成json
	var send_ruote_up_obj_2;
	var ruote_up_obj_3={};

	//获取产品编号
	//第一页中的上传宣传图的"选择图片"传七牛云
	$('.add_id').click(function(){
		$(this).attr('disabled',true);

		$.ajax({
			url:'/tyhcontrol/getProductNum',
			type:'post',
			success:function(data){
				$('.input_id').val(data);
			},
		});

		//上传宣传图
		Up('ssi-upload','.ssi-upload-look','.next_page2');

		//上传产品图
		Up('file-pic-1','.img1','.next_page2');

		$('.img-btn').attr('disabled',false);
		$('.img-btn-remove').attr('disabled',false);
    });

	//限制文件选择
	$('#ssi-upload,#file-pic-1').click(function(){
		if(!$('.input_id').val()){
			return false;
		}
	});


    //确定目的地
	var ad_value=new Array();
	var admit_value='';
	$('.admit_terminal').click(function() {
		//改变已编辑的input样式
		$(this).prev().removeClass('input_terminal').addClass('comple_input_tag').attr('title', '点击删除目的地').attr('readonly', 'readonly');

		ad_value.push($(this).prev().val());
		admit_value=ad_value.join(',');
		// console.log(admit_value);

		$('.comple_input_tag').click(function() {
			ad_value.removeByValue($(this).val());
			admit_value=ad_value.join(',');
			// console.log(admit_value);
			$(this).remove();
		});

		$('.admit_terminal').hide();
		$('.add_terminal').show();
	});

	//选择标签
	var sel_destination=new Array();
	var select_destination='';
	$(".tag").delegate(".tag_select", "click", function() {
		$(this).removeClass('tag_select').addClass('tagSelect_active');

		sel_destination.push($(this).text());
		select_destination=sel_destination.join(',');

		// console.log(select_destination);
	});
	$(".tag").delegate(".tagSelect_active", "click", function() {
		$(this).removeClass('tagSelect_active').addClass('tag_select');

		sel_destination.removeByValue($(this).text());
		select_destination=sel_destination.join(',');

		// console.log(select_destination);
	});


	//点击"下一步"事件
	$('.next_page2').click(function() {

		//第一页中的数据
		ruote_up_obj_1.path_product_type=$('.input_type').val();		//产品分类
		ruote_up_obj_1.path_product_name=$('.input_name').val();		//产品名称
		ruote_up_obj_1.path_product_num=$('.input_id').val();		//产品编号
		ruote_up_obj_1.path_product_intro=$('.input_briefIntro').val();	//产品简介
		ruote_up_obj_1.path_product_destination=admit_value;  //目的地
		ruote_up_obj_1.path_product_label=select_destination;  //标签
		ruote_up_obj_1.path_product_residue=$('.input_residual').val();		//余位
		ruote_up_obj_1.path_product_advertisingpicture=$('.ssi-upload-look').attr('src');		//上传宣传图

		var product_num=$('.imgi');
		var aa=new Array();
		for(var i=0;i<product_num.length;i++){
			aa.push($('.imgi').eq(i).attr('src'));
		}
		var bb=aa.join(',');
		ruote_up_obj_1.path_product_productpicture=bb;		//上传产品图
		// console.log(ruote_up_obj_1);

		//验证数据是否填完整
		for(var i in ruote_up_obj_1){
			if(!ruote_up_obj_1[i]){
				$('.title-info').show();
				return false;
			}
		}
		$('.title-info').hide();
		$('.page1').hide();
		$('.page2').show();
		
		$.ajax({
			url:'/tyhcontrol/updateAddTableOne',
			type:'post',
			contentType:'application/json; charset=utf-8',
			data:JSON.stringify(ruote_up_obj_1),
		});

		// 添加行程安排第一天的照片
		Up('file-piccc-1-1','#imgm-1-1','.next_page3');
		Up('file-piccc-1-2','#imgm-1-2','.next_page3');
		Up('file-piccc-1-3','#imgm-1-3','.next_page3');
		
	});


	//第二页"下一步"事件
	$('.next_page3').click(function() {

		//第二页中的数据
		var calendarList;
		if($('.fatuan_tr').children('.timeType_select').find('span').eq(0).hasClass('tagSelect_active')){
			//日历时间
			calendarList=Gather_place($('.fatuan_tr'));	//发团日期里的信息
		}
		else{
			//每周循环
			calendarList=Gather_place2($('.fatuan_tr'));	//发团日期里的信息
		}

		// var gatherList=Gather_time($('.gather_tr'));  	//集合时间、时间地点
		// var schedulingList=Arran_stroke($('.schedule'));	//行程安排中的第一天描述
		var path_product_num=$('.input_id').val();
		ruote_up_obj_2 ='{'+'"path_product_num"'+':'+path_product_num+','+calendarList+','+'"gatherList"'+':'+Gather_time($('.gather_tr'))+','+'"schedulingList"'+':'+Arran_stroke($('.schedule'))+'}';	
		
		
		var ruote_up_text=JSON.parse(ruote_up_obj_2);
		// console.log(ruote_up_text);
		// console.log(ruote_up_obj_2);
		
		// 验证发团日期数据是否完整--日历时间
		if($('.fatuan_tr').children('.timeType_select').find('span').eq(0).hasClass('tagSelect_active')){
			for(var i=0;i<ruote_up_text.calendarList.length;i++){
				for(var n in ruote_up_text.calendarList[i]){
					if(!ruote_up_text.calendarList[i][n]){
						// console.log(ruote_up_text.calendarList[i][n]);
						$('.title-info2').show();
						return false;
					}
				}
			}
		}
		else{
			// 验证发团日期数据是否完整--每周循环
			for(var i=0;i<ruote_up_text.cyclicList.length;i++){
				for(var n in ruote_up_text.cyclicList[i]){
					if(!ruote_up_text.cyclicList[i][n]){
						// console.log(ruote_up_text.calendarList[i][n]);
						$('.title-info2').show();
						return false;
					}
				}
			}
		}

		//验证集合时间、地点数据完整性
		for(var i=0;i<ruote_up_text.gatherList.length;i++){
			for(var n in ruote_up_text.gatherList[i]){
				if(!ruote_up_text.gatherList[i][n]){
					$('.title-info2').show();
					// console.log("a");
					return false;
				}
			}
		}

		//验证行程安排数据完整性
		for(var i=0;i<ruote_up_text.schedulingList.length;i++){
			for(var n in ruote_up_text.schedulingList[i]){
				if(!ruote_up_text.schedulingList[i][n]){
					$('.title-info2').show();
					// console.log("a");
					return false;
				}
			}
		}

		//验证图片是否齐全
		for(var i=0;i<ruote_up_text.schedulingList.length;i++){
			var pic_link=ruote_up_text.schedulingList[i].scheduling_picture;
			var pic_arr=new Array();
			var pic_arr=pic_link.split(',');

			for(var n in pic_arr){
				if(!pic_arr[n]){
					$('.title-info2').show();
					return false;
				}
			}
		}
		
		
		$('.title-info2').hide();
		$('.page2').hide();
		$('.page3').show();

		if($('.fatuan_tr').children('.timeType_select').find('span').eq(0).hasClass('tagSelect_active')){
			// ruote_up_obj_2['type_name']=0;
			var send_ruote_up_obj_2=ruote_up_obj_2.replace(/日历/,"0");
			console.log(ruote_up_obj_2);
			console.log(send_ruote_up_obj_2);
		}
		else{
			send_ruote_up_obj_2=ruote_up_obj_2;
		}

		$.ajax({
			url:'/tyhcontrol/updateAddTableTwo',
			type:'post',
			contentType:'application/json; charset=utf-8',
			data:send_ruote_up_obj_2,
		});

	});


	//第三页"提交审核"点击事件
	$('.route_submit').click(function(){

		ruote_up_obj_3.path_product_feature=$('.path-product-feature').val();  //线路特色
		ruote_up_obj_3.path_product_notice=$('.path-product-notice').val();  //预订须知
		ruote_up_obj_3.path_product_attention=$('.path-product-attention').val();  //注意事项
		ruote_up_obj_3.path_product_num=$('.input_id').val();		//产品编号

		//验证数据是否填完整
		for(var i in ruote_up_obj_3){
			if(!ruote_up_obj_3[i]){
				$('.title-info3').show();
				return false;
			}
		}

		$('.title-info3').hide();
		$.ajax({
			url:'/tyhcontrol/updateAddTableThree',
			type:'post',
			contentType:'application/json; charset=utf-8',
			data:JSON.stringify(ruote_up_obj_3),
			success:function(){
				window.location.href='/tyhcontrol/routeUp.html';
			},
			error:function(error){

			},
		});
		
	});


})