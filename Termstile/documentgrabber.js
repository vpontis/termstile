function createBox(id, title) {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = id;
	var closeId = "close"+id;
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class','guideBox');
	newDiv.setAttribute('onmouseover','showDeleteButton(\''+closeId+'\')');
	newDiv.setAttribute('onmouseout','hideDeleteButton(\''+closeId+'\')');
	if(boxArea.firstChild == null){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	var text = "<div onMouseOver=\"showDeleteButton(\'" + closeId + "\')\"onMouseOut=\"hideDeleteButton(\'"+closeId+"\')\" ><strong>"+title+"<img src=\"../media/card.png\" id='getCardsButton' class=\"smallButton\" onClick='getCards("+id+", \""+title+"\")\' alt=\"Create Flash Cards\"/><img src=\"../media/guide.png\" alt=\"Create Study Guide\" id='getGuideButton' class=\"smallButton\" onClick='getGuide("+id+", \""+title+"\")\'/></div>";
	text += " <a class=\'close\' onClick=\'deleteGuide("+divIdName+")\'><img src=\'closebutton.png\' id=\'"+closeId+"\' style=\'display:none\'/></a>";
	$(newDiv).html(text);
	$(newDiv).slideDown('slow');
}

function showDeleteButton(closeid){
	document.getElementById(closeid).style.display = "inline";
	//var id = '#' + closeid;
	//$(id).fadeIn('fast');
}
function hideDeleteButton(closeid){
	document.getElementById(closeid).style.display = "none";
	//var id = '#' + closeid;
	//$(id).fadeOut('fast');
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
					var saveButton = document.getElementById("guideSaveButton");
					saveButton.setAttribute('onclick',"updateGuideTitle("+id+")");
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
					var saveButton = document.getElementById("cardSaveButton");
					saveButton.setAttribute('onclick',"updateGuideTitle("+id+")");
				}
			});
		});
	});
}
function deleteGuide(divIdName)	{
	$.post("deleteguide.php",{id:divIdName},function(data){
		
	})
	$('#'+divIdName).animate({opacity:0.0});
	$('#'+divIdName).slideUp('slow');	
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
	var mainHeight = windowHeight - headerHeight - 3;
	var bottomHeight = $('#bottomContainer').height();
	var boxAreaHeight = mainHeight- bottomHeight - 20;
	var noteCardTitleHeight = $('#cardsPopupTitleArea').height();
	var noteCardMaterialHeight = mainHeight - noteCardTitleHeight - 110;
	$('#boxArea').css('max-height',boxAreaHeight);
	$("#mainContainer").height(mainHeight);
	$('.popup').css('max-height',mainHeight - 20);
	$('#noteCardMaterial').css('height', noteCardMaterialHeight);
	$.post("getguideids.php",function(data){
		var guideIds = data.split("|");
		guideIds.pop();
		guideIds = guideIds.slice(1);
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
