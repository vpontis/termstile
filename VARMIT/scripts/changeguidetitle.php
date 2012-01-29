<?php
	if(isset($_COOKIE['email'])){
		include 'dbconnect.php';
		$email = $_COOKIE['email'];

		$title = $_POST['title'];
		$id = $_POST['id'];
		$update = "UPDATE `Guides` SET Title='$title' WHERE Id='$id'";
		mysql_query($update);
	}
	
?>