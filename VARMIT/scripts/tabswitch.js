loginShown = false;
 
function toggleLogIn(){
	$('.signin_menu').slideToggle();
	if(!loginShown){
		$('#login').css('background-color','#F04900');
		document.getElementById('liEmail').focus();
		loginShown = true;
	}
	else{
		$('#login').css('background-color','#F05A18');
		loginShown = false;
	}
}

function hideLogIn(){
	if(loginShown){
		$('.signin_menu').slideUp();
		$('#login').css('background-color','#F05A18');
		loginShown = false;
	}
}

$(document).ready(function() {
	// Login JS
	$(document).mouseup(function(e) {
		if(loginShown){
			if(document.getElementById('loginmenu') != $(e.target).parent().parent()[0] && document.getElementById('loginmenu') != $(e.target).parent()[0] && e.target != document.getElementById('loginmenu') && e.target != document.getElementById('login')) {
				$(".signin").removeClass("menu-open");
				$(".signin_menu").slideUp();
				$('#login').css('background-color','#F05A18');
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
