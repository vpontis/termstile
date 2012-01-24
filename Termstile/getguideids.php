<?php
	include 'dbconnect.php';
	$email = $_COOKIE['email'];
	$getUsers = mysql_query("SELECT * FROM users WHERE Email = '$email'");
	while($info = mysql_fetch_array($getUsers)){
		     echo $info['MyGuides'];
	}
?>