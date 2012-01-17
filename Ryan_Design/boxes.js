divNum = 0; //keep track of how many new elements created
function createBox() {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('oneTerm');
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class', 'box');
	if(divNum == 0){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	var text = "<div style=\"text-align:center\">Generating Text...<a href=\'#\' onclick=\'removeElement(\"+divIdName+\")\'>x</a></div>"
	$(newDiv).html(text);
	$(newDiv).slideDown('slow');
	divNum += 1;
	var summary = new Array(3);
	//answer = getText(searchBar.value, newDiv, divIdName);
	$.when(getText(searchBar.value))
		.then(function(){
			summary = getSummary();
			var answer = "<strong>"+summary[0]+"</strong> "+summary[1]+" "+summary[2]+" <a href=\'#\' onclick=\'removeElement("+divIdName+")\'>x</a>";
			$(newDiv).html(answer);
		});			
}
function removeElement(id)	{
	//boxArea.removeChild(id);
	$(id).animate({opacity:0.0});
	$(id).slideUp('slow');
}	
