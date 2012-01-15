divNum = 0; //keep track of how many new elements created
function createBox() {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('oneTerm')
	var text = getText(searchBar.value);
	newDiv.setAttribute('id', divIdName);
	newDiv.innerHTML = text + " " + searchBar.value + " Element Number "+divNum+ " has been added! <a href=\'#\' onclick=\'removeElement("+divIdName+")\'>x</a>";
	if(divNum == 0){
		boxArea.appendChild(newDiv);
	} else {
		
		//boxArea.insertBefore(newDiv,boxArea.firstChild);
		//var oldDiv = document.getElementById('box' + idnum-1);
		
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('opacity','0.0')
			.fadeTo(1000,1);
	}
	getText(searchBar.value, newDiv);
	divNum += 1;
}
function removeElement(id)	{
	boxArea.removeChild(id);
}	

