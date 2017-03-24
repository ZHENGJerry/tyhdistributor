$(function(){
	//选择旅行的供应酒店和行程
	$(".choice-list:lt(3)").find("li:gt(0)").on("click",function(){
		$(this).siblings().attr("class","")
		$(this).attr("class","choice-selected")
	})
})

//日期选择
$(".datepicker").date_input();