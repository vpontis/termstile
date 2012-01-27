var saveTitle = "";
var saveTermsList = "";

function createGuide() {
	var guideArea = document.getElementById('guideArea');
	var manyTerm = document.getElementById('multiSearchBox');
	var input = manyTerm.value;
	var terms = input.split(/\n|,\s/gm);
	var summaries = new Array(terms.length);
	var left = terms.length;
	$.each(terms, function(index, value){
		getText(terms[index],function(summary){
			summaries[index]=summary[0]+" "+summary[1]+" "+summary[2];
			console.log(summaries[index]);
			if(--left==0){
				var termsList = "";
				for(var i=0; i<terms.length; i++){
					termsList+=terms[i]+"|";
				}
				saveTermsList = termsList;
				makeDoc(saveTitle,terms, summaries);	
			}
		});
	});
}

function createCards() {
	var guideArea = document.getElementById('guideArea');
	var manyTerm = document.getElementById('multiSearchBox');
	var input = manyTerm.value;
	var terms = input.split(/\n|,\s/gm);
	var summaries = new Array(terms.length);
	var left = terms.length;
	$.each(terms, function(index, value){
		getText(terms[index],function(summary){
			summaries[index]=summary[0]+" "+summary[1]+" "+summary[2];
			console.log(summaries[index]);
			if(--left==0){
				var termsList = "";
				for(var i=0; i<terms.length; i++){
					termsList+=terms[i]+"|";
				}
				saveTermsList = termsList;
				makeCards(saveTitle,terms, summaries);		
			}
		});
	});
}


function saveAsGuide(){
	var terms = sessionTerms;
	var termsList = "";
	var summaries = sessionSummaries;
	var cleanTerms = new Array(0);
	var cleanSummaries = new Array(0);
	for(var i=0; i<terms.length; i++){
		if(terms[i]!=""&&summaries[i]!="We're sorry but we can't find "+terms[i]+". Wikipedia may not have an article for that term. Wikipedia is often very fickle about <strong>capitalizations</strong>. If you are unsure you can use our autocomplete for accuracy. Please check the spelling and try again.")
		{
			termsList+=terms[i]+"|";
			cleanTerms.push(terms[i]);
			cleanSummaries.push(summaries[i]);
		}
	}
	saveTermsList = termsList;
	makeDoc(saveTitle, cleanTerms, cleanSummaries);
	
}

function makeDoc(title,terms,summaries){
	var guideText = "";
	for(var i=0; i<terms.length; i++){
		guideText += "<strong>"+terms[i]+"</strong>:"+summaries[i]+"<br /> <br />";
	}
	var guideTitleVal = title;
	if(guideTitleVal != null && guideTitleVal != ""){
		var guideTitle = document.getElementById('cardsPopupTitle');
		guideTitle.setAttribute("placeholder",guideTitleVal);
	}
	$('#guideMaterial').html(guideText);
	popupOpen = "#guidePopup";
	centerPopup('#guidePopup');
	loadPopup('#guidePopup');
}

function saveAsCards(){
	var terms = sessionTerms;
	var termsList = "";
	var summaries = sessionSummaries;
	var cleanTerms = new Array(0);
	var cleanSummaries = new Array(0);
	for(var i=0; i<terms.length; i++){
		if(terms[i]!=""&&summaries[i]!="We're sorry but we can't find "+terms[i]+". Wikipedia may not have an article for that term. Wikipedia is often very fickle about <strong>capitalizations</strong>. If you are unsure you can use our autocomplete for accuracy. Please check the spelling and try again.")
		{
			termsList+=terms[i]+"|";
			cleanTerms.push(terms[i]);
			cleanSummaries.push(summaries[i]);
		}
	}
	saveTermsList = termsList;
	makeCards(saveTitle, cleanTerms, cleanSummaries);
	
}


var currentCardTerms;
var currentCardSummaries;

function makeCards(title,terms,summaries){
	var boxArea = document.getElementById('noteCardMaterial');
	$(boxArea).html("");
	currentCardTerms = terms;
	currentCardSummaries = summaries;
	for(var i=0; i<terms.length; i++){
		createCard(terms[i],summaries[i],i);
	}
	var guideTitleVal = title;
	if(guideTitleVal != null && guideTitleVal != ""){
		var cardsTitle = document.getElementById('guidePopupTitle');
		cardsTitle.setAttribute("placeholder",guideTitleVal);
		$('.guidePopupTitle').text(guideTitleVal);
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
	newDiv.setAttribute('class', 'card');
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

function saveGuideTitle(){
	titleName = document.getElementById('cardsPopupTitle');
	if(titleName.value!= null && titleName.value != ""){
		saveTitle = titleName.value;
		$.post("saveguide.php", {title:saveTitle, terms:saveTermsList}, function(data){
					
		});
		removeSaveButton();
	}
	else{
		titleName = document.getElementById('guidePopupTitle');
		if(titleName.value != null && titleName.value !=""){
			saveTitle = titleName.value;
			$.post("saveguide.php", {title:saveTitle, terms:saveTermsList}, function(data){
					
			});	
			removeSaveButton();
		}
	}
}

function showInstructions(){
	$('#guideInstructions').fadeIn('fast');
}
function hideInstructions(){
	$('#guideInstructions').fadeOut('fast');
}
