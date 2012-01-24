<?php
		include 'dbconnect.php';
		$email =  $_POST['email'];
		if(!$email | !$_POST['password']){
			die('You did not complete all of the required fields.');
		}
		$getUsers = mysql_query("SELECT * FROM users WHERE Email = '$email'");
		if(mysql_num_rows($getUsers)==0){
			die("That email is not registered, make sure you typed it correctly. Otherwise you can sign up!");
		}		
		while($info = mysql_fetch_array($getUsers)){
			$passhash = sha1($email . $_POST['password']);
			//echo $passhash."<br />";
			if($passhash != $info['PassHash']){
				die('Incorrect password, please try again.');
			}  
		}		
		$hour = time() + 3600;
		setcookie('email',$email,$hour);
		setcookie('passhash',$passhash,$hour);
		echo "Login Successful!";
		
		mysql_close($con);
?>