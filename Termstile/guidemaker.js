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
				var guideTitle = document.getElementById('guideTitle');
				var title = guideTitle.value;
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
	disablePopup();
	var titleBar = document.getElementById('titleMaker');
	var title = titleBar.value;
	var terms = sessionTerms;
	var termsList = "";
	for(var i=0; i<terms.length; i++){
		termsList+=terms[i]+"|";
	}
	var summaries = sessionSummaries;
	$.post("saveguide.php", {title:title, terms:termsList}, function(data){
		console.log(data);
	})
	makeDoc(title, terms, summaries);
}

function makeDoc(title,terms, summaries){
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
