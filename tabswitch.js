$(document).ready(function() {
	$(function() {
		$('div.tab').click(function() {
			$('div.tab').removeClass('selected');
			$(this).addClass('selected');
		});
	});

	$("#multipleTerm").click(function() {
		$("#singlesearch").hide();
	});
	
	$("#singleTerm").click(function()	{
		$("#singlesearch").show();
	});
});
