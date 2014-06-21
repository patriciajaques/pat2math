package pat2math.help.communication;

import java.util.Hashtable;
import java.util.List;

import br.com.pat2math.studentModel.Tip;

/**
 * Provê comunicacao com a base de dados que contêm os textos de ajuda.
 * @author Henrique M. Seffrin
 *
 */

public interface CommunicationHelp {
	public List<Tip> select(String op, int lvl );
	public Hashtable<String,Integer> getMaxLvlOfHints();
	public String getContentRelatedToHint(String tipo);
	// public List<Mensagem> getErrorMessage();
	
}
