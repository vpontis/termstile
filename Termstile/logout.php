<?php
		$past = time() - 3600;
		setcookie('email','',$past);
		setcookie('passhash','',$past);
?>