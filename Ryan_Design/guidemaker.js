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
				makeDoc(terms, summaries);
			}
		});
	});
}

function makeDoc(terms, summaries){
	var guideText = "";
	for(var i=0; i<terms.length; i++){
		guideText += "<strong>"+terms[i]+"</strong>:"+summaries[i]+"<br /> <br />";
	}
	var guideTitle = document.getElementById('guideTitle');
	guideTitle = guideTitle.value;
	if(guideTitle != null){
		$('#guidePopupTitle').html(guideTitle);
	}
	//var gM = document.getElementById('guideMaterial');
	$('#guideMaterial').html(guideText);
	popupOpen = "#createGuidePopup";
	centerPopup('#createGuidePopup');
	loadPopup('#createGuidePopup');
}
