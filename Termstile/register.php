<?php
		include 'dbconnect.php';
		$email =  $_POST['email'];
		if(!$email | !$_POST['password'] | !$_POST['altpassword']){
			die('You did not complete all fo the required fields.');
		}
		if(!strpos($email,"@") | !strpos($email,".")){
			die('You did not enter a valid email.');
		}
		$checkUsers = mysql_query("SELECT Email FROM users WHERE Email = '$email'");
		if(mysql_num_rows($checkUsers)!=0){
			die("That email is already registered, please log in or try a different email.");
		}
		if($_POST['password'] != $_POST['altpassword']){
			die("The entered passwords do not match.");
		}
		
		$passhash = sha1($email . $_POST['password']);
		$insert = "INSERT INTO users (Email, PassHash, MyGuides) VALUES('$email', '$passhash','|')";
		if(mysql_query($insert)){
			echo "Thanks for signing up!";
		}
		else{
			die("Error creating user".mysql_error());
		}
		
		$hour = time() + 3600;
		setcookie('email',$email,$hour);
		setcookie('passhash',$passhash,$hour);
		
		mysql_close($con);
?>
