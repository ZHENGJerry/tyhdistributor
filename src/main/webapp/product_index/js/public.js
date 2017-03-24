//显示地理位置信息
$(".location-name").ready(function(){
	var os=$('<script/>')
		.attr("src","http://api.map.baidu.com/location/ip?ak=fk4vQxq9fCbM1uxxDewN34A00V1IL1m4&coor=bd09ll&callback=showCity")
		.appendTo( $("body") );
	
})
function showCity(data){
	$(".location-name").html(data.content.address);
};

//顶部导航的跳转
// $("a").on("click",()=>{
// 	return false;
// });
//跳转到首页
$(".top-links li").eq(1).find("a").on("click",()=>{
	window.location.href = "pro_index.html";
});
//跳转到旅游路线页面
$(".nav-li").eq(0).find("a").on("click",()=>{
	window.location.href = "route_show.html";
});
//跳转到路线详情页面
$(".cell-hot,.cell-notice").find(".cell-li").on("click",()=>{
	window.location.href = "route_detail.html";
});
$(".cell-pic").on("click",()=>{
	window.location.href = "route_detail.html";
});
//跳转到尾团甩卖页面
$(".cell-sale").find(".cell-li").on("click",()=>{
	window.location.href = "info_sell.html";
});
//跳转到商情发布页面
$(".cell-market").find(".cell-li").on("click",()=>{
	window.location.href = "info_issue.html";
});
$(".list-gy li a").click(()=>{
	window.location.href = "provider_pro.html";
})
$(".list-hot li,.main-list-info h5,.main-btn").click(()=>{
	window.location.href = "route_detail.html";
})



//轮播图效果




