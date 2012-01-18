$(document).ready(function() {
	$(function() {
		$('div.tab').click(function() {
			$('div.tab').removeClass('selected');
			$(this).addClass('selected');
		});
	});

	$("#singleTerm").click(function() {
		$(".singlesearch").show();
		$(".multiplesearch").hide();
		$("#oneTerm").focus();
	});
	$("#multipleTerm").click(function() {
		$(".multiplesearch").show();
		$(".singlesearch").hide();
		$("#manyTerm").focus();
	});
	// Login JS
	$("#login").click(function(e) {
		e.preventDefault();
		$("div.signin_menu").toggle();
		$("#login").toggleClass("menu-open");
	});

	$("div.signin_menu").mouseup(function() {
		return false
	});
	$("div.signup_menu").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("div.signin_menu").hide();
		}
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("div.signup_menu").hide();
		}
	});
	$("#signup").click(function(e) {
		e.preventDefault();
		$("div.signin_menu").toggle();
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
