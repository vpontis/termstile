$(document).ready(function() {
	// Login JS
	$("#login").click(function(e) {
		e.preventDefault();
		$("div.signin_menu").toggle();
		$("#login").toggleClass("menu-open");
	});

	$("div.signin_menu").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("div.signin_menu").hide();
		}
	});
	$("#signup").click(function(e) {
		e.preventDefault();
		popupOpen = "#signupPopup";
		centerPopup('#signupPopup');
		loadPopup('#signupPopup');
		$("div.signin_menu").toggle();
		$("#signup").toggleClass("menu-open");
	});
	//Autocomplete
	$("#oneTerm").autocomplete({
		source : function(request, response) {
			$.ajax({
				url : "http://en.wikipedia.org/w/api.php",
				dataType : "jsonp",
				data : {
					'action' : "opensearch",
					'format' : "json",
					'search' : request.term
				},
				success : function(data) {
					response(data[1]);
				}
			});
		},
	});
});
