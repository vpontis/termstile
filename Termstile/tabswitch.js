loginShown = false;
 
function toggleLogIn(){
	$('.signin_menu').slideToggle();
	if(!loginShown){
		$('#login').css('background-color','#F04900');
		document.getElementById('liEmail').focus();
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
	}
}

$(document).ready(function() {
	// Login JS
	$(document).mouseup(function(e) {
		if(loginShown){
			if(e.target != document.getElementById('login') && e.target != document.getElementsByClass('signin')) {
				$(".signin").removeClass("menu-open");
				$("div.signin_menu").slideUp();
				loginShown = false;
			}
		}
	});
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
