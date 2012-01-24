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
				//var guideTitle = document.getElementById('guideTitle');
				//var title = guideTitle.value;
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

function saveAsGuide(){
	//var titleBar = document.getElementById('titleMaker');
	var date = new Date();
	var title = date.toDateString();
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
		console.log(data);
	})
	makeDoc(title, cleanTerms, cleanSummaries);
}

function saveAsCards(){
	//var titleBar = document.getElementById('titleMaker');
	//var title = titleBar.value;
	var date = new Date();
	var title = date.toDateString();
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
		console.log(data);
	})
	makeCards(title, cleanTerms, cleanSummaries);
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
	newDiv.setAttribute('class', 'box');
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

function makeDoc(title,terms,summaries){
	var guideText = "";
	for(var i=0; i<terms.length; i++){
		guideText += "<strong>"+terms[i]+"</strong>:"+summaries[i]+"<br /> <br />";
	}
	var guideTitleVal = title;
	if(guideTitleVal != null && guideTitleVal != ""){
		$('#guidePopupTitle').html(guideTitleVal);
	}
	$('#guideMaterial').html(guideText);
	popupOpen = "#guidePopup";
	centerPopup('#guidePopup');
	loadPopup('#guidePopup');
}

function addSaveButton(){
	var saveButton = document.getElementById('guidePopupTitleSave');
	$(saveButton).fadeIn('slow');
}
