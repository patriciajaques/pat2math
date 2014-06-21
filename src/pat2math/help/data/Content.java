package pat2math.help.data;

/**
 * Classe que implemeta esta interface, contém um atributo que armazena qual conteudo
 * da matematica o objeto está relacionado.
 * @author Henrique M. Seffrin
 *
 */
public interface Content {

	public Long getID();
	public String getContent();
	public String getTipo();
	public Integer getNivel();
}
