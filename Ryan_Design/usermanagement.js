function signUp(){
		$.post("register.php", function(data){
			$("#signupPopup").html(data);
		})		
		popupOpen = "#signupPopup";
		centerPopup('#signupPopup');
		loadPopup('#signupPopup');
}	
