<?php
    $message = $_POST['message'];
	echo mail("akashbad@mit.edu","Reported Issue",$message);
	
?>