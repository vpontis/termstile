<?php
	if(isset($_COOKIE['email'])){
		include 'dbconnect.php';
		$email = $_COOKIE['email'];
		$terms = $_POST['terms'];
		$title = $_POST['title'];
		$insert = "INSERT INTO `Guides` (Title, Terms) VALUES('$title', '$terms')";
		mysql_query($insert);
		$id = mysql_insert_id();
		$getUsers = mysql_query("SELECT * FROM `Users` WHERE Email = '$email'");
		while($info = mysql_fetch_array($getUsers)){
				 $guides = "|".$id.$info['MyGuides'];
				 $update = "UPDATE `Users` SET MyGuides='$guides' WHERE Email='$email'";
				 mysql_query($update);
				 echo $id;
		}	
	}
	
?>