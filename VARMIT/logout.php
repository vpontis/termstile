<?php
		$past = time() - 3600;
		echo setcookie('email','',$past);
		setcookie('passhash','',$past);
?>