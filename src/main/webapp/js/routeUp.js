$(function() {

	//选择类型
	$('.tag_types').click(function() {
		var tag_txt = $(this).text();
		$('.input_type').val(tag_txt);
		//方法一
		// $('.tag_types').removeClass('tagSelect_active').removeClass('tag_select');//  replace(/tagSelect_active/gm,'');
		// $(this).siblings().addClass('tag_select');
		// $(this).addClass('tagSelect_active');
		//方法二
		$('.type').find('.tagSelect_active').removeClass('tagSelect_active').addClass('tag_select');
		$(this).removeClass('tag_select').addClass('tagSelect_active');
	})

	
	//增加目的地
	$('.add_terminal').click(function() {
		//限制数量
		if ($('.terminal').find('input').length == 7) return;

		var _html = ' <input type=\"text\" class=\"input_terminal form-control\" name=\"path_product_label\" style="width: 90px;\"> ';
		$('.admit_terminal').before(_html);

		
		
		$('.add_terminal').hide();
		$('.admit_terminal').show();
	})




	//增加标签
	// $('.add_tag').click(function() {
	// 	//限制数量
	// 	if ($('.tag').find('input').length == 7) return;
	// 	//改变已编辑的input样式
	// 	$(this).prev().removeClass('input_tag').addClass('comple_input_tag').attr('title', '点击删除标签').attr('readonly', 'readonly');
	// 	var _html = ' <input type=\"text\" class=\"input_tag form-control\" style="width: 120px;\" > ';
	// 	$(this).before(_html);
	// 	$('.comple_input_tag').click(function() {
	// 		$(this).remove();
	// 	})
	// })

	
	//发团时间类型
	$('.comple_fatuan').delegate('.times', 'click', function() {
		// $('.days').hide();
		$('.show_days').hide();
		$('.show_times').show();
		$(this).next().removeClass('tagSelect_active');
		$(this).addClass('tagSelect_active');
	});

	$('.comple_fatuan').delegate('.days', 'click', function() {
		// $('.times').hide();
		$('.show_times').hide();
		$('.show_days').show();
		$(this).prev().removeClass('tagSelect_active');
		$(this).addClass('tagSelect_active');
	});
	//开始日历时间的input都处于锁死状态
	$('.comple_fatuan').find('input').attr('readonly',true);


	$('.timeType_select span').click(function() {
		$(this).removeClass('tag_select').addClass('tagSelect_active');
		$(this).siblings().removeClass('tagSelect_active').addClass('tag_select');

		//解封日历时间
		$('.comple_fatuan').find('input').attr('readonly',false);

	});

	
	//起止时间--日历时间
	$('.tbl_fatuan').delegate('.times_start', 'focus', function() {
		$(this).datepicker();
	});

	//起止时间--日历时间
	$('.tbl_fatuan').on('focus', '.times_end', function() {
		$(this).datepicker();
	});

	//有效期起时间--每周循环
	$('.tbl_fatuan').on('focus', '.youxiao_begin', function() {
		$(this).datepicker();
	});
	//有效期停止时间--每周循环
	$('.tbl_fatuan').on('focus', '.youxiao_end', function() {
		$(this).datepicker();
	});


	//选择每周几
	$(".tuanqi_days").delegate(".week_day", "click", function() {
		$(this).removeClass('week_day').addClass('weekDay_active');

	});
	$(".tuanqi_days").delegate(".weekDay_active", "click", function() {
		$(this).removeClass('weekDay_active').addClass('week_day');
	});

	//增加发团日期
	$('.add_fatuan').click(function() {
		add_Fatuan(this);
	});


	//删除发团日期
	$('.comple_fatuan').on('click','.delete_date',function(){
		$(this).parent().parent().prev().find('.add_fatuan').show();
		$(this).parent().parent().prev().find('.delete_date').show();

		if ($(this).parent().parent().parent().find('.del_tr').length == 1) return;
		$(this).parent().parent().remove();
	});


	//集合时间首选框
	$('.gather-time').datetimepicker({
		datepicker:false,
		format:'H:i',
		step:5
	});


	// 增加集合信息
	$('.gather_Info').on('click','.add_gather',function() {
		add_tr(this);

		$('.gather-time').datetimepicker({
			datepicker:false,
			format:'H:i',
			step:5
		});

	});


	// 删除集合信息
	$('.gather_Info').on('click','.del_gather',function() {

		$(this).parent().parent().prev().find('.add_gather').show();
		$(this).parent().parent().prev().find('.del_gather').show();

		if ($(this).parent().parent().parent().find('.del_tr').length == 1) return;
		$(this).parent().parent().remove();

	});


	//删除table
	$('.del_tbl').click(function() {
		var idx_schedule = $(this).parent().parent().parent().parent().index() - 1;
		if ($(this).parent().parent().parent().parent().parent().find('.del_tbl').length == 1) return;
		//显示添加、删除按钮
		$(this).parent().parent().parent().parent().prev().find('.add_schedule').show();
		$(this).parent().parent().parent().parent().prev().find('.del_tbl').show();
		$(this).parent().parent().parent().parent().remove();

		if ($(this).parent().parent().parent().parent().find('.schedule_tr').length > 0) {
			//重新渲染图片与图片父亲的id
			AddId1($('.imgg-1'),'imgm-');  //盛放图片
			AddId2($('.imgg-2'),'imgm-');  //盛放图片
			AddId3($('.imgg-3'),'imgm-');  //盛放图片
			AddId1($('.file-picc-1'),'file-piccc-'); //选择图片
			AddId2($('.file-picc-2'),'file-piccc-'); //选择图片
			AddId3($('.file-picc-3'),'file-piccc-'); //选择图片

			//图片上传
			var aaa1='file-piccc-'+(idx_schedule+2)+'-1';
			var aaa2='file-piccc-'+(idx_schedule+2)+'-2';
			var aaa3='file-piccc-'+(idx_schedule+2)+'-3';
			var bbb1='#imgm-'+(idx_schedule+2)+'-1';
			var bbb2='#imgm-'+(idx_schedule+2)+'-2';
			var bbb3='#imgm-'+(idx_schedule+2)+'-3';
			Up(aaa1,bbb1,'.next_page3');
			Up(aaa2,bbb2,'.next_page3');
			Up(aaa3,bbb3,'.next_page3');

			//重新渲染日子
			var s_day = $('.schedule_day');
			var i = 1;
			s_day.each(function() {
				$(this).text(i);
				i++;
			})
			//重新渲染单选框name序号
			var s_hotel = $('.hotel');
			var j = 0;
			s_hotel.each(function() {
					$(this).children('input').attr('name', 'hotel_' + j);
					j++;
				})
				//重新渲染多选框name序号
			var s_food = $('.food');
			var m = 0;
			s_food.each(function() {
				$(this).children('input').attr('name', 'food_' + m);
				m++;
			})
		}
	});

	

	//添加行程安排
	$('.add_schedule').click(function() {
		//添加tr
		var idx_schedule = $(this).parent().parent().parent().parent().index() - 1;
		var _html = $('.sec_schedule').find('.schedule:eq(' + idx_schedule + ')').clone(true);
		//清除数据
		_html.find(':input').each(function(i){
			if($(this).attr("type")!="button"){
				$(this).val('');
			}
		});
		_html.find(':radio').attr('checked',false);
		_html.find(':radio').eq(0).val('无');
		_html.find(':radio').eq(1).val('普通酒店');
		_html.find(':radio').eq(2).val('三星级');
		_html.find(':radio').eq(3).val('四星级');
		_html.find(':radio').eq(4).val('五星级');
		_html.find(':radio').eq(5).val('农家院');

		_html.find(':checkbox').attr('checked',false);
		_html.find(':checkbox').eq(0).val('早餐');
		_html.find(':checkbox').eq(1).val('中餐');
		_html.find(':checkbox').eq(2).val('晚餐');
		_html.find('.imgg').attr('src','');
		$('.sec_schedule').append(_html);
		
		$(this).hide();
		$(this).next().hide();

		if ($(this).parent().parent().parent().parent().find('.schedule_tr').length > 0) {

			//重新渲染图片与图片父亲的id
			AddId1($('.imgg-1'),'imgm-');  //盛放图片
			AddId2($('.imgg-2'),'imgm-');  //盛放图片
			AddId3($('.imgg-3'),'imgm-');  //盛放图片
			AddId1($('.file-picc-1'),'file-piccc-'); //选择图片
			AddId2($('.file-picc-2'),'file-piccc-'); //选择图片
			AddId3($('.file-picc-3'),'file-piccc-'); //选择图片
			
			//图片上传
			var aaa1='file-piccc-'+(idx_schedule+2)+'-1';
			var aaa2='file-piccc-'+(idx_schedule+2)+'-2';
			var aaa3='file-piccc-'+(idx_schedule+2)+'-3';
			var bbb1='#imgm-'+(idx_schedule+2)+'-1';
			var bbb2='#imgm-'+(idx_schedule+2)+'-2';
			var bbb3='#imgm-'+(idx_schedule+2)+'-3';
			Up(aaa1,bbb1,'.next_page3');
			Up(aaa2,bbb2,'.next_page3');
			Up(aaa3,bbb3,'.next_page3');

			//重新渲染日子
			var s_day = $('.schedule_day');
			var i = 0;
			s_day.each(function() {
				$(this).text(i + 1);
				i++;
			});

			//重新渲染单选框name序号
			var s_hotel = $('.hotel');
			var j = 0;
			s_hotel.each(function() {
				$(this).children('input').attr('name', 'hotel_' + j);
				j++;
			});
			//默认选中单选框
			Check($('.sec_schedule').find('.hotel').eq(idx_schedule+1).find('input').eq(0)[0]);


			//重新渲染多选框name序号
			var s_food = $('.food');
			var m = 0;
			s_food.each(function() {
				$(this).children('input').attr('name', 'food_' + m);
				m++;
			});
		}
	});

	

	// 上传产品图
	var img_btn=$('.img-btn');
	for(var n=0;n<img_btn.length;n++){
		$(img_btn[n]).click(function(){
			var index=$(this).parent().parent().index();
			if($(this).parent().parent().parent().find('.imgimg').length<6){
				var _html=$(this).parent().parent().clone(true);
				_html.find('.imgi').attr('src','');

				$('#imgUpload_container').append(_html);
				$(this).hide();
				$(this).next().hide();
				//重新渲染"选择文件"
				var c_file=$('.file-pic');
				var i=1;
				c_file.each(function(){
					$(this).attr('id','file-pic-'+i)
					i++;
				});
				//重新渲染盛放图片容器
				var c_file1=$('.imgi');
				var m=1;
				c_file1.each(function(){
					$(this).attr('class','imgi img'+m)
					m++;
				});
				//上传图片
				Up('file-pic-'+(index+2),'.img'+(index+2),'.next_page2');

			}
		});
	}

	//删除图片
	var img_btn_remove=$('.img-btn-remove');
	for(var n=0;n<img_btn_remove.length;n++){
		$(img_btn_remove[n]).click(function(){
			$(this).parent().parent().prev().find('.img-btn').show();
			$(this).parent().parent().prev().find('.img-btn-remove').show();
			var index=$(this).parent().parent().index();
			var aa=$(this).parent().parent().parent().find('.imgimg').length;
			if(aa>1){
				$(this).parent().parent().remove();

				//重新渲染"选择文件"
				var c_file=$('.file-pic');
				var i=1;
				c_file.each(function(){
					$(this).attr('id','file-pic-'+i)
					i++;
				});
				//重新渲染盛放图片容器
				var c_file1=$('.imgi');
				var m=1;
				c_file1.each(function(){
					$(this).attr('class','imgi img'+m)
					m++;
				});
			}
		});
	}



	//显示下一页
	$('.last_page1').click(function() {

		$('.page2').hide();
		$('.page1').show();
	})
	$('.last_page2').click(function() {
		//向后台访问数据
		$.ajax({
			url:'/tyhcontrol/updateAllDel',
			type:'post',
			data:{'path_product_num':$('.input_id').val()},
		});

		$('.page3').hide();
		$('.page2').show();
	})

});