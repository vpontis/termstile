<?php
    $message = $_POST('message');
	mail("info@termstile.com","Reported Issue",$message);
?>