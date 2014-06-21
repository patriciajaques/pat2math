package pat2math.resolvedor;

/**
 * Objeto par armazenar os três tipos de equações na lista
 * <ol>
 * <li>Equação com todos os parenteses (utilizada para evitar loops)</li>
 * <li>Equação limpa</li>
 * <li>Equação em TeX</li>
 * </ol>
 * @author Henrique M. Seffrin
 *
 */
public class Equacoes {

	private String fullEquation;
	private String cleanEquation;
	private String teXEquation;
	
	public Equacoes(String full, String clean, String teX){
		fullEquation=full;
		cleanEquation=clean;
		teXEquation=teX;
	}
	
	/**
	 * Utilizado quando não for armazenar uma equação mas
	 * outros dados como a descrição de uma regra ou a solução de uma
	 * equação.
	 * @param notEquation o texto a ser inserido
	 */
	public Equacoes(String notEquation){
		fullEquation=cleanEquation=teXEquation=notEquation;
	}
	
	/**
	 * Obtêm a equação, no qual subequação possui parêntesis
	 * @return uma String contendo a equação
	 */
	public String getFullEquation() {
		return fullEquation;
	}
	
	/**
	 * Otêm a equação no formato que utiliza um número mínimo de parênteses
	 * @return uma String contendo a equação
	 */
	public String getCleanEquation() {
		return cleanEquation;
	}
	
	/**
	 * Obtêm a equação no formato TeX
	 * @return uma String contendo a equação
	 */
	public String getTeXEquation() {
		return teXEquation;
	}
	
	/**
	 * Utilizada quando o valor armazenado não é uma equação, se for
	 * retorna o mesmo que getFullEquation()
	 * @return uma String contendo a equação
	 * @see #getFullEquation()
	 */
	public String getNotEquation(){
		return fullEquation;
	}
	
	public boolean equals(Object obj) {
		if (obj instanceof Equacoes){
			Equacoes outro=(Equacoes)obj;
			return this.getFullEquation().equals(outro.getFullEquation());
		}
		return false;
	}
	
	public String toString() {
		return fullEquation;
	}
}
