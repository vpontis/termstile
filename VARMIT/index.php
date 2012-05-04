<html>
	<head>
		<title>Termstile: terms in, summaries out</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
		<script type="text/javascript" src="tabswitch.js"></script>
		<script type="text/javascript" src="badrank.js"></script>
		<script type="text/javascript" src="boxes.js"></script>
		<script type="text/javascript" src="guidemaker.js"></script>
		<script type="text/javascript" src="usermanagement.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Droid+Serif:400,700' rel='stylesheet' type='text/css'>
		<link rel="icon" type="image/png" href="media/favicon.ico" />
		<?php
		
		if (isset($_COOKIE['email'])) {
			include 'dbconnect.php';
			$email = $_COOKIE['email'];
			$passhash = $_COOKIE['passhash'];
			$getUsers = mysql_query("SELECT * FROM `Users` WHERE Email = '$email'");
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
							
		} 
		else {
			echo "<style type='text/css'>
			#signedout{}
			#signedin {display: none;}</style>";
		}
		?>
		
		<script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-31428487-1']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		
		</script>
	</head>
	<body onLoad="initializePage()">
		<!--<div class="bigthing">-->
		<div class="header" id="headerContainer">
			<div class="container">
				<div id="title">
					<a href="index.php"><img src="media/termstile.png" id="logo"/></a><!--<h1 style="color: white; display: inline; float: left; padding: 20px 0px 0px;">Termstile</h1>-->
				</div>
				<!-- Login Start-->
				<div id="container1" style="float: right;" >
					<div id="signedout" class="topnav">
						<span><a id="login" class="signin" onClick="toggleLogIn()">Log In</a><a href="signup" id="signup" class="signin">Sign Up</a></span>
					</div>
					<div id="signedin" class="topnav">
						<span><a href="index.php" id="home" class="signin">Home</a><a href="mydocuments.php" id="mydocs" class="signin">My Documents</a><a onclick="logOut()" id="logout" class="signin">Logout</a></span>
					</div>
					<!-- Login form -->
					<div class="signin_menu loginmenu" id="loginmenu">
						<label for="liEmail" class="loginmenu">Email</label>
						<input id="liEmail" class="loginmenu" name="email" placeholder="Email" title="Email" tabindex="4" type="text">
						</br>
						<p class="loginmenu">
							<label class="loginmenu" for="liPassword">Password</label>
							<input class="loginmenu" id="liPassword" name="password" placeholder="Password" title="password" tabindex="5" type="password" onKeyPress="enterLogIn(event)">
						</p>
						<button class="loginmenu" id="loginButton" onClick="logIn()">
							Log in!
						</button>
					</div>
					<!-- Login form end-->
				</div>
				<!-- Login End -->
			</div>
		</div>
		<!-- Main Section Begin -->
		<div class="main container" id="mainContainer">
			<div id="singleSearchArea">
				<div id="singleSearch">
					<div id="searchBarArea">
						<div style="position:relative">
							<textarea id="multiSearchBox"></textarea>
							<div style="display:none" id="guideInstructions">
								<h1>Easy as 1, 2, 3!</h1>
								<h2>Instructions</h2>
								<ol>
									<li>
										Enter in your terms. Put each term on a new line or seperate with commas.
									</li>
									<li>
										Click "Study Guide" or "Note Cards"
									</li>
									<li>
										Enjoy!
									</li>
								</ol>
							</div>
							<input type="textarea" name="oneTerm" id="oneTerm" alt="Input a single term" placeholder="Input a term!" onKeyPress="enterPressed(event)"/>	
							<div id="questionMark" ><img src="media/info.png" width="30px" height="30px" onMouseOver="showInstructions()" onMouseOut="hideInstructions()"/></div>
							<div id="dropDownBar" onClick="toggleShowMultiSearch()"><img src="media/down.png"/ width="20px" height="20px"></div>
							<div id = "multiSearchButtons" >
								<div class="button createGuideButton" style="float:left;" onClick="createGuide()"><img src="media/guide.png"/ width="20px" height="20px"> Study Guide!</div>
								<div class="button createCardsButton" onClick="createCards()"><img src="media/card.png"/ width="25px" height="25px"> Note Cards!</div>
							</div>
						</div>
					</div>
					<div style="display: inline; float: right;">
						<div class="button hideForMulti" onClick="createBox()" id="summarize">
						<img src="media/search.png">
						</div>
					</div>
				</div>
				<div class="hideForMulti" id="boxArea">
					<div id="box0" class="box">
						<strong id="headline">Termstile takes terms and generates summaries, automatically.</strong> 
						<br /> 
						<p>Enter a term in the box above to get a short summary</p>
						<p>Turn summaries into study guides or flash cards with the buttons below</p>
						<p>Click the down arrow to enter multiple terms at once</p>
						<p>Sign up and log in to save study guides and flash cards for later</p>
						<br />
						<strong>Termstile is still in alpha, tread carefully.</strong> Thank you and enjoy!
					</div>
				</div>
				<div class="hideForMulti" id="createButtons">
					<div id="createGuide">
						<div class="button createGuideButton" id="createGuideButton" style="float:left;" onClick="saveAsGuide()">
							<img src="media/guide.png"/ width="25px" height="25px"> Study Guide
						</div>
					</div>
					<div id="createCards">
						<div class="button createCardsButton" id="createCardsButton" onClick="saveAsCards()">
							<img src="media/card.png"/ width="25px" height="25px"> Flash Cards
						</div>
					</div>
				</div>
			</div>
			<div class="bottom container" id="bottomContainer">
				<a id="report">report</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="about">about us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="contactUs">contact us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="donate">donate</a>
			</div>
		</div>
		<div id="reportPopup" class="popup">
			<center>
				<h1>report a problem</h1>
				<p>
					Is there a problem? Please tell us about it and we will work on fixing it!
				</p>
				<textarea id="reportTextArea" rows="15" cols="30" placeholder="Enter problem here."/></textarea>
				<br />
				<button onclick="reportIssue()">
					Submit
				</button>
				<h2 id="thanks">Thanks!</h2>
			</center>
			<a class="popupClose">X</a>
		</div>
		<div id="aboutPopup" class="popup">
			<h1>about us</h1>
			<p>
				We are three MIT freshman who made this site for 6.470, a web development competition.
			</p>
			<p>
				<strong>Victor Pontis:</strong> Victor is from San Diego and can do a triple backflip.
			</p>
			<p>
				<strong>Ryan Lau:</strong> Ryan is from Hawaii and surfs every day, even at MIT!
			</p>
			<p>
				<strong>Akash Badshah:</strong> Akash is from Seattle and is Sean White's new big competitor.
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="contactUsPopup" class="popup">
			<h1>contact us</h1>
			<center>
				<p>
					The best way to contact us would be by email.
				</p>
				<table border="0">
					<tr>
						<td align="right"><strong>Akash Badshah</strong></td>
						<td><a href="mailto:akash@termstile.com">akash@termstile.com</a></td>
					</tr>
					<tr>
						<td align="right"><strong>Victor Pontis</strong></td>
						<td><a href="mailto:victor@termstile.com">victor@termstile.com</a></td>
					</tr>
					<tr>
						<td align="right"><strong>Ryan Lau</strong></td>
						<td><a href="mailto:ryan@termstile.com">ryan@termstile.com</a></td>
					</tr>
				</table>
				
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
			<div id="guidePopupTitleArea" class="guidePopupTitleArea">
				<input id="guidePopupTitle" class="guidePopupTitle" onKeyPress="enterSaveGuideTitle(event)" onFocus="addSaveButton()" onFocusOut="removeSaveButton()" type="text" placeholder="Enter Title Here To Save"/>
				<img width="30px" height="30px" src="media/save.png" class="guidePopupTitleSave" onClick="saveGuideTitle()"/>
			</div>
			<div id="guideMaterial">
				Guide Information
			</div>
			<a class="popupClose"><img src="media/closebutton.png" /></a>
		</div>
		<div id="noteCardPopup" class="popup" style="background-color: #FAF6EC">
			<div id="cardsPopupTitleArea" class="guidePopupTitleArea">
				<input id="cardsPopupTitle" class="guidePopupTitle" onKeyPress="enterSaveGuideTitle(event	)" onFocus="addSaveButton()" type="text" placeholder="Enter Title Here To Save"/>
				<img width="30px" height="30px" src="media/save.png" class="guidePopupTitleSave" onClick="saveGuideTitle()"/>

			</div>
			<div id="noteCardMaterial">
				<div id="cardsLeft" class="cardsSection"></div>
				<div id="cardsRight" class="cardsSection"></div>
			</div>
			<a class="popupClose"><img src="media/closebutton.png" /></a>
		</div>
		<div id="signupPopup" class="popup">
			<h1>Sign Up</h1>
			<h2>Save study guides and flash cards for later!</h2>
			<!--<h3>Save study guides and notecards for later</h3>-->
			<div>
				<div style="width:400px; text-align:center; margin: 0px auto;">
					<label for="suEmail">Email</label>
					<input id="suEmail" name="email" placeholder="Email" title="email" tabindex="9" type="text">
					<label for="suPassword">Password</label>
					<input id="suPassword" name="password" placeholder="Password" title="password" tabindex="10" type="password">
					<label for="suAltPassword">Repeat Password</label>
					<input id="suAltPassword" onKeyPress="enterSignUp(event)" name="password" placeholder="Repeat Password" title="password" tabindex="10" type="password">
				</div>
				<div style="width:80px;margin:0px auto;"><button style="text-align:center;width:80px;margin:0px auto;"id="signupButton" onClick="signUp()">
					Sign up!</button>
				</div>
			</div>

				<!-- Sign Up form End -->
			<a class="popupClose">X</a>
		</div>
		<div id="loginPopup" class="popup">
			<h1>Logging In</h1>
			<p>
				We are currently logging you in, please hold. :)
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="backgroundPopup" onClick="hideLogIn()"></div>
	</body>
</html>