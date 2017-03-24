$(function(){
	$.ajax({
		url:'/tyhcontrol/validateLogin',
		type:'post',
		success:function(data){
			if(data==0){
				ValidateLogin();
			}
		},
	});
});


//增加集合信息
function add_tr(obj) {
    var tr = $(obj).parent().parent();
    var newtr = tr.clone();
    newtr.find("input").each(function(i){
        if($(this).attr("type")!="button"){//不是button的
            $(this).val("");
        }

    });

    tr.after(newtr);	

    $(obj).hide();
    $(obj).next().hide();

}

//增加发团日期
function add_Fatuan(obj) {
    var tr = $(obj).parent().parent();
    var newtr = tr.clone(true);

    newtr.find('.timeType_select').remove();
    newtr.find(":input").each(function(i){
        if($(this).attr("type")!="button"){//不是button的
            $(this).val("");
        }
    });
    newtr.find('.times_start').removeAttr('id').removeClass('hasDatepicker').datepicker();
    newtr.find('.times_end').removeAttr('id').removeClass('hasDatepicker').datepicker();
    newtr.find('.youxiao_begin').removeAttr('id').removeClass('hasDatepicker').datepicker();
    newtr.find('.youxiao_end').removeAttr('id').removeClass('hasDatepicker').datepicker();
    if(newtr.find('.tuanqi_days').find('span').hasClass('weekDay_active')){
    	newtr.find('.tuanqi_days').find('span').removeClass('weekDay_active').addClass('week_day');
    	newtr.find('.tuanqi_days').find('span').eq(1).removeClass('week_day');
    }
    tr.after(newtr); 
    $(obj).hide();
    $(obj).next().next().next().hide();
}



//删除指定的元素
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}


//获取多个数组的值
function Multiple(arr){
	var arr1=new Array;
	if (arr.length==1) {
		arr1.push(arr[0].value);
	}
	else{
		for(var i=0;i<arr.length;i++){
			arr1.push(arr[i].value);
		}
	}
	return arr1;
	// console.log(arr1);
}

//获取时间/地点集合数组的值
function Gather_time(arr){
	var obj=new Object();
	var g_time='';
	for(var i=0;i<arr.length;i++){

		var time=$(arr[i]).find($('.gather-time')).val();
		var place=$(arr[i]).find($('.gather-place')).val();
		obj['gather_order']=i+1;
		obj['gather_time']=time;
		obj['gather_place']=place;

		g_time+=JSON.stringify(obj)+',';
	}

	var G_time=g_time.substr(0,g_time.length-1);
	G_time='['+G_time+']';
	// console.log(G_time);
	return G_time;
}


//获取基本信息的值--日历时间
function Gather_place(arr){
	var obj=new Object();
	var g_place='';
	for(var i=0;i<arr.length;i++){

		var times_start=$(arr[i]).find($('.times_start')).val();	//起时间
		var times_end=$(arr[i]).find($('.times_end')).val();	//停止时间
		var start_city=$(arr[i]).find($('.start_city')).val();	//出发城市
		var marketPrice_ad=$(arr[i]).find($('.marketPrice_ad')).val();	//以下是市场价格、外卖价格、分销价格
		var marketPrice_ch=$(arr[i]).find($('.marketPrice_ch')).val();	
		var waimaiPrice_ad=$(arr[i]).find($('.waimaiPrice_ad')).val();
		var waimaiPrice_ch=$(arr[i]).find($('.waimaiPrice_ch')).val();
		var fenxiaoPrice_ad=$(arr[i]).find($('.fenxiaoPrice_ad')).val();
		var fenxiaoPrice_ch=$(arr[i]).find($('.fenxiaoPrice_ch')).val();

		obj['calendar_order']=i+1;
		obj['calendar_begintime']=times_start;
		obj['calendar_endtime']=times_end;
		obj['calendar_city']=start_city;
		obj['calendar_price_market_man']=marketPrice_ad;
		obj['calendar_price_market_child']=marketPrice_ch;
		obj['calendar_price_takeout_man']=waimaiPrice_ad;
		obj['calendar_price_takeout_child']=waimaiPrice_ch;
		obj['calendar_price_distribution_man']=fenxiaoPrice_ad;
		obj['calendar_price_distribution_child']=fenxiaoPrice_ch;

		g_place+=JSON.stringify(obj)+',';
	}

	var G_time='['+g_place.substr(0,g_place.length-1)+']';
	G_time='"calendarList"'+':'+G_time;
	G_time='"type_name"'+':'+'"日历"'+','+G_time;
	// console.log(G_time);
	return G_time;
}

//选择周循环日历
function Select_week(arr){
	var arr1=new Array();
	var arr2=new Array();

	for(var i=0;i<arr.length;i++){
		if($(arr[i]).hasClass('weekDay_active')){
			arr1.push($(arr[i]).text());
		}
		else{
			arr1.removeByValue($(arr[i]).text());
		}
	}
	arr2=arr1.join(',');
	// console.log(arr1);
	return arr2;
}


//获取基本信息的值--每周循环
function Gather_place2(arr){
	var obj=new Object();
	var obj1=new Object();
	var g_place='';

	for(var i=0;i<arr.length;i++){

		var times_start=$(arr[i]).find($('.youxiao_begin')).val();;	//有效期开始时间
		var times_end=$(arr[i]).find($('.youxiao_end')).val();;	//有效期结束时间
		var for_week=Select_week($(arr[i]).find('.tuanqi_days').find('span'));	//每周循环
		var start_city=$(arr[i]).find($('.start_city')).val();	//出发城市
		var marketPrice_ad=$(arr[i]).find($('.marketPrice_ad')).val();	//以下是市场价格、外卖价格、分销价格
		var marketPrice_ch=$(arr[i]).find($('.marketPrice_ch')).val();	
		var waimaiPrice_ad=$(arr[i]).find($('.waimaiPrice_ad')).val();
		var waimaiPrice_ch=$(arr[i]).find($('.waimaiPrice_ch')).val();
		var fenxiaoPrice_ad=$(arr[i]).find($('.fenxiaoPrice_ad')).val();
		var fenxiaoPrice_ch=$(arr[i]).find($('.fenxiaoPrice_ch')).val();

		obj['cyclic_order']=i+1;
		obj['cyclic_begintime']=times_start;
		obj['cyclic_endtime']=times_end;
		obj['cyclic_week']=for_week;
		obj['cyclic_city']=start_city;
		obj['cyclic_price_market_man']=marketPrice_ad;
		obj['cyclic_price_market_child']=marketPrice_ch;
		obj['cyclic_price_takeout_man']=waimaiPrice_ad;
		obj['cyclic_price_takeout_child']=waimaiPrice_ch;
		obj['cyclic_price_distrinution_man']=fenxiaoPrice_ad;
		obj['cyclic_price_distribution_child']=fenxiaoPrice_ch;

		g_place+=JSON.stringify(obj)+',';
	}

	var G_time='['+g_place.substr(0,g_place.length-1)+']';
	G_time='"cyclicList"'+':'+G_time;
	G_time='"type_name"'+':'+'1'+','+G_time;
	// console.log(G_time);
	return G_time;
}


//获取行程安排
function Arran_stroke(arr){
	var obj=new Object();
	var g_place='';
	for(var i=0;i<arr.length;i++){

		var scheduling_describe=$(arr[i]).find($('.scheduling-describe')).val();	//第一天描述
		var linajie1=$(arr[i]).find($('.imgg-1')).attr('src'); //图片链接地址
		var linajie2=$(arr[i]).find($('.imgg-2')).attr('src');
		var linajie3=$(arr[i]).find($('.imgg-3')).attr('src');
		var lianjie=linajie1+','+linajie2+','+linajie3;
		var first_hotel=$(arr[i]).find('input[type="radio"]:checked').val();	//住宿
		var scheduling_hotel=$(arr[i]).find($('.hotel_name')).val();	//酒店名称
		var food_hotel=Multiple($(arr[i]).find('input[type="checkbox"]:checked'));	//包餐
		food_hotel2=food_hotel.join(',');	//包餐

		obj['scheduling_order']=i+1;
		obj['scheduling_picture']=lianjie;
		obj['scheduling_describe']=scheduling_describe;
		obj['scheduling_stay']=first_hotel;
		obj['scheduling_hotel']=scheduling_hotel;
		obj['scheduling_eat']=food_hotel2;
		g_place+=JSON.stringify(obj)+',';
	}

	var G_time=g_place.substr(0,g_place.length-1);
	G_time='['+G_time+']';
	// console.log(G_time);

	return G_time;
}

//动态添加id
function AddId1(css1,id_name){
	var n=0;
	css1.each(function() {
		$(this).attr('id',id_name+(n+1)+'-1');
		n++;
	});
}
function AddId2(css2,id_name){
	var n=0;
	css2.each(function() {
		$(this).attr('id',id_name+(n+1)+'-2');
		n++;
	});
}
function AddId3(css3,id_name){
	var n=0;
	css3.each(function() {
		$(this).attr('id',id_name+(n+1)+'-3');
		n++;
	});
}

//默认选中单选框
function Check(obj){
	obj.checked="checked";
}