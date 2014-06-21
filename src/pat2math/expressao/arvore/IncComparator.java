package pat2math.expressao.arvore;


import java.util.Comparator;


/**
 * Comparador de incgnitas, no qual
 * a menor incógina tem potencia 1 e a maior "n"
 * @author Hernique M. Seffrin
 *
 */
public class IncComparator implements Comparator<BTNode>{

	@Override
	public int compare(BTNode o1, BTNode o2) {
		String v1=o1.getValue();
		String v2=o2.getValue();
		int inc1;
		int inc2;
		int pot1,pot2;
		if (o1.getPai()!=null && o1.getPai().getValue().equals("^")){
			 pot1=Integer.parseInt(o1.getPai().getDir().getValue());
			if (o2.getPai()!=null && o2.getPai().getValue().equals("^")){
				pot2=Integer.parseInt(o2.getPai().getDir().getValue());
				if(pot1!=pot2)return pot1-pot2;
			}else return pot1-1;
		}else{
			if (o2.getPai()!=null &&o2.getPai().getValue().equals("^")){
				pot2=Integer.parseInt(o2.getPai().getDir().getValue());
				return 1-pot2;
			}
		}
		if (v1.length()==1)inc1=1;
		else if (v1.startsWith("-")&& v1.length()==2)inc1=-1;
		else inc1=Integer.parseInt(v1.substring(0,v1.length()-1));
		if (v2.length()==1)inc2=1;
		else if (v2.startsWith("-")&& v2.length()==2)inc2=-1;
		else inc2=Integer.parseInt(v2.substring(0,v2.length()-1));
		
		return inc1-inc2;
	}
}
