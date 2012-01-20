<?php
	$con=mysql_connect("127.0.0.1","root","");
	if(!$con)
	{
		die('Could not connect:'.mysql_error());
	}
	mysql_select_db('autostudy', $con);
	$id = $_POST['id'];
	$getGuides = mysql_query("SELECT * FROM guides WHERE Id = '$id'");
	while($info = mysql_fetch_array($getGuides)){
		     echo $info['Terms'];
	}
?>