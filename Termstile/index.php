<html>
	<head>
		<title>Termstile: get Wikipedia summaries for terms</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
		<script type="text/javascript" src="tabswitch.js"></script>
		<script type="text/javascript" src="badrank.js"></script>
		<script type="text/javascript" src="boxes.js"></script>
		<script type="text/javascript" src="guidemaker.js"></script>
		<script type="text/javascript" src="usermanagement.js"></script>
		<link rel="icon" type="image/png" href="../media/termstilelogo.png" />
		<?php
		if (isset($_COOKIE['email'])) {
			$con = mysql_connect("127.0.0.1", "root", "");
			if (!$con) {
				die('Could not connect:' . mysql_error());
			}
			mysql_select_db('autostudy', $con);
			$email = $_COOKIE['email'];
			$passhash = $_COOKIE['passhash'];
			$getUsers = mysql_query("SELECT * FROM users WHERE Email = '$email'");
			if (mysql_num_rows($getUsers) != 0) {
				while ($info = mysql_fetch_array($getUsers)) {
					if ($passhash == $info['PassHash']) {
						echo "<style type='text/css'>
#signedout{
display: none;
}
#signedin {
}</style>";
					}
				}

			}

		} else {
			echo "<style type='text/css'>
#signedout{
}
#signedin {
display: none;
}</style>";
		}
		?>
	</head>
	<body onLoad="initializePage()">
		<!--<div class="bigthing">-->
		<div class="header" id="headerContainer">
			<div class="container">
				<div id="title">
					<img src="../media/samplelogo.png"style="display: inline; float: left;" height="80px" width="200px"/>
				</div>
				<!-- Login Start-->
				<div id="container1" style="float: right;" >
					<div id="signedout" class="topnav">
						<span><a href="login" id="login" class="signin">Login</a><a href="signup" id="signup" class="signin">Sign Up</a></span>
					</div>
					<div id="signedin" class="topnav">
						<span><a href="index.php" id="home" class="signin">Home</a><a href="mydocuments.php" id="mydocs" class="signin">My Documents</a><a onclick="logOut()" id="logout" class="signin">Logout</a></span>
					</div>
					<!-- Login form -->
					<div class="signin_menu">
						<label for="liEmail">Email</label>
						<input id="liEmail" name="email" placeholder="Email" title="Email" tabindex="4" type="text">
						</br>
						<p>
							<label for="liPassword">Password</label>
							<input id="liPassword" name="password" placeholder="Password" title="password" tabindex="5" type="password">
						</p>
						<button id="loginButton" onClick="logIn()">
							Log in!
						</button>
					</div>
					<!-- Login form end-->
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
						<button id="signupButton" onClick="signUp()">
							Sign up!
						</button>
					</div>
					<!-- Sign Up form End -->
				</div>
				<!-- Login End -->
			</div>
		</div>
		<!-- Main Section Begin -->
		<div class="main container" id="mainContainer">
			<div style="width:200px; margin:0px auto; text-align:center">
				<button id="multipleTermSlider" onClick="slideDownMultiSearch()">
					multiple term search
				</button>
			</div>
			<div class="singlesearch">
				<input type="text" name="oneTerm" id="oneTerm" alt="Input a single term" placeholder="Input a term!" onKeyPress="enterPressed(event)"/>
				<button onClick="createBox()" id="summarize">
					Summarize!
				</button>
			</div>
			<div id="boxArea">
				<div id="box0" class="box">
					<strong>AutoStudy Instructions:</strong> insert a term in the box above then either click go or hit enter to get a short summary. If "Generating text..." appears for too long, try a new search. Also, checkout the Generate Guide tab to create some cool study guides.
					<br />
					<br />
					<strong>AutoStudy is still in alpha--we just started working on it this week. So expect some bugs.</strong>
					Thank you and enjoy!
				</div>
			</div>
			<div id="createButtons">
				<div id="createGuide">
					<button id="createGuideButton" onClick="saveAsGuide()">
						Create Study Guide
					</button>
				</div>
				<div id="createCards">
					<button id="createCardsButton" onClick="saveAsCards()">
						Create Flash Cards
					</button>
				</div>
			</div>
			<div class="multiplesearch" style="display:none;">
				<div id="guideInput">
					<center>
						<input id="guideTitle"  type="text" placeholder="enter study guide title"/>
						<textarea id="manyTerm" rows="43" cols="60" placeholder="Input list!" value=""> </textarea>
						<button onClick="createGuide()" id="createGuide">
							Create Study Guide!
						</button>
					</center>
				</div>
				<div id="guideInstructions" style="float:left">
					<h2>Instructions</h2>
					<ol>
						<li>
							Enter a title.
						</li>
						<li>
							Enter in your terms. Put each term on a new line or seperate with commas.
						</li>
						<li>
							Click "Create Guide"
						</li>
						<li>
							<strong>Enjoy!</strong>
						</li>
					</ol>
					<strong>Note: </strong> if your list does not appear it is because one of your terms is giving an error. You can check to see which term is giving an error under InstaSearch. We are working on getting this fixed.
				</div>
			</div>
			<div class="bottom container" id="bottomContainer">
				<a id="report">report</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="about">about us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="contactUs">contact us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="donate">donate</a>
			</div>
		</div>
		<!--</div>-->
		<div id="reportPopup" class="popup">
			<center>
				<h1>what's wrong!?</h1>
				<p>
					Do you have a problem? Please tell us about it and we will work on fixing it!
				</p>
				<textarea rows="15" cols="30" placeholder="Enter problem here."/>
				</textarea>
				<br />
				<button>
					Submit
				</button>
				<h2>Thanks!</h2>
			</center>
			<a class="popupClose">X</a>
		</div>
		<div id="aboutPopup" class="popup">
			<h1>about us</h1>
			<p>
				We are three MIT freshman who made this site for 6.470, a web development competition.
			</p>
			<p>
				<strong>Victor Pontis</strong> Victor is from San Diego and can do a triple backflip.
			</p>
			<p>
				<strong>Ryan Lau</strong> Ryan is from Hawaii and surfs every day, even at MIT!
			</p>
			<p>
				<strong>Akash Badshah</strong> Akash is from Seattle and is Sean White's new big competitor.
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="contactUsPopup" class="popup">
			<h1>contact us</h1>
			<center>
				<p>
					The best way to contact us would be by email.
				</p>
				<p>
					<strong><a href="mailto:vpontis@mit.edu">Victor Pontis</a></strong>
				</p>
				<p>
					<strong><a href="mailto:akashbad@mit.edu">Akash Badshah</a></strong>
				</p>
				<p>
					<strong><a href="mailto:rlau@mit.edu">Ryan Lau</a></strong>
				</p>
				<a class="popupClose">X</a>
			</center>
		</div>
		<div id="donatePopup" class="popup">
			<h1>donate</h1>
			<p>
				We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="guidePopup" class="popup">
			<!--<h1 id="guidePopupTitle">Your Study Guide</h1>-->
			<div id="guidePopupTitleArea">
				<input id="guidePopupTitle" onFocus="addSaveButton()" type="text" placeholder="Your Study Guide Title"/>
				<img width="30px" height="30px" src="../media/save.png" id="guidePopupTitleSave" onClick="changeSaveTitle()"/>
			</div>
			<div id="guideMaterial">
				Guide Information
			</div>
			<a class="popupClose">X</a>
		</div>
		<div id="noteCardPopup" class="popup">
			<h1 id="noteCardPopupTitle">Your NoteCards</h1>
			<div id="noteCardMaterial">
			</div>
			<a class="popupClose">X</a>
		</div>
		<div id="signupPopup" class="popup">
			<h1>donate</h1>
			<p>
				We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="loginPopup" class="popup">
			<h1>donate</h1>
			<p>
				We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="backgroundPopup"></div>
	</body>
</html>