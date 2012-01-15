$(document).ready(function(){
	$("button").click(function(){
		$.getJSON("http://en.wikipedia.org//w/api.php?action=query&prop=revisions&format=json&rvprop=content&rvlimit=1&redirects&indexpageids&titles="+$('#name').val()+"&callback=?",
		function(data){
			console.log(data);
			var id = data.query.pageids[0];
			var text = data.query.pages[id].revisions[0]['*'];
			var patt = new RegExp("<ref[\s\S*?>[\s\S]*?</ref>|<[\s\S]*?>|{{[^{]*?}}","im");
			while(patt.test(text))
			{
				text = text.replace(patt,"");
			}
			var beginning = text.substring(0,text.indexOf("=="));
			var sentenceSplitter = /\s+(?=[\.\!\?]|[\'\"][\.\!\?])(?!\.rM|\.srM|\.sM|\.rJ|\.rD|\.forP|\.rS|\.[A-Z]\s)/gm;
			var sentences = beginning.split("").reverse().join("").split(sentenceSplitter);
			var map = new Array();
			for(var i=0; i<sentences.length; i++){
				sentences[i] = sentences[i].split("").reverse().join("");
			}
			sentences = sentences.reverse();
			for(var i=0; i<sentences.length; i++)
			{
				map[sentences[i].replace(/\[\[[^\[]*?\||\[\[|\]\]/gim,"")] = rankSentences(sentences[i],text);
			}
			var count = 0;
			var answer = "";
			var bestRanks = new Array(0,0,0);
			var bestSentences = new Array("","","");
			for(var key in map){
				if(map[key]>bestRanks[2]){
					if(map[key]>bestRanks[1]){
						if(map[key]>bestRanks[0]){
							bestSentences[2] = bestSentences[1];
							bestRanks[2] = bestRanks[1];
							bestSentences[1] = bestSentences[0];
							bestRanks[1] = bestRanks[0];
							bestSentences[0] = key;
							bestRanks[0] = map[key];
						}
						else{
							bestSentences[2] = bestSentences[1];
							bestRanks[2] = bestRanks[1];
							bestSentences[1] = key;
							bestRanks[1] = map[key];
						}
					}
					else{
						bestSentences[2] = key;
						bestRanks[2] = map[key];
					}
				}
			}
			answer = bestSentences[0]+" "+bestSentences[1]+" "+bestSentences[2];					
			$('#wiki').html(answer);
		});	
	});
});

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
		return rank/Math.sqrt(linkWords.length);
	}
	else return rank;
}