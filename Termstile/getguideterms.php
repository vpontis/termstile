<?php
	include 'dbconnect.php';
	$id = $_POST['id'];
	$getGuides = mysql_query("SELECT * FROM `Guides` WHERE Id = '$id'");
	while($info = mysql_fetch_array($getGuides)){
		     echo $info['Terms'];
	}
?>