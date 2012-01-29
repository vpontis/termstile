<html>
	<body>
		<?php
			include 'dbconnect.php';
			
			$sql = "CREATE TABLE Users
			(
				PRIMARY KEY(Email),
				Email varchar(50) NOT NULL,
				PassHash varchar(40) NOT NULL,
				MyGuides varchar(100)
			)";
			if(mysql_query($sql, $con))
			{
				echo "Table created<br />";
			}
			else {
				echo "Error creating table".mysql_error();
				echo "<br />";
			}
			
			$sql = "CREATE TABLE Guides
			(
				PRIMARY KEY(Id),
				Id int NOT NULL AUTO_INCREMENT,
				Title varchar(50) NOT NULL,
				Terms varchar(4000) NOT NULL
			)";
			if(mysql_query($sql, $con))
			{
				echo "Table created<br />";
			}
			else {
				echo "Error creating table".mysql_error();
				echo "<br />";
			}
			mysql_close($con);
		?>
	</body>
</html>