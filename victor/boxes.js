divNum = 1; //keep track of how many new elements created
function createBox() {
	var boxArea = document.getElementById('boxArea');
	var newDiv = document.createElement('div');
	var divIdName = 'box' + divNum;
	var searchBar = document.getElementById('searchBar')
	newDiv.setAttribute('id', divIdName);
	newDiv.innerHTML = searchBar.value + " Element Number "+divNum+ " has been added! <a href=\'#\' id=\"close\" onclick=\'removeElement("+divIdName+")\'>x</a> <a href=\'http:\\en.wikipedia.org/wiki/" + searchBar.value + "\'><img src=\'../media/wikifavicon.png\' alt=\'W\' style=\'display:inline;height:15px;width:15px;vertical-align:-2px;\' \\></a>";
	if(boxArea.firstChild == null){
		$(newDiv).css('display','none');
		boxArea.appendChild(newDiv);
	} else {
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

function enterPressed(e)	{
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) {
		createBox();
		searchBarValue = searchBar.val;
		 $("#searchBar").val(""); 	
	}
}

function addSaveButton()	{
	var saveButton = document.getElementById('saveButton');
	$(saveButton).css('display','inline')
}
