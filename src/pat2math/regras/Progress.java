package pat2math.regras;

/**
 * Interface que define uma forma de exibição do progresso no
 * cerregamento das regras, utilizado somente na versão <i>standalone</i> 
 * do resolvedor.
 * @author Henrique M. Seffrin
 *
 */
public interface Progress {

	/**
	 * Incremeta o progresso
	 */
	void addProgress();
	
	/**
	 * Altera o texto de exibição durante a carga do resolvedor
	 * @param text o novo texto a ser exibido
	 */
	void changeText(String text);
	
	/**
	 * Inicia o processo
	 */
	void start();
}
