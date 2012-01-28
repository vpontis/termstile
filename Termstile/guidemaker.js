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
		if(terms[i]!=""
		&&summaries[i]!="We're sorry but we can't find "+terms[i]+". Wikipedia may not have an article for that term. Wikipedia is often very fickle about <strong>capitalizations</strong>. If you are unsure you can use our autocomplete for accuracy. Please check the spelling and try again."
		&&summaries[i]!="We found multiple possible terms for "+terms[i]+". You can try using our autocomplete to find what you're looking for. ")
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
		var guideTitle = document.getElementById('guidePopupTitle');
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
		if(terms[i]!=""
		&&summaries[i]!="We're sorry but we can't find "+terms[i]+". Wikipedia may not have an article for that term. Wikipedia is often very fickle about <strong>capitalizations</strong>. If you are unsure you can use our autocomplete for accuracy. Please check the spelling and try again."
		&&summaries[i]!="We found multiple possible terms for "+terms[i]+". You can try using our autocomplete to find what you're looking for. ")
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
	var cardsLeft = document.getElementById('cardsLeft');
	$(cardsLeft).html("");
	var cardsRight = document.getElementById('cardsRight');
	$(cardsRight).html("");
	currentCardTerms = terms;
	currentCardSummaries = summaries;
	for(var i=0; i<terms.length; i++){
		createCard(terms[i],summaries[i],i);
	}
	var guideTitleVal = title;
	if(guideTitleVal != null && guideTitleVal != ""){
		var cardsTitle = document.getElementById('cardsPopupTitle');
		cardsTitle.setAttribute("placeholder",guideTitleVal);
		$('.guidePopupTitle').text(guideTitleVal);
	}
	popupOpen = "#noteCardPopup";
	centerPopup('#noteCardPopup');
	loadPopup('#noteCardPopup');
}

cardCounter = 1;
function createCard(term, summary,index) {	
	var boxArea = document.getElementById('noteCardMaterial');
	var cardsLeft = document.getElementById('cardsLeft');
	var cardsRight = document.getElementById('cardsRight');
	var newDiv = document.createElement('div');
	var divIdName = 'card_' + term;
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class','card');
	newDiv.setAttribute("onclick","flipCard(\""+divIdName+"\", "+index+",0)\'");
	if(cardCounter%2==1){
		if(cardsLeft.firstChild == null){
			cardsLeft.appendChild(newDiv);
		} else {
			$(newDiv).insertBefore(cardsLeft.firstChild);
		}
		cardCounter +=1;
	}
	else{
		if(cardsRight.firstChild == null){
			cardsRight.appendChild(newDiv);
		} else {
			$(newDiv).insertBefore(cardsRight.firstChild);
		}
		cardCounter +=1;
	}

	var text = "<div style=\"text-align:center\" onClick=\'flipCard(\""+divIdName+"\", "+index+",0)\'><strong><a onClick=\'flipCard(\""+divIdName+"\", "+index+",0)\'><h2>"+term+"</h2></a></strong></div>";
	$(newDiv).html(text);
	//$(newDiv).slideDown('slow');
}

function flipCard(cardId,index,state){
	var card = document.getElementById(cardId);	
	if(state==0){
		var text = "<div style=\"text-align:center\" onClick=\'flipCard(\""+cardId+"\", \""+index+"\", 1)\'><a onClick=\'flipCard(\""+cardId+"\", \""+index+"\", 1)\'>"+currentCardSummaries[index]+"</a></strong></div>";
	}
	else{
		var text = "<div style=\"text-align:center\" onClick=\'flipCard(\""+cardId+"\", \""+index+"\", 0)\'><strong><a onClick=\'flipCard(\""+cardId+"\", \""+index+"\", 0)\'><h2>"+currentCardTerms[index]+"</h2></a></strong></div>";
	}
	$(card).html(text);
}

function addSaveButton(){
	$('.guidePopupTitleSave').fadeIn('slow');
}

function removeSaveButton(){
	$('.guidePopupTitleSave').fadeOut('slow');
}

//does saveguidetitle() if enter is clicked
function enterSaveGuideTitle(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
		saveGuideTitle();
		document.getElementById('cardsPopupTitle').blur();
		document.getElementById('guidePopupTitle').blur();

	}
}

function saveGuideTitle(){
	titleName = document.getElementById('cardsPopupTitle');
	if(titleName.value!= null && titleName.value != ""){
		saveTitle = titleName.value;
		$.post("saveguide.php", {title:saveTitle, terms:saveTermsList}, function(data){	
		});
		document.getElementById('cardsPopupTitle').setAttribute('placeholder',saveTitle);
		document.getElementById('guidePopupTitle').setAttribute('placeholder',saveTitle);
		removeSaveButton();
	}
	else{
		titleName = document.getElementById('guidePopupTitle');
		if(titleName.value != null && titleName.value !=""){
			saveTitle = titleName.value;
			$.post("saveguide.php", {title:saveTitle, terms:saveTermsList}, function(data){
			});	
			document.getElementById('cardsPopupTitle').setAttribute('placeholder',saveTitle);
			document.getElementById('guidePopupTitle').setAttribute('placeholder',saveTitle);
			removeSaveButton();
		}
	}
}

function updateGuideTitle(id){
	titleName = document.getElementById('cardsPopupTitle');
	if(titleName.value!= null && titleName.value != ""){
		thisTitle = titleName.value;
		$.post("changeguidetitle.php", {title:thisTitle, id:id}, function(data){	
		});
		var closeId = "close"+id;
		var text = "<div onMouseOver=\"showDeleteButton(\'" + closeId + "\')\" onMouseOut=\"hideDeleteButton(\'"+closeId+"\')\" ><strong>"+thisTitle+"<button id='getGuideButton' onClick='getGuide("+id+", \""+thisTitle+"\")\'>Study Guide</button><button id='getCardsButton' onClick='getCards("+id+", \""+thisTitle+"\")\'>Note Cards</button></div>";
		text += " <a class=\'close\' onClick=\'deleteGuide("+id+")\'><img src=\'closebutton.png\' id=\'"+closeId+"\' style=\'display:none\'/></a>";
		$('#'+id).html(text);
		document.getElementById('cardsPopupTitle').setAttribute('placeholder',saveTitle);
		document.getElementById('guidePopupTitle').setAttribute('placeholder',saveTitle);
		removeSaveButton();
	}
	else{
		titleName = document.getElementById('guidePopupTitle');
		if(titleName.value != null && titleName.value !=""){
			thisTitle = titleName.value;
			$.post("changeguidetitle.php", {title:thisTitle, id:id}, function(data){	
			});	
			var closeId = "close"+id;
			var text = "<div onMouseOver=\"showDeleteButton(\'" + closeId + "\')\" onMouseOut=\"hideDeleteButton(\'"+closeId+"\')\" ><strong>"+thisTitle+"<button id='getGuideButton' onClick='getGuide("+id+", \""+thisTitle+"\")\'>Study Guide</button><button id='getCardsButton' onClick='getCards("+id+", \""+thisTitle+"\")\'>Note Cards</button></div>";
			text += " <a class=\'close\' onClick=\'deleteGuide("+id+")\'><img src=\'closebutton.png\' id=\'"+closeId+"\' style=\'display:none\'/></a>";
			$('#'+id).html(text);
			document.getElementById('cardsPopupTitle').setAttribute('placeholder',saveTitle);
			document.getElementById('guidePopupTitle').setAttribute('placeholder',saveTitle);
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
