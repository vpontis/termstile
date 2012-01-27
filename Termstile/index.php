<html>
	<head>
		<title>Termstile: terms in, definitions out</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
		<script type="text/javascript" src="tabswitch.js"></script>
		<script type="text/javascript" src="badrank.js"></script>
		<script type="text/javascript" src="boxes.js"></script>
		<script type="text/javascript" src="guidemaker.js"></script>
		<script type="text/javascript" src="usermanagement.js"></script>
		<link rel="icon" type="image/png" href="../media/favicon.ico" />
		<?php
		if (isset($_COOKIE['email'])) {
			include 'dbconnect.php';
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
							
		} 
		else {
			echo "<style type='text/css'>
			#signedout{}
			#signedin {display: none;}</style>";
		}
		?>
	</head>
	<body onLoad="initializePage()">
		<!--<div class="bigthing">-->
		<div class="header" id="headerContainer">
			<div class="container">
				<div id="title">
					<a href="index.php"><img src="../media/termstile.png" id="logo"/></a><!--<h1 style="color: white; display: inline; float: left; padding: 20px 0px 0px;">Termstile</h1>-->
				</div>
				<!-- Login Start-->
				<div id="container1" style="float: right;" >
					<div id="signedout" class="topnav">
						<span><a id="login" class="signin" onClick="toggleLogIn()">Login</a><a href="signup" id="signup" class="signin">Sign Up</a></span>
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
							<input id="liPassword" name="password" placeholder="Password" title="password" tabindex="5" type="password" onKeyPress="enterLogIn(event)">
						</p>
						<button id="loginButton" onClick="logIn()">
							Log in!
						</button>
					</div>
					<!-- Login form end-->
					<!-- Sign Up form -->
					
				</div>
				<!-- Login End -->
			</div>
		</div>
		<!-- Main Section Begin -->
		<div class="main container" id="mainContainer">
				<!--<div id="toggleInstaMultiButton" onClick="toggleInstaMulti()">
					MultiSearch
				</div>-->
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
							<div id="questionMark" ><img src="../media/info.png" width="30px" height="30px" onMouseOver="showInstructions()" onMouseOut="hideInstructions()"/></div>
							<div id="dropDownBar" onClick="toggleShowMultiSearch()"><img src="../media/down.png"/ width="20px" height="20px"></div>
							<div id = "multiSearchButtons" >
								<div class="button createGuideButton" style="float:left;" onClick="createGuide()"><img src="../media/guide.png"/ width="20px" height="20px"> Study Guide!</div>
								<div class="button createCardsButton" onClick="createCards()"><img src="../media/card.png"/ width="20px" height="15px"> Note Cards!</div>
							</div>
						</div>
					</div>
					<div style="display: inline; float: right;">
						<div class="button hideForMulti" onClick="createBox()" id="summarize">
						<img src="../media/search.png">
						</div>
					</div>
				</div>
				<div class="hideForMulti" id="boxArea">
					<div id="box0" class="box">
						<strong>TermStile Instructions:</strong> type a term in the box above then hit enter to get a short summary. Also, you can click the down arrow to get a large textbox where you can enter multiple terms at once (read: copy paste).
						<br />
						<br />
						<strong>TermStile is still in alpha, tread carefully.</strong> Thank you and enjoy!
						<br />
						<br />
						Disclaimer: any bugs or errors found on this website are for the <strong>greater good</strong>.
					</div>
				</div>
				<div class="hideForMulti" id="createButtons">
					<div id="createGuide">
						<div class="button createGuideButton" id="createGuideButton" style="float:left;" onClick="saveAsGuide()">
							<img src="../media/guide.png"/ width="20px" height="20px"> Study Guide
						</div>
					</div>
					<div id="createCards">
						<div class="button createCardsButton" id="createCardsButton" onClick="saveAsCards()">
							<img src="../media/card.png"/ width="20px" height="15px"> Flash Cards
						</div>
					</div>
				</div>
			</div>
			<div id="multipleSearch" style="display:none;">
				<div id="guideInput">
					<!--<input id="guideTitle"  type="text" placeholder="enter study guide title"/>-->
					<div style="position:relative; height:365px;">
						
						<textarea id="manyTerm" rows="43" cols="60" placeholder="Enter your list of terms here." ></textarea>
					</div>
				</div>
				
			</div>
			<div class="bottom container" id="bottomContainer">
				<a id="report">report</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="about">about us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="contactUs">contact us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="donate">donate</a>
			</div>
		</div>
		<div id="reportPopup" class="popup">
			<center>
				<h1>what's wrong!?</h1>
				<p>
					Do you have a problem? Please tell us about it and we will work on fixing it!
				</p>
				<textarea rows="15" cols="30" placeholder="Enter problem here."/></textarea>
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
					<strong>Victor Pontis</strong> <a href="mailto:vpontis@mit.edu">vpontis@mit.edu</a>
				</p>
				<p>
					<strong>Akash Badshah</strong> <a href="mailto:akashbad@mit.edu">akashbad@mit.edu</a>
				</p>
				<p>
					<strong>Ryan Lau</strong> <a href="mailto:rlau@mit.edu">rlau@mit.edu</a>
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
			<div id="guidePopupTitleArea" class="guidePopupTitleArea">
				<input id="guidePopupTitle" class="guidePopupTitle" onFocus="addSaveButton()" onFocusOut="removeSaveButton()" type="text" placeholder="Enter Title Here To Save"/>
				<img width="30px" height="30px" src="../media/save.png" class="guidePopupTitleSave" onClick="saveGuideTitle()"/>
			</div>
			<div id="guideMaterial">
				Guide Information
			</div>
			<a class="popupClose"><img src="closebutton.png" /></a>
		</div>
		<div id="noteCardPopup" class="popup">
			<div id="cardsPopupTitleArea" class="guidePopupTitleArea">
				<input id="cardsPopupTitle" class="guidePopupTitle" onFocus="addSaveButton()" type="text" placeholder="Enter Title Here To Save"/>
				<img width="30px" height="30px" src="../media/save.png" class="guidePopupTitleSave" onClick="saveGuideTitle()"/>

			</div>
			<div id="noteCardMaterial">
			</div>
			<a class="popupClose"><img src="closebutton.png" /></a>
		</div>
		<div id="signupPopup" class="popup">
			<h1>Sign Up!</h1>
			<div style="width:400px; text-align:center; margin: 0px auto;">
				<label for="suEmail">Email</label>
				<input id="suEmail" name="email" placeholder="Email" title="email" tabindex="9" type="text">
				<label for="suPassword">Password</label>
				<input id="suPassword" name="password" placeholder="Password" title="password" tabindex="10" type="password">
				<label for="suAltPassword">Repeat Password</label>
				<input id="suAltPassword" onKeyPress="enterSignUp(event)" name="password" placeholder="Repeat Password" title="password" tabindex="10" type="password">
			</div>
			<div style="width:80px;margin:0px auto;"><button style="text-align:center;width:80px;margin:0px auto;"id="signupButton" onClick="signUp()">
				Sign up!
			</button></div>
				<!-- Sign Up form End -->
			<a class="popupClose">X</a>
		</div>
		<div id="loginPopup" class="popup">
			<h1>donate</h1>
			<p>
				We don't have anything set up for donations right now. But if you want to donate to the site, please contact us! :)
			</p>
			<a class="popupClose">X</a>
		</div>
		<div id="backgroundPopup" onClick="hideLogIn()"></div>
	</body>
</html>