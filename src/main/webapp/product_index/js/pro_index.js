// 侧栏滑动
var isHide = true;
$('.toggle').on('click', function() {
	if (isHide) {

		//边栏显示
		$('.sidebar').animate({
			right: '0'
		}, 800);
		isHide = false;
	} else {
		//边栏隐藏
		$('.sidebar').animate({
			right: '-80px'
		}, 800);
		isHide = true;
	}

})


//监听页面滚动
$(window).on('scroll', function() {
	var winTop = $(window).scrollTop();
	var winHeight = $(window).height();
	var sideHeight = $('.sidebar').height();
	var sideTop = winTop + (winHeight - sideHeight) / 2;
	$('.sidebar').stop().animate({
		top: sideTop
	}, 600)
})


//格子展开
var isCellHide = true;
$('.cell-more').on('click', function() {
	// $(this).stop();
	if (isCellHide) {
		$(this).prev().stop().animate({
			height: '+=392px'
		}, 50);
		$(this).html('收起');
		isCellHide=false;
	} else {
		$(this).prev().stop().animate({
			height: '214px'
		}, 50);
		$(this).html('查看更多')
		isCellHide=true;
	}
})



//getPos()
function getPos(){
	var right_l = $(".flow-right").offset().left;
	var right_t = $(".flow-right").offset().top;
	var mid_l = $(".flow-middle").offset().left;
	var mid_t = $(".flow-middle").offset().top;
	$(document).on("mouseover",function(ev){
		
		//判断鼠标的位置
		if( ev.pageX >= 52 && ev.pageX <= 314 && ev.pageY >= 176){
			
			$(".flow-left").css("margin-top","176px");
			$(".flow-right").css("position","fixed");
			$(".flow-right").css("left",right_l);
			$(".flow-right").css("top",right_t);

			$(".flow-middle").css("position","fixed");
			$(".flow-middle").css("left",mid_l);
			$(".flow-middle").css("top",mid_t);
			$(".flow-middle").css("margin",0);

			$(".index-header").css("position","fixed");

			
		}
		//console.log(ev.pageY)
	})
	//console.log( $(".flow-left").offset().left )
}

