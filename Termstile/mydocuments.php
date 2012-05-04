<html>
	<head>
		<title>Termstile: My documents</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js"></script>
		<script type="text/javascript" src="tabswitch.js"></script>
		<script type="text/javascript" src="badrank.js"></script>
		<script type="text/javascript" src="documentgrabber.js"></script>
		<script type="text/javascript" src="guidemaker.js"></script>
		<script type="text/javascript" src="usermanagement.js"></script>
		<link rel="icon" type="image/png" href="../media/favicon.ico" />
		<?php
			if(isset($_COOKIE['email'])){
				include 'dbconnect.php';
				$email =  $_COOKIE['email'];
				$passhash = $_COOKIE['passhash'];
				$getUsers = mysql_query("SELECT * FROM `Users` WHERE Email = '$email'");
				if(mysql_num_rows($getUsers)!=0){
					while($info = mysql_fetch_array($getUsers)){
						if($passhash == $info['PassHash']){
							echo "<style type='text/css'>	
						#signedin {
						}</style>";
						}
					}		
		  
				}
					
			}
			else{
				header('Location:index.php');
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
	<body onLoad="initializePage('<?php echo $_COOKIE['email']?>')">
		<!--<div class="bigthing">-->
			<div class="header" id="headerContainer">
				<div class="container">
					<div id="title">
						<a href="index.php"><img src="../media/termstile.png" id="logo"/></a></a><!--<h1 style="color: white; display: inline; float: left; padding: 20px 0px 0px;">Termstile</h1>-->
					</div>
					<!-- Login Start-->
					<div id="container1" style="float: right;">
						<div id="signedin" class="topnav floats_r">
							<span><a href="index.php" id="home" class="signin">Home</a><a href="mydocuments.php" id="mydocs" class="signin">My Documents</a><a onclick="logOut()" id="logout" class="signin">Logout</a></span>
						</div>
					</div>
					<!-- Login End -->
				</div>
			</div>
			<!-- Main Section Begin -->
			<div class="main container" id="mainContainer">
				<div class="singlesearch">
				</div>
				<div id="boxArea">
				</div>
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
			<div id="guidePopupTitleArea" class="guidePopupTitleArea">
				<input id="guidePopupTitle" class="guidePopupTitle" onFocus="addSaveButton()" onFocusOut="removeSaveButton()" type="text" placeholder="Enter Title Here To Save"/>
				<img id="guideSaveButton" width="30px" height="30px" src="../media/save.png" class="guidePopupTitleSave"/>
			</div>
			<div id="guideMaterial">
				Guide Information
			</div>
			<a class="popupClose"><img src="closebutton.png" /></a>
		</div>
	<div id="noteCardPopup" class="popup">
		<div id="cardsPopupTitleArea" class="guidePopupTitleArea">
			<input id="cardsPopupTitle" class="guidePopupTitle" onFocus="addSaveButton()" type="text" placeholder="Enter Title Here To Save"/>
			<img id="cardSaveButton" width="30px" height="30px" src="../media/save.png" class="guidePopupTitleSave"/>
		</div>
		<div id="noteCardMaterial">
				<div id="cardsLeft" class="cardsSection">
				</div>
				<div id="cardsRight" class="cardsSection">	
				</div>
		</div>
		<a class="popupClose"><img src="closebutton.png" /></a>
	</div>
	<div id="backgroundPopup"></div>  
	</body>
</html>