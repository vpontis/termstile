<?php
    $message = $_POST('message');
	mail("akashbad@mit.edu","Reported Issue",$message);
	echo $message;
?>