divNum = 0; //keep track of how many new elements created
function createBox() {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('oneTerm')
	var text = getText(searchBar.value);
	newDiv.setAttribute('id', divIdName);
	newDiv.setAttribute('class', 'box');
	newDiv.innerHTML = text + " " + searchBar.value + " Element Number "+divNum+ " has been added! <a href=\'#\' onclick=\'removeElement("+divIdName+")\'>x</a>";
	if(divNum == 0){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	getText(searchBar.value, newDiv);
	$(newDiv).slideDown('slow');
	divNum += 1;
}
function removeElement(id)	{
	boxArea.removeChild(id);
}	

