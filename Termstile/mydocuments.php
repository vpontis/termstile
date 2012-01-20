<html>
	<head>
		<title>Termstile: get Wikipedia summaries for terms</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js"></script>
		<script type="text/javascript" src="tabswitch.js"></script>
		<script type="text/javascript" src="badrank.js"></script>
		<script type="text/javascript" src="documentgrabber.js"></script>
		<script type="text/javascript" src="guidemaker.js"></script>
		<script type="text/javascript" src="usermanagement.js"></script>
		<link rel="icon" type="image/png" href="../media/termstilelogo.png" />
		<?php
			if(isset($_COOKIE['email'])){
				$con=mysql_connect("127.0.0.1","root","");
				if(!$con)
				{
					die('Could not connect:'.mysql_error());
				}
				mysql_select_db('autostudy', $con);
				$email =  $_COOKIE['email'];
				$passhash = $_COOKIE['passhash'];
				$getUsers = mysql_query("SELECT * FROM users WHERE Email = '$email'");
				if(mysql_num_rows($getUsers)!=0){
					while($info = mysql_fetch_array($getUsers)){
						if($passhash == $info['PassHash']){
							echo "<style type='text/css'>
							#signedout{
								display: none;
							}		
						#signedin {
						}</style>";
						}
					}		
		  
				}
					
			}
			else{
				header('Location:http:\\google.com');
			}
		?>
	</head>
	<body onLoad="initializePage('<?php echo $_COOKIE['email']?>')">
		<!--<div class="bigthing">-->
			<div class="header" id="headerContainer">
				<div class="container">
					<div id="title">
						<img src="../media/samplelogo.png"style="display: inline; float: left;" height="80px" width="200px"/>
					</div>
					<!-- Login Start-->
					<div id="container1" style="float: right;">
						<div id="signedout" class="topnav" >
							<span><a href="login" id="login" class="signin">Login</a><a href="signup" id="signup" class="signin">Sign Up</a></span>
						</div>
						<div id="signedin" class="topnav floats_r">
							<span><a href="index.php" id="home" class="signin">Home</a><a href="mydocuments.php" id="mydocs" class="signin">My Documents</a><a onclick="logOut()" id="logout" class="signin">Logout</a></span>
						</div>
						<!-- Sign Up form -->
						<div class="signup_menu">
								<label for="suEmail">Email</label>
								<input id="suEmail" name="email" placeholder="Email" title="email" tabindex="9" type="text">
								</br>
								<p>
									<label for="suPassword">Password</label>
									<input id="suPassword" name="password" placeholder="Password" title="password" tabindex="10" type="password">
								</p>
								<p>
									<label for="suAltPassword">Repeat Password</label>
									<input id="suAltPassword" name="password" placeholder="Repeat Password" title="password" tabindex="10" type="password">
								</p>
								<button id="signupButton" onClick="signUp()">Sign up!</button>
						</div>
						<!-- Sign Up form End -->
					</div>
					<!-- Login End -->
				</div>
			</div>
			<!-- Main Section Begin -->
			<div class="container" id="main">
				<div class="singlesearch">
				</div>
				<div id="boxArea">
				</div>
				<!--<div id="createButtons">
						<div id="createGuide">
							<button id="createGuideButton">Create Study Guide</button>
						</div>
						<div id="createCards">
							<button id="createCardsButton">Create Flash Cards</button>
						</div>
				</div>-->
				<div class="bottom container" id="bottomContainer">
					<a id="report">report</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="about">about us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="contactUs">contact us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="donate">donate</a>
				</div>
			</div>
		<!--</div>-->
	<div id="reportPopup" class="popup">  
    	<center>
	    	<h1>what's wrong!?</h1>  
	    	<p>Do you have a problem? Please tell us about it and we will work on fixing it!</p>
	    	<textarea rows="15" cols="30" placeholder="Enter problem here."/></textarea><br />
	    	<button>Submit</button>
	    	<h2>Thanks!</h2>
	    </center>
	    <a class="popupClose">X</a> 
    </div>
    <div id="aboutPopup" class="popup">
    	<h1>about us</h1>
    	<p>We are three MIT freshman who made this site for 6.470 which is a web development compeition.</p>
    	<p><strong>Victor Pontis</strong> Victor is from San Diego and can do a triple backflip.</p>
    	<p><strong>Ryan Lau</strong> Ryan is from Hawaii and surfs every day, even at MIT!</p>
    	<p><strong>Akash Badshah</strong> Akash is from Seattle and is Sean White's new big competitor.</p>
    	<a class="popupClose">X</a>
    </div>
    <div id="contactUsPopup" class="popup">
    	<h1>contact us</h1>
    	<center>
	    	<p>The best way to contact us would be by email.</p>
	    	<p><strong>Victor Pontis:</strong> vpontis@mit.edu <a href="mailto:vpontis@mit.edu">compose</a></p>
	    	<p><strong>Akash Badshah:</strong> akashbad@mit.edu <a href="mailto:akashbad@mit.edu">compose</a></p>
	    	<p><strong>Ryan Lau:</strong> rlau@mit.edu <a href="mailto:rlau@mit.edu">compose</a></p>
	    	<a class="popupClose">X</a>
    	</center>
    </div>
    <div id="donatePopup" class="popup">
    	<h1>donate</h1>
    	<p>We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)</p>
    	<a class="popupClose">X</a>
    </div>
    <div id="guidePopup" class="popup">
    	<h1 id="guidePopupTitle">Your Study Guide</h1>
    	<div id="guideMaterial">
    		Guide Information
    	</div>
    	<a class="popupClose">X</a>
    </div>
    <div id="signupPopup" class="popup">
    	<h1>donate</h1>
    	<p>We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)</p>
    	<a class="popupClose">X</a>
    </div>
    <div id="loginPopup" class="popup">
    	<h1>donate</h1>
    	<p>We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)</p>
    	<a class="popupClose">X</a>
    </div>
	<div id="backgroundPopup"></div>  
	</body>
</html>