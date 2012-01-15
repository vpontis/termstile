<?php
	
	if(isset($_POST['name'])){
		$name = $_POST['name'];
	}
	echo strrev($name);
?>