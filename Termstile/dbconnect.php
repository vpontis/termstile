<?php
		$url = "localhost";
		$username = "root";
		$password = "root";
		$con = mysql_connect($url,$username,$password);
			if(!$con)
			{
				die('Could not connect:'.mysql_error());
			}
		mysql_select_db('termstile', $con);
?>