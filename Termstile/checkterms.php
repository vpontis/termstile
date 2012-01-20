<?php
	$con=mysql_connect("127.0.0.1","root","");
		if(!$con)
		{
			die('Could not connect:'.mysql_error());
		}
	mysql_select_db('autostudy', $con);
	$term = $_POST['term'];
	$check = mysql_query("SELECT * FROM terms WHERE Term = '$term'");
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