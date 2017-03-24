
//切换保险产品分类
$(".bsinfo-list input").on("click",function(){
	
	$(this).addClass('list-sel').siblings().removeClass("list-sel");
	$(this).parent().find("span").html( $(this).val() );

});

//添加“适用人群”的下拉选项
setPer();
function setPer(){
	var data;
	for(var i=0;i<=100;i++){
		data += '<option>'+i+'</option>';
	};
	$(".bsinfo-per").find("select").append( data );
}

//添加“使用范围”的地址选择
selSite();
function selSite(){
	var siteData=[
	["蒙古","朝鲜","韩国","日本","菲律宾","越南","老挝","柬埔寨","缅甸","泰国","马来西亚","文莱","新加坡","印度尼西亚" 
,"东帝汶","尼泊尔","不丹","孟加拉国","印度","巴基斯坦","斯里兰卡","马尔代夫","哈萨克斯坦","吉尔吉斯斯坦","塔吉克斯坦","乌兹别克斯坦","土库曼斯坦","阿富汗","伊拉克","伊朗","叙利亚","约旦","黎巴嫩","以色列","巴勒斯坦","沙特阿拉伯","巴林","卡塔尔","科威特","阿拉伯联合酋长国","阿曼","也门","格鲁吉亚","亚美尼亚","阿塞拜疆","土耳其","塞浦路斯"],
	["芬兰","瑞典","挪威","冰岛","丹麦","爱沙尼亚","拉脱维亚","立陶宛","白俄罗斯","俄罗斯","乌克兰","摩尔多瓦","波兰","捷克","斯洛伐克","匈牙利","德国","奥地利","瑞士","列支敦士登","英国","爱尔兰","荷兰","比利时","卢森堡","法国","摩纳哥","罗马尼亚","保加利亚","塞尔维亚","马其顿","阿尔巴尼亚","希腊","斯洛文尼亚","克罗地亚","意大利","梵蒂冈","圣马力诺","马耳他","西班牙","葡萄牙","安道尔"],
	["加拿大","美国","墨西哥","格陵兰（丹）","危地马拉","伯利兹","萨尔瓦多","洪都拉斯","尼加拉瓜","哥斯达黎加","巴拿马","巴哈马","古巴","牙买加","海地","多米尼加共和国","安提瓜和巴布达","圣基茨和尼维斯","多米尼克","圣卢西亚","圣文森特和格林纳丁斯","格林纳达","巴巴多斯","特立尼达和多巴哥","波多黎各（美）","英属维尔京群岛","美属维尔京群岛","安圭拉（英）","蒙特塞拉特（英）","瓜德罗普（法）","马提尼克（法）","荷属安的列斯","阿鲁巴（荷）","特克斯和凯科斯群岛","开曼群岛（英）","百慕大（英）","巴西","智利","阿根廷","乌拉圭","巴拉圭","哥伦比亚","委内瑞拉","圭亚那","法属圭亚那","苏里南","厄瓜多尔","秘鲁","玻利维亚"]
];
	//设置sel-city里的选项
	$("#sel-range").on("change",function(){
		var range = $("#sel-range option:selected").text();
		var result='';
		switch(range){
			case "亚洲":
				for(var i=0;i<siteData[0].length;i++){
					result += '<option>'+ siteData[0][i] +'</option>';
				}
				break;
			case "欧洲":
				for(var i=0;i<siteData[1].length;i++){
					result += '<option>'+ siteData[1][i] +'</option>';
				}
				break;
			case "美洲":
				for(var i=0;i<siteData[2].length;i++){
					result += '<option>'+ siteData[2][i] +'</option>';
				}
				break;		
		}
		$("#sel-city").html( result );
		
	})
	

	$("#msel").on("change",function(){
		var val = $("#msel option:selected").text();
		if( val=="中国境外" ){
			$("#sel-range").parent().show();
		}else{
			$("#sel-range").parent().hide();
		}
		
	})
}

//添加保险项目
$(".pro-add").on("click",function(){
	addBX();
})

//创建保险项目
function addBX(){

	var $tr=$("<tr>");
	$tr.html( '\
		<td class="bx-xm">\
			<select name="" id="">\
				<option value="">选择保险项目</option>'+ getSel() +
			'</select>\
		</td>\
		<td class="bx-je">\
			<input type="text" placeholder="请输入保障金额"/>\
		</td>\
		<td class="bx-range">\
			<input type="text" placeholder="请输入保障项目"/>\
			<input type="button" value="确定" class="pro-add-ok">\
			<input type="button" value="取消" class="pro-add-del">\
		</td>\
		' );
	$("table").append( $tr );

	//确定按钮的事件
	$(".pro-add-ok").on("click",function(){
		
		var $targetTr = $(this).parent().parent();

		//获取添加保险的数据
		var data_xm = $targetTr.find("select option:selected").text();  //保险项目
		var data_je = $targetTr.find(".bx-je input").val();  //保险金额
		var data_range = $targetTr.find(".bx-range input:text").val();  //保险范围

		$targetTr.find(".bx-xm").html('<span>'+data_xm+'</span>');
		$targetTr.find(".bx-je").html('<span>'+data_je+'</span>');
		$targetTr.find(".bx-range").html('<span>'+data_range+'</span><input type="button" value="删除" class="delbx-xm">');

		//删除保险项目
		$(".delbx-xm").on("click",function(){
			$(this).parent().parent().remove();
		})
	});

	//取消按钮的事件
}

function getSel(){
	var bxList = ['意外身故/残疾','意外伤害/医疗','公共交通意外','高风险运动','高风险运动','突发急性疾病身故/全残','境内紧急救援','境外紧急救援','意外住院津贴','航班延误','行李/证件损失'];
	for(var i=0;i<bxList.length;i++){
		var selStr;
		selStr += '<option value="">'+ bxList[i] +'</option>';
	}
	return selStr;
}