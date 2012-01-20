<?php
	$con=mysql_connect("127.0.0.1","root","");
	if(!$con)
	{
		die('Could not connect:'.mysql_error());
	}
	mysql_select_db('autostudy', $con);
	$email = $_COOKIE['email'];
	$getUsers = mysql_query("SELECT * FROM users WHERE Email = '$email'");
	while($info = mysql_fetch_array($getUsers)){
		     echo $info['MyGuides'];
	}
?>