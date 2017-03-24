$(function() {
	$('#toPage2').click(function() {

		var route_type = $('.input_type').val();
		var route_name = $('.input_name').val();
		var route_id = $('.input_id').val();
		var route_brief = $('.input_briefIntro').val();
		var route_terminal = getAllValue('.comple_input_tag');
		var route_tags = getAllText('.tag .tagSelect_active');
		var route_residual = $('.input_residual').val();
		// $ajax({
		// 	url:;
		// 	data:
		// })
	})

	function getAllValue(objName) {
		var arr_val = [];
		$(objName).each(function() {
			arr_val.push($(this).val())
		})
		return arr_val;
	}

	function getAllText(objName) {
		var arr_txt = [];
		$(objName).each(function() {
			arr_txt.push($(this).text())
		})
		return arr_txt;
	}
})