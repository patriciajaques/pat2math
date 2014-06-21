package pat2math.help.communication;

import java.util.List;

import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.Tip;

/**
 * Prove comunicacao com o Modelo de Aluno, o perfil do mesmo.
 * @author Henrique M. Seffrin
 *
 */
public interface CommunicationMA {

	
	/**
	 * Insere um novo aluno na base de dados.
	 * @param a um objeto do tipo {@link Aluno} contendo todos os dados do aluno
	 */
	//public void insert(Aluno a);
	
	/**
	 * Busca um aluno na base de dados.
	 * @param chaveBusca o nome do aluno
	 * @return um objeto contendo os dados do aluno
	 */
	//public Aluno select(String chaveBusca);
	
	/**
	 * Busca um aluno pelo seu login
	 * @param login o nome de login do aluno
	 * @return um objeto do tipo aluno
	 */
	//public Aluno selectLogin(String login);
	
	/**
	 * Atualiza a base de dados com os dados do aluno
	 * @param al um objeto Aluno com os dados a serem atualizados
	 * @return <code>true</code> se ouve atualizacao na base de dados e 
	 * <code>false</code> caso contrario.
	 */
	public boolean update (Student al);
	
	/**
	 * Atualiza o perfil do aluno com a ultima ação do aluno
	 * @param login o id do aluno
	 * @param a o objeto contendo a descrição da ação realizada pelo aluno
	 * @return <code>true</code> se a base foi atualizada e <code>false</code> caso contrario.
	 */
	//public boolean updateAcoes(String login, Acoes a);
	
	/**
	 * Atualiza no banco de dados uma trava especifica
	 * @return <code>true</code> se foi atualizada e <code>false</code> caso
	 * contrario.
	 */
	public boolean update();
	
	/**
	 * Obtem um objeto {@link Travas} do banco de dados.
	 * @param aluno o Aluno que possui este trava.
	 * @param operacao a operação relacionada a trava, vito que cada operação terá uma trava própria
	 * @return um objeto do tipo {@link Travas} que contem o tempo restante para liberar
	 * as dicas relacionadas a esta operação.
	 */
	// public Travas getTrava(String aluno, String operacao);
	
	/**
	 * Obtem da lista de ajudas requisitadas do aluno um requistro
	 * contendo as informações da ajuda requisitada.
	 * @param idAjudaRequisitada o id, da tabela Ajuda, da ajuda requisitada, não
	 * o id da tabela AjudasAluno, mas sim da tabela Ajudas
	 * @param nomeAluno o nome do aluno ao qual pertence este registro
	 * @return um objeto AjudasAluno contendo as informações das ajuda requisitada.
	 */
	public List<Tip> getAjudaRequisitada(String nomeAluno);
}
