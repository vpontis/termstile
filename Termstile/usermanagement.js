function signUp(){
		var email = document.getElementById("suEmail");
		var password = document.getElementById("suPassword");
		var altpassword = document.getElementById("suAltPassword");
		$.post("register.php",{email: email.value, password: password.value, altpassword: altpassword.value},	function(data){
			$("#signupPopup").html(data);
		});		
		popupOpen = "#signupPopup";
		centerPopup('#signupPopup');
		loadPopup('#signupPopup');
}	

function logIn(){
		var email = document.getElementById("liEmail");
		var password = document.getElementById("liPassword");
		$.post("login.php",{email: email.value, password: password.value},	function(data){
			if(data=="Login Successful!"){
				location.reload();
			}
			else $("#loginPopup").html(data);
		});		
		popupOpen = "#loginPopup";
		centerPopup('#loginPopup');
		loadPopup('#loginPopup');
}	

function logOut(){
		$.post("logout.php", function(data){
			location.reload();	
		});	
		
}
