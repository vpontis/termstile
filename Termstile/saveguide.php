<?php
	$con=mysql_connect("127.0.0.1","root","");
		if(!$con)
		{
			die('Could not connect:'.mysql_error());
		}
	mysql_select_db('autostudy', $con);
	$email = $_COOKIE['email'];
	$terms = $_POST['terms'];
	$title = $_POST['title'];
	$insert = "INSERT INTO guides (Title, Terms) VALUES('$title', '$terms')";
	mysql_query($insert);
	$id = mysql_insert_id();
	$getUsers = mysql_query("SELECT * FROM users WHERE Email = '$email'");
	while($info = mysql_fetch_array($getUsers)){
			$guides = $id."|".$info['guides'];	
			 $update = "UPDATE users SET MyGuides='$guides' WHERE Email='$email'";
			 mysql_query($update);
	}	
?>