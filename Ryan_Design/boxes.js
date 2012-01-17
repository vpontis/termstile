divNum = 0; //keep track of how many new elements created
function createBox() {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('oneTerm');
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class', 'box');
	if(boxArea.firstChild == null){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	var text = "<div style=\"text-align:center\">Generating Text...<a href=\'#\' onclick=\'removeElement("+divIdName+")\'>x</a></div>"
	$(newDiv).html(text);
	$(newDiv).slideDown('slow');
	divNum += 1;
	var summary = new Array(3);
	getText(searchBar.value,function(summary){
		var answer = "<strong>"+summary[0]+"</strong> "+summary[1]+" "+summary[2];
		answer += " <a class=\'close\' href=\'#\' onclick=\'removeElement("+divIdName+")\'>x</a>";
		answer += "<a class=\'wikifavicon\' href=\'http:\\en.wikipedia.org/wiki/" + searchBarValue + "\'><img src=\'../media/wikifavicon.png\' alt=\'W\' \\></a>"
		$(newDiv).html(answer);
	})
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
		searchBarValue = oneTerm.value;
		 $("#oneTerm").val(""); 	
	}
}

function focusCursor()	{
	document.getElementById('oneTerm').focus();
}
