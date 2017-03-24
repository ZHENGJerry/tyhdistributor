//绑定日历插件
$('.tuanqi_times').delegate('.datePicker', 'click', function() {
	$('.datePicker').datepicker({
		dateFormat: 'yy-mm-dd'
	});
})

$('.ticket_times').delegate('.datePicker', 'click', function() {
	$('.datePicker').datepicker({
		dateFormat: 'yy-mm-dd'
	});
})