<html>
	<head>
		<title>AutoStudy: get Wikipedia summaries</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js"></script>
		<script type="text/javascript" src="tabswitch.js"></script>
		<script type="text/javascript" src="badrank.js"></script>
		<script type="text/javascript" src="boxes.js"></script>
		<script type="text/javascript" src="guidemaker.js"></script>
		<script type="text/javascript" src="usermanagement.js"></script>
	</head>
	<body onLoad="focusCursor()">
		<div class="bigthing">
			<div class="header">
				<div class="container">
					<div id="title">
						<img src="../media/samplelogo.png"style="display: inline; float: left;" height="80px" width="200px"/>
					</div>
					<!-- Login Start-->
					<div id="container1" style="float: right;">
						<div id="signedout" class="topnav" >
							<span><a href="login" id="login" class="signin">Login</a><a href="signup" id="signup" class="signin">Sign Up</a></span>
						</div>
						<div id="signedin" class="topnav">
							<span><a href="index.php" id="home" class="signin">Home</a><a href="mydocuments.php" id="mydocs" class="signin">My Documents</a><a href="logout" id="logout" class="signin">Logout</a></span>
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
								<button id="loginButton" onClick="logIn()">Log in!</button>
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
								<button id="signupButton" onClick="signUp()">Sign up!</button>
						</div>
						<!-- Sign Up form End -->
					</div>
					<!-- Login End -->
				</div>
			</div>
			<!-- Tab Bar -->
			<div class="midbar">
				<div class="container">
					<div id="singleTerm" class="tab selected">
						<img src="../media/instasearch.png" width="150px" height="30px" alt="Instasearch" />
					</div>
					<div id="multipleTerm" class="tab">
						<img src="../media/generateguide.png" width="200px" height="30px" alt="Generate Guide" />
					</div>
				</div>
			</div>
			<!-- Tab Bar end-->
			<!-- Main Section Begin -->
			<div class="main container">
				<div class="singlesearch">
					<input type="text" name="oneTerm" id="oneTerm" alt="Input a single term" placeholder="Input a term!" onKeyPress="enterPressed(event)"/>
					<button class="submit" onClick="createBox()" id="summarize">
						Summarize!
					</button>
					<div id="boxArea" style="float: left;">
						<div id="box0" class="box">
							<strong>AutoStudy Instructions:</strong> insert a term in the box above then either click go or hit enter to get a short summary. If "Generating text..." appears for too long, try a new search. Also, checkout the Generate Guide tab to create some cool study guides.
							<br /><br />
							<strong>AutoStudy is still in alpha--we just started working on it this week. So expect some bugs.</strong>
							Thank you and enjoy!
						</div>
					</div>
				</div>
				<div class="multiplesearch">
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
								<li>Enter a title.</li>
								<li>Enter in your terms. Put each term on a new line or seperate with commas. </li>
								<li>Click "Create Guide"</li>
								<li><strong>Enjoy!</strong></li>
							</ol>
							<strong>Note: </strong> if your list does not appear it is because one of your terms is giving an error. You can check to see which term is giving an error under InstaSearch. We are working on getting this fixed. 
						</div>

					<div id="guideBox" style="display:none"></div>
				</div>
				<div class="bottom container">
					<a id="report">report</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="about">about us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="contactUs">contact us</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="donate">donate</a>
				</div>
			</div>
		</div>
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
    <div id="createGuidePopup" class="popup">
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