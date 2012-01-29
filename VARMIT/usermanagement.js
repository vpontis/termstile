function enterSignUp(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
		signUp();
	}
}

function signUp(){
		var email = document.getElementById("suEmail");
		var password = document.getElementById("suPassword");
		var altpassword = document.getElementById("suAltPassword");
		$.post("register.php",{email: email.value, password: password.value, altpassword: altpassword.value},	function(data){
			$("#signupPopup").html(data+"<button onClick='location.reload()'>Ok!</button>");
		});		
		popupOpen = "#signupPopup";
		centerPopup('#signupPopup');
		loadPopup('#signupPopup');
}	

function enterLogIn(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
		logIn();
	}
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

function reportIssue(){
	var issue = document.getElementById('reportTextArea');
	$.post("report.php",{message: issue.value}, function(data){
		
		
	});
}
