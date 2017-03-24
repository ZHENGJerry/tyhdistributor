//添加有效期
$('.inner_tbl').on('click','.add_ticket',function() {
	var idx_ticket = $(this).parent().parent().index();
	var _html = '<tr><td nowrap class="ticket_times value_times"><input type="text" class="form-control datePicker" style="width: 95px;"><br>-<br><input type="text" class="form-control datePicker" style="width: 95px;"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><input type="text" class="form-control"></td><td><a href="javascript:;" class="add_btn add_ticket" style="display: block">添加</a><a href="javascript:;" class="add_btn del_tr" style="display: block">删除</a></td></tr>'
	$(this).parent().parent().parent().append(_html);
	// var idx_last = $('.ticket_tr').length - 1;
	// $('.ticket_tr:eq(' + idx_last + ')').find('.timeType_select').remove();
	// $('.ticket_tr:eq(' + idx_last + ')').find('.value_times').empty();
	// $('.ticket_tr:eq(' + idx_last + ')').find('.value_times').append('<input type=\"text\" class=\"form-control datePicker\" style=\"width: 95px;\">-<input type=\"text\" class=\"form-control datePicker\" style=\"width: 95px;\">')
})

//提交后
$('.ticket_submit').click(function(){
	$(this).text('继续添加');
})