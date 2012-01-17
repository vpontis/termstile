divNum = 0; //keep track of how many new elements created
function createBox() {
	//divNum += 1;
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('searchBar')
	newDiv.setAttribute('id', divIdName);
	newDiv.innerHTML = searchBar.value + " Element Number "+divNum+ " has been added! <a href=\'#\' onclick=\'removeElement("+divIdName+")\'>x</a>";
	if(divNum == 0){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
		
		//boxArea.insertBefore(newDiv,boxArea.firstChild);
		//var oldDiv = document.getElementById('box' + idnum-1);
		
		$(newDiv).insertBefore(boxArea.firstChild)
			.css('display','none');
	}
	$(newDiv).slideDown('slow')
		.fadeTo(1000,1);
	divNum += 1;
}
function removeElement(id)	{
	//boxArea.removeChild(id);
	$(id).animate({opacity:0.0});
	$(id).slideUp('slow');
}	

