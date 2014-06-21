package pat2math.expressao.arvore;

import java.util.Comparator;

/**
 * Comparador de {@link BTNode}, no qual o parâmetro de comparação é o valor
 * do nodo
 * @author Henrque M. Seffrin
 * @version 1.0, 04/03/2011
 *
 */
public class BTNodeComparator implements Comparator<BTNode>{

	@Override
	public int compare(BTNode o1, BTNode o2) {
		if (o1.igual(o2))return 0;
		else return o1.getValue().compareTo(o2.getValue());
	}

}
