<?php
		$con=mysql_connect("127.0.0.1","root","");
			if(!$con)
			{
				die('Could not connect:'.mysql_error());
			}
		mysql_select_db('autostudy', $con);
		$email =  $_POST['email'];
		if(!$email | !$_POST['password'] | !$_POST['altpassword']){
			die('You did not complete all fo the required fields.');
		}
		if(!strpos($email,"@") | !strpos($email,".")){
			die('You did not enter a valid email.');
		}
		$checkUsers = mysql_query("SELECT email FROM users WHERE email = '$email'");
		if(mysql_num_rows($checkUsers)!=0){
			die("That email is already registered, please log in or try a different email.");
		}
		if($_POST['password'] != $_POST['altpassword']){
			die("The entered passwords do not match.");
		}
		
		$passhash = sha1($email . $_POST['password']);
		$insert = "INSERT INTO users (email, passhash) VALUES('$email', '$passhash')";
		if(mysql_query($insert)){
			echo "Thanks for signing up!";
		}
		else{
			die("Error creating user".mysql_error());
		}
		
		$hour = time() + 3600;
		setcookie(email,$email,$hour);
		setcookie(passhash,$passhash,$hour);
		
		mysql_close($con);
?>
