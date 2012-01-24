<?php
		$url = "127.0.0.1";
		$username = "root";
		$password = "";
		$con = mysql_connect($url,$username,$password);
			if(!$con)
			{
				die('Could not connect:'.mysql_error());
			}
		mysql_select_db('termstile', $con);
?>