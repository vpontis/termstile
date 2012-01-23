function createBox(id, title) {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = id;
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class', 'box');
	if(boxArea.firstChild == null){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	var text = "<div style=\"text-align:center\"><strong>"+title+"<button id='getGuideButton' onClick='getGuide("+id+", \""+title+"\")\'>Study Guide</button><button id='getCardsButton' onClick='getCards("+id+", \""+title+"\")\'>Note Cards</button></div>";
	
	$(newDiv).html(text);
	$(newDiv).slideDown('slow');
}

function getGuide(id,title){
	$.post("getguideterms.php",{id:id},function(data){
		var terms = data.split("|");
		terms.pop();
		var summaries = new Array(terms.length);
		var left = terms.length;
		$.each(terms, function(index, value){
			getText(terms[index],function(summary){
				summaries[index]=summary[0]+" "+summary[1]+" "+summary[2];
				console.log(summaries[index]);
				if(--left==0){
					makeDoc(title,terms, summaries);
				}
			});
		});
	});
}

function getCards(id,title){
	$.post("getguideterms.php",{id:id},function(data){
		var terms = data.split("|");
		terms.pop();
		var summaries = new Array(terms.length);
		var left = terms.length;
		$.each(terms, function(index, value){
			getText(terms[index],function(summary){
				summaries[index]=summary[0]+" "+summary[1]+" "+summary[2];
				console.log(summaries[index]);
				if(--left==0){
					makeCards(title,terms,summaries);
				}
			});
		});
	});
}
function removeElement(divIdName, idNum)	{
	sessionTerms.splice(idNum-1,1,"");
	sessionSummaries.splice(idNum-1,1,"");
	$(divIdName).animate({opacity:0.0});
	$(divIdName).slideUp('slow');	
}	

function enterPressed(e)	{
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
		createBox();
	}
}

function initializePage(email)	{
	var windowHeight = document.documentElement.clientHeight;  
	var headerHeight = $('#headerContainer').height();
	//var bottomHeight = $('#bottomConatiner').height();
	var mainHeight = windowHeight - headerHeight;
	$("#mainContainer").height(mainHeight);
	$.post("getguideids.php",function(data){
		var guideIds = data.split("|");
		guideIds.pop();
		var left = guideIds.length;
		$.each(guideIds, function(index, value){
			$.post("getguidetitles.php",{id:value},function(data){
				createBox(value, data);
				if(--left==0){
					var boxArea = document.getElementById('boxArea');
					var sorted = $('#boxArea>div').toArray().sort( function(a,b) {
						 return a.id - b.id ;
					});
					$(boxArea).html("");
					$.each(sorted, function(index, value){
						if(boxArea.firstChild == null){
							boxArea.appendChild(value);
						} 
						else {
							$(value).insertBefore(boxArea.firstChild);
						}
					});		
					console.log(sorted);
				}
			});
		});
	});
}

var popupOpen = "";
var popupStatus = 0;

$(document).ready(function(){
	$('#report').click(function(){
		popupOpen = "#reportPopup";
		centerPopup('#reportPopup');
		loadPopup('#reportPopup');
	});
	$('#about').click(function(){
		popupOpen = "#aboutPopup";
		centerPopup('#aboutPopup');
		loadPopup('#aboutPopup');
	});
	$('#contactUs').click(function(){
		popupOpen = "#contactUsPopup";
		centerPopup('#contactUsPopup');
		loadPopup('#contactUsPopup');
	});
	$('#donate').click(function(){
		popupOpen = "#donatePopup";
		centerPopup('#donatePopup');
		loadPopup('#donatePopup');
	});
	$('#createGuideButton').click(function(){
		popupOpen = "#guideTitlePopup";
		centerPopup('#guideTitlePopup');
		loadPopup('#guideTitlePopup');
	});
	$('.popupClose').click(function(){
		disablePopup();
	});
	$('#backgroundPopup').click(function(){
		disablePopup();
	});
	
});

//If escape is pressed when popup is open, close popup
$(document).keypress(function(e){  
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 27 && popupStatus == 1) {
		disablePopup();	
	}
});

function loadPopup(id)	{
	if(popupStatus==0){
		$('#backgroundPopup').css({'opacity':'.7'});
		$(id).fadeIn('slow');
		$('#backgroundPopup').fadeIn('slow');
		popupStatus=1;
	}
}

function disablePopup()	{
	if(popupStatus==1){
		$('#backgroundPopup').fadeOut('slow');
		$(popupOpen).fadeOut('slow');
		popupStatus=0;
	}
}

function centerPopup(id){
	var windowWidth = document.documentElement.clientWidth;  
	var windowHeight = document.documentElement.clientHeight;  
	var popupHeight = $(id).height();  
	var popupWidth = $(id).width();  
	$(id).css({"position": "absolute",  "top": windowHeight/2-popupHeight/2,  "left": windowWidth/2-popupWidth/2  });  
	$("#backgroundPopup").css({"height": windowHeight}); 
}   
