package pat2math.help;

import java.util.Comparator;
import java.util.List;

import pat2math.help.data.Content;
import pat2math.util.Funcoes;
import br.com.pat2math.studentModel.Knowledge;

public class HintsComparator implements Comparator<Content>{
	
	private List<Knowledge> knowledges;

	public HintsComparator(List<Knowledge> knowledges){
		this.knowledges=knowledges;
	}
	
	public int compare(Content o1, Content o2) {
		String content1= o1.getContent().trim();
		String content2= o2.getContent().trim();
		Knowledge c1 = Funcoes.find(knowledges, new Knowledge(0,content1));
		Knowledge c2 = Funcoes.find(knowledges, new Knowledge(0,content2));
		if (c1.getPercentage()<c2.getPercentage())return -1;
		else if ((c1.getPercentage()>c2.getPercentage()))return 1;
		/*se conteudo igual retornar como "menor", ou seja -1, 
		aquele que mais se aproximar do próximo nivel da operação
		*/  
		else if (c1==c2)return -1;
		else return 0;
	}

	
	

}
