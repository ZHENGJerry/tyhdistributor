
//全部选择
$(".sel-all").on("change",function(){
	if( $(this).attr("checked") ){
		$(".pro-p-index input").attr("checked","checked");
	}else{
		$(".pro-p-index input").attr("checked",false);
	}
});