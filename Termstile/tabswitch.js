loginShown = false;
 
function toggleLogIn(){
	$('.signin_menu').slideToggle();
	if(!loginShown){
		$('#login').css('background-color','#F04900');
		loginShown = true;
	}
	else{
		$('#login').css('background-color','#F05A18')
		loginShown = false;
	}
}

function hideLogIn(){
	if(loginShown){
		$('.signin_menu').slideUp();
		$('#login').css('background-color','#F05A18')
		loginShown = false;
		$('#backgroundPopup').fadeOut().hide();
	}
}

$(document).ready(function() {
	// Login JS
	/*$("#login").click(function(e) {
		e.preventDefault();
		if(!loginShown){
			$("div.signin_menu").slideDown(function(){
				document.getElementById('liEmail').focus();
			});
			$('#backgroundPopup').fadeTo('fast',.1);
			loginShown = true;
		}
		$("#login").toggleClass("menu-open");
	});

	$("div.signin_menu").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.signin").length == 0) {
			$(".signin").removeClass("menu-open");
			$("div.signin_menu").slideUp();
			$('#backgroundPopup').fadeOut('fast');
			loginShown = false;
		}
	});*/
	$("#signup").click(function(e) {
		e.preventDefault();
		popupOpen = "#signupPopup";
		centerPopup('#signupPopup');
		loadPopup('#signupPopup');
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
