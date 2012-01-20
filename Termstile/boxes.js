divNum = 1; //keep track of how many new elements created
sessionTerms = [];
sessionSummaries =[];
function createBox() {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('oneTerm');
	var searchTerm = searchBar.value;
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class', 'box');
	newDiv.setAttribute('name',searchTerm);
	if(boxArea.firstChild == null){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	var text = "<div style=\"text-align:center\">Generating Text...  <a href=\'#\' onclick=\'removeElement("+divIdName+")\'>X</a></div>"
	$(newDiv).html(text);
	$(newDiv).slideDown('slow');
	divNum += 1;
	var summary = new Array(3);
	getText(searchTerm,function(summary){
		sessionTerms[divNum-2] = searchTerm;
		sessionSummaries[divNum-2] = summary[0]+" "+summary[1]+" "+summary[2];
		var answer = "<strong>"+summary[0]+"</strong> "+summary[1]+" "+summary[2];
		answer += " <a class=\'close\' onclick=\'removeElement("+divIdName+")\'>X</a>";
		answer += "<a class=\'wikifavicon\'  target=\'_blank\' href=\'http:\\\\en.wikipedia.org/wiki/" + searchTerm + "\'><img src=\'../media/wikifavicon.png\' alt=\'W\' \\></a>"
		$(newDiv).html(answer);
	});
	$("#oneTerm").val("");
}

function removeElement(id)	{
	//boxArea.removeChild(id);
	$(id).animate({opacity:0.0});
	$(id).slideUp('slow');
}	

function enterPressed(e)	{
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
		createBox();
	}
}

function focusCursor()	{
	document.getElementById('oneTerm').focus();
	var windowHeight = document.documentElement.clientHeight;  
	var headerHeight = $('#headerContainer').height();
	//var bottomHeight = $('#bottomConatiner').height();
	var mainHeight = windowHeight - headerHeight;
	$("#mainContainer").height(mainHeight);
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
	//$('#createGuide').click(function(){
		//popupOpen = "#createGuidePopup";
		//centerPopup('#createGuidePopup');
		//loadPopup('#createGuidePopup');
	//});
	$('#donate').click(function(){
		popupOpen = "#donatePopup";
		centerPopup('#donatePopup');
		loadPopup('#donatePopup');
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