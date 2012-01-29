<?php
	include 'dbconnect.php';
	$term = $_POST['term'];
	$check = mysql_query("SELECT * FROM `Terms` WHERE Term = '$term'");
	if(mysql_num_rows($check)!=0){
		while($info = mysql_fetch_array($check)){
			$def0 = $info['Definition0'];
			$def1 = $info['Definition1'];
			$def2 = $info['Definition2'];	
			echo $def0."|".$def1."|".$def2; 
		}
	}
	else echo "none";
	mysql_close($con);
?>