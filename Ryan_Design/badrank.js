function getText(title, callback){
	return $.getJSON("http://en.wikipedia.org//w/api.php?action=query&prop=revisions&format=json&rvprop=content&rvlimit=1&redirects&indexpageids&titles="+title+"&callback=?",
	function(data){
		var id = data.query.pageids[0];
		var text = data.query.pages[id].revisions[0]['*'];
		var patt1 = /{{[^{]*?}}/im;
		var patt2 = /<ref[\s\S]*?<\/ref>/im;
		var patt3 = /<[\s\S]*?>/im;
		var patt4 = /^\[\[.*?$/gim;
		while(patt1.test(text))
		{
			text = text.replace(patt1,"");
		}
		while(patt2.test(text))
		{
			text = text.replace(patt2,"");
		}
		while(patt3.test(text))
		{
			text = text.replace(patt3,"");
		}
		text = text.replace(patt4,"");
		var beginning = text.substring(0,text.indexOf("=="));
		var sentenceSplitter = /\s+(?=[\.\!\?]|[\'\"][\.\!\?])(?!\.rM|\.srM|\.sM|\.rJ|\.rD|\.forP|\.rS|\.[A-Z]\s)/gm;
		var sentences = beginning.split("").reverse().join("").split(sentenceSplitter);
		var map = new Array(sentences.length);
		sentences = sentences.reverse();
		for(var i=0; i<sentences.length; i++)
		{
			sentences[i]=sentences[i].split("").reverse().join("");
			map[i]= new Array(2);
			map[i][0] = sentences[i].replace(/\[\[[^\[]*?\||\[\[|\]\]/gim,"");
			map[i][1] = rankSentences(sentences[i],text);
		}
		var answer = new Array(3);
		var bestRanked = new Array(3);
		for(var i=0; i<bestRanked.length; i++){
			bestRanked[i]= new Array(0,0,0);
		}
		for(var i=0; i<map.length; i++){
			if(map[i][1]>bestRanked[2][1]){
				if(map[i][1]>bestRanked[1][1]){
					if(map[i][1]>bestRanked[0][1]){
						for(var j=0; j<3; j++){bestRanked[2][j] = bestRanked[1][j];}
						for(var j=0; j<3; j++){bestRanked[1][j] = bestRanked[0][j];}
						bestRanked[0][0] = map[i][0];
						bestRanked[0][1] = map[i][1];
						bestRanked[0][2] = i;
					}
					else{
						for(var j=0; j<3; j++){bestRanked[2][j] = bestRanked[1][j];}
						bestRanked[1][0] = map[i][0];
						bestRanked[1][1] = map[i][1];
						bestRanked[1][2] = i;
					}
				}
				else{
					bestRanked[2][0] = map[i][0];
					bestRanked[2][1] = map[i][1];
					bestRanked[2][2] = i;
				}
			}
		}
		var temp = new Array(3);
		if(bestRanked[0][2]>bestRanked[2][2]){
			for(var j=0; j<3; j++){temp[j] = bestRanked[0][j];}
			for(var j=0; j<3; j++){bestRanked[0][j] = bestRanked[2][j];}
			for(var j=0; j<3; j++){bestRanked[2][j] = temp[j];}
		}
		if(bestRanked[1][2]>bestRanked[2][2]){
			for(var j=0; j<3; j++){temp[j] = bestRanked[1][j];}
			for(var j=0; j<3; j++){bestRanked[1][j] = bestRanked[2][j];}
			for(var j=0; j<3; j++){bestRanked[2][j] = temp[j];}
		}
		if(bestRanked[0][2]>bestRanked[1][2]){
			for(var j=0; j<3; j++){temp[j] = bestRanked[0][j];}
			for(var j=0; j<3; j++){bestRanked[0][j] = bestRanked[1][j];}
			for(var j=0; j<3; j++){bestRanked[1][j] = temp[j];}
		}
		for(var i=0; i<3; i++)
		{
			answer[i] = bestRanked[i][0];
		}
		callback(answer);
	});	
}

function rankSentences(sentence, text){
	var pattern = /\[\[.*?\]\]/gim;
	var rank = 0;
	var linkWords = sentence.match(pattern);
	if(linkWords!=null){
		for(var i=0; i<linkWords.length; i++){
			linkWords[i] = linkWords[i].replace(/\[\[[^\[]*?\||\[\[|\]\]/gim,"");
			var patt = new RegExp(linkWords[i],"gi");
			rank+= text.match(patt).length;
		}
	}
	return rank;
}
