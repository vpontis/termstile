import java.io.*;
import java.text.BreakIterator;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.regex.*;


public class AutoQuiz {

	static String path = "C:/Users/AKASH/Documents/autoquiztest.txt";
	static String pathFull = "C:/Users/AKASH/Documents/autoquizfull.txt";
	static BufferedReader bufRead;
	static String sCurrentLine;
	static String ourFile = "";
	static String fullFile = "";
	
	public static void main(String[] args) {
		try {
			bufRead = new BufferedReader(new FileReader(path));
			while ((sCurrentLine = bufRead.readLine()) != null)
			{
				ourFile+= sCurrentLine+"\n";
			}
			bufRead = new BufferedReader(new FileReader(pathFull));
			while ((sCurrentLine = bufRead.readLine()) != null)
			{
				fullFile+= sCurrentLine+"\n";
			}
			String[] splitFile1 = ourFile.split(";s:\\d*?:\"");
			String cleaner = splitFile1[splitFile1.length-1];
			String[] splitFile2 = cleaner.split("\n\\}\\}\n");
			String trimmed = splitFile2[splitFile2.length-1];
			trimmed = Pattern.compile("<ref.*?>.*?</ref>|<.*?>|\\{\\{.*?\\}\\}",Pattern.DOTALL).matcher(trimmed).replaceAll("");
			trimmed = trimmed.replace(";}}}}}}", "");
			BreakIterator sentenceIterator = BreakIterator.getSentenceInstance();
			TreeMap<String, Integer> map = extractSentences(trimmed, sentenceIterator, fullFile);
		    int sentenceCounter = 0;
		    for (String key : map.keySet()) {
		        System.out.println(key);
		        sentenceCounter++;
		        if(sentenceCounter>2)break;		        
		    }
		} 

		catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
	}
	

	static TreeMap<String, Integer> extractSentences(String target, BreakIterator wordIterator, String fullText) {

		    Map<String, Integer> sentences = new HashMap<String, Integer>(); 
		
			wordIterator.setText(target);
		    int start = wordIterator.first();
		    int end = wordIterator.next();

		    while (end != BreakIterator.DONE) {
		        String word = target.substring(start,end);
		        int rank = rankSentence(word, fullText);
		        word = Pattern.compile("\\[\\[|\\]\\]").matcher(word).replaceAll("");
		        sentences.put(word, rank);
		        start = end;
		        end = wordIterator.next();
		    }
		    
		    ValueComparator bvc =  new ValueComparator(sentences);
		    TreeMap<String,Integer> sorted_map = new TreeMap(bvc);
		    sorted_map.putAll(sentences);
		    
		    return sorted_map;
		}
	
	static int rankSentence(String sentence, String document)
	{
		Pattern p = Pattern.compile("\\[\\[.*?\\]\\]", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(sentence);
		int count = 0;
		int rank = 0;
		while (m.find()) count++;
		String[] linkWords = new String[count];
		int start = sentence.indexOf("[[")+2;
		int end = sentence.indexOf("]]");
		for(int i=0; i<count; i++)
		{
			linkWords[i] = sentence.substring(start, end);
			linkWords[i] = Pattern.compile(".*?\\|",Pattern.DOTALL).matcher(linkWords[i]).replaceAll("");
			start = sentence.indexOf("[[", start)+2;
			end = sentence.indexOf("]]", end+2);
			p = Pattern.compile(linkWords[i], Pattern.CASE_INSENSITIVE | Pattern.DOTALL);
			m = p.matcher(document);
			while (m.find()) rank++;
		}
		return rank;
	}
}