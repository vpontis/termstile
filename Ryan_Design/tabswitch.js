$(document).ready(function() {
	$(function() {
		$('div.tab').click(function() {
			$('div.tab').removeClass('selected');
			$(this).addClass('selected');
		});
	});

	$("#multipleTerm").click(function() {
		$(".singlesearch").hide();
	});

	$("#singleTerm").click(function() {
		$(".singlesearch").show();
	});
	$("#multipleTerm").click(function() {
		$(".multiplesearch").show();
	});
	$("#singleTerm").click(function() {
		$(".multiplesearch").hide();
	});
	// Login JS
	$(".signin").click(function(e) {
		e.preventDefault();
		$("fieldset#signin_menu").toggle();
		$(".signin").toggleClass("menu-open");
	});

	$("fieldset#signin_menu").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("fieldset#signin_menu").hide();
		}
	});
});
