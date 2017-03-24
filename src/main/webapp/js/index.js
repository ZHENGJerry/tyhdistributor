$(function(){
	//显示供应商控制台客户信息
	$.ajax({
		url:'/tyhcontrol/getUsernameAllInfo',
		type:'post',
		success:function(data){
			var data=data;
			$('.nav-right-name-ple').find('span').text(data.reg_username);
			$('.nav-right-name-bus').find('span').text(data.show_ui_need);

		},
	});


	//点击菜单导航显示、隐藏
	var oEm=$('#main .aside .aside-manage').find('em');
	
	for(var i=0;i<oEm.length;i++){

		$(oEm[i]).click(function(){
			var display=$(this).parent().parent().find('ul').css('display');
			//判断有无子菜单
			if(display==undefined){
				//让其他一级导航收起
				$('.aside-manage ul').slideUp('slow');

				//让三角形图片收回
				$('.aside-manage em').next().removeClass('detail-1').addClass('detail');

				//右侧小三角形
				$('.aside-manage em').parent().find('.aside-manage-triangle').css('display','none');
				$(this).parent().find('.aside-manage-triangle').css('display','block');
			}else{
				if (display=='none') {

					//ul下拉菜单
					$('.aside-manage ul').slideUp('slow');
					$(this).parent().parent().find('ul').slideDown('slow');

					//向上或者向右"三角"图片
					$('.aside-manage em').next().removeClass('detail-1').addClass('detail');
					$(this).next().removeClass('detail').addClass('detail-1');

					//右侧小三角形
					$('.aside-manage em').parent().find('.aside-manage-triangle').css('display','none');
					$(this).parent().find('.aside-manage-triangle').css('display','block');
				}else{
					//ul下拉菜单
					$(this).parent().parent().find('ul').slideUp('slow');

					//向上或者向右"三角"图片
					$(this).next().removeClass('detail-1').addClass('detail');

					//右侧小三角形
					$('.aside-manage em').parent().find('.aside-manage-triangle').css('display','none');
				}
			}
		});
	}
	




	//"产品管理"模块功能
	// $('#main .aside-manage').eq(0).find('ul li').eq(0).click(function(){
		// $(this).
		
	// });

	//底部滑动块
	$('.footer-state').mouseover(function(){
		$('.footer-state').find('span').hide();
		$(this).find('span').show();
	});
	
	$('.footer-state').mouseout(function(){
		$('.footer-state').find('span').hide();
	});

	
	//处理订单
	$('.footer-right figure').mouseover(function(){
		$(this).find('.footer-alert').show();
	});

	$('.footer-right figure').mouseout(function(){
		$(this).find('.footer-alert').hide();
	});


	//主体自适应屏幕高度
	$.fn.extend({
		'asideLeftAuto':function(){
			// alert($(document).height());
			// alert($('#main .aside').innerHeight());
			$('#main .aside').innerHeight($(document).height()-100);	
		},
		'asideRightAuto':function(){
			$('#main .main-right').innerHeight($(document).height()-120);
		},
	});

	$(window).asideLeftAuto();
	$(window).asideRightAuto();



});