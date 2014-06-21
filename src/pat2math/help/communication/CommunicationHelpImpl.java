package pat2math.help.communication;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Hashtable;
import java.util.List;
import br.com.pat2math.studentModel.Tip;

public class CommunicationHelpImpl implements CommunicationHelp {
	private List<Tip> helps;
	public CommunicationHelpImpl(List<Tip> helps) {
		this.helps = helps;
	}
	
	public List<Tip> select(String op, int lvl) {
		List<Tip> helps = new ArrayList<Tip>();
		for(Tip help : this.helps) {
			if(help.getOperation().equals(op) && help.getLevel() == lvl) {
				helps.add(help);
			}
		}
		return helps;
	}
	
	public Hashtable<String,Integer> getMaxLvlOfHints() {
		List <Tip> result=new ArrayList<Tip>(helps);
		Collections.sort(result, new Comparator<Tip>() {
			
			@Override
			// comparo j com i pois a lista tem que ser ordenada ao contrario
			public int compare(Tip o1, Tip o2) {
				Integer i=o1.getLevel();
				Integer j=o2.getLevel();
				return j.compareTo(i);
			}
		});
		Hashtable<String, Integer> h=new Hashtable<String, Integer>();
		for (Object item:result){
			Tip it=(Tip)item;
			if (!h.containsKey(it.getOperation())){
				h.put(it.getOperation(), it.getLevel());
			}
		}
		return h;
	}
	public String getContentRelatedToHint(String tipo) {
		List<Tip> helps = new ArrayList<Tip>();
		for(Tip help : this.helps) {
			if(help.getOperation().equals(tipo)) {
				helps.add(help);
			}
		}
		
		if (helps.isEmpty()) return "";
		
		String h = (String) helps.get(0).getContent();
		return h.trim();
		
	}
	
	/*public List<modeloAluno.pojo.Mensagem> getErrorMessage() {
		return new ArrayList<modeloAluno.pojo.Mensagem>();
	}*/
	
}
