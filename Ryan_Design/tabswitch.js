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
	$("#login").click(function(e) {
		e.preventDefault();
		$("fieldset.signin_menu").toggle();
		$("#login").toggleClass("menu-open");
	});

	$("fieldset.signin_menu").mouseup(function() {
		return false
	});
	$("fieldset.signup_menu").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("fieldset.signin_menu").hide();
		}
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("fieldset.signup_menu").hide();
		}
	});
	$("#signup").click(function(e) {
		e.preventDefault();
		$("fieldset.signin_menu").toggle();
		$("#signup").toggleClass("menu-open");
	});
	$("#login").click(function() {
		$(".signup_menu").hide();
	});
	$("#login").click(function() {
		$(".signin_menu").show();
	});
	$("#signup").click(function() {
		$(".signup_menu").show();
	});
	$("#signup").click(function() {
		$(".signin_menu").hide();
	});
});
