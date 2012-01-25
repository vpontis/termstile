function createGuide() {
	var guideArea = document.getElementById('guideArea');
	var manyTerm = document.getElementById('manyTerm');
	var input = manyTerm.value;
	var terms = input.split(/\n|,\s/gm);
	var summaries = new Array(terms.length);
	var left = terms.length;
	$.each(terms, function(index, value){
		getText(terms[index],function(summary){
			summaries[index]=summary[0]+" "+summary[1]+" "+summary[2];
			console.log(summaries[index]);
			if(--left==0){
				var date = new Date();
				var title = date.toString();
				var termsList = "";
				for(var i=0; i<terms.length; i++){
					termsList+=terms[i]+"|";
				}
				$.post("saveguide.php", {title:title, terms:termsList}, function(data){
				})
				makeDoc(title,terms, summaries);
			}
		});
	});
}

var currentGuide = 0;

function saveAsGuide(){
	var date = new Date();
	var title = date.toString();
	var terms = sessionTerms;
	var termsList = "";
	var summaries = sessionSummaries;
	var cleanTerms = new Array(0);
	var cleanSummaries = new Array(0);
	for(var i=0; i<terms.length; i++){
		if(terms[i]!="")
		{
			termsList+=terms[i]+"|";
			cleanTerms.push(terms[i]);
			cleanSummaries.push(summaries[i]);
		}
	}
	$.post("saveguide.php", {title:title, terms:termsList}, function(data){
		makeDoc(title, cleanTerms, cleanSummaries, data);
	})
	
}

function makeDoc(title,terms,summaries,id){
	var guideText = "";
	for(var i=0; i<terms.length; i++){
		guideText += "<strong>"+terms[i]+"</strong>:"+summaries[i]+"<br /> <br />";
	}
	var guideTitleVal = title;
	if(guideTitleVal != null && guideTitleVal != ""){
		$('#guidePopupTitle').html(guideTitleVal);
	}
	currentGuide = id;
	$('#guideMaterial').html(guideText);
	popupOpen = "#guidePopup";
	centerPopup('#guidePopup');
	loadPopup('#guidePopup');
}

function saveAsCards(){
	var date = new Date();
	var title = date.toString();
	var terms = sessionTerms;
	var termsList = "";
	var summaries = sessionSummaries;
	var cleanTerms = new Array(0);
	var cleanSummaries = new Array(0);
	for(var i=0; i<terms.length; i++){
		if(terms[i]!="")
		{
			termsList+=terms[i]+"|";
			cleanTerms.push(terms[i]);
			cleanSummaries.push(summaries[i]);
		}
	}
	$.post("saveguide.php", {title:title, terms:termsList}, function(data){
		makeCards(title, cleanTerms, cleanSummaries,data);
	})
	
}


var currentCardTerms;
var currentCardSummaries;

function makeCards(title,terms,summaries,id){
	var boxArea = document.getElementById('noteCardMaterial');
	$(boxArea).html("");
	currentCardTerms = terms;
	currentCardSummaries = summaries;
	for(var i=0; i<terms.length; i++){
		createCard(terms[i],summaries[i],i);
	}
	currentGuide = id;
	var cardsTitleVal = title;
	if(cardsTitleVal != null && cardsTitleVal != ""){
		$('#noteCardPopupTitle').html(cardsTitleVal);
	}
	popupOpen = "#noteCardPopup";
	centerPopup('#noteCardPopup');
	loadPopup('#noteCardPopup');
}


function createCard(term, summary,index) {
	var boxArea = document.getElementById('noteCardMaterial');
	var newDiv = document.createElement('div');
	var divIdName = 'card_' + term;
	newDiv.setAttribute('id', divIdName);
	if(boxArea.firstChild == null){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	var text = "<div style=\"text-align:center\"><strong><a onClick=\'flipCard(\""+divIdName+"\", "+index+",0)\'>"+term+"</a></strong></div>";
	$(newDiv).html(text);
	$(newDiv).slideDown('slow');
}

function flipCard(cardId,index,state){
	var card = document.getElementById(cardId);	
	if(state==0){
		var text = "<div style=\"text-align:center\"><a onClick=\'flipCard(\""+cardId+"\", \""+index+"\", 1)\'>"+currentCardSummaries[index]+"</a></strong></div>";
	}
	else{
		var text = "<div style=\"text-align:center\"><a onClick=\'flipCard(\""+cardId+"\", \""+index+"\", 0)\'>"+currentCardTerms[index]+"</a></strong></div>";
	}
	$(card).html(text);
}



function addSaveButton(){
	$('.guidePopupTitleSave').fadeIn('slow');
}

function removeSaveButton(){
	$('.guidePopupTitleSave').fadeOut('slow');
}

guideTitle = "";
function saveGuideTitle(){
	var titleName = "";
	id = currentGuide;
	titleName = document.getElementById('cardsPopupTitle');
	if(titleName.value!= null && titleName.value != ""){
		guideTitle = titleName.value;
		$.post("changeguidetitle.php",{id:id,title:guideTitle},function(data){
			console.log(data);
		});
		$('.guidePopupTitle').text(guideTitle);
		removeSaveButton();
	}
	else{
		titleName = document.getElementById('guidePopupTitle');
		if(titleName.value != null && titleName.value !=""){
			guideTitle = titleName.value;
			$.post("changeguidetitle.php",{id:id,title:guideTitle},function(data){
				console.log(data);
			});	
			$('.guidePopupTitle').text(guideTitle);
			removeSaveButton();
		}
	}
}

function showInstructions(){
	$('#guideInstructions').show();
}
function hideInstructions(){
	$('#guideInstructions').hide();
}
