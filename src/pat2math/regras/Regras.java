package pat2math.regras;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Reader;
import java.util.Iterator;
import java.util.Vector;

import org.drools.Agenda;
import org.drools.FactHandle;
import org.drools.RuleBase;
import org.drools.RuleBaseFactory;
import org.drools.StatefulSession;
import org.drools.WorkingMemory;
import org.drools.base.SalienceInteger;
import org.drools.base.ShadowProxy;
import org.drools.common.DefaultFactHandle;
import org.drools.compiler.PackageBuilder;
import org.drools.event.AgendaEventListener;
import org.drools.event.WorkingMemoryEventListener;
import org.drools.rule.Package;
import org.drools.rule.Rule;
import org.drools.spi.Activation;

/**
 * Responsavel por carregar e compilar as regras. 
 * @author Henrique M. Seffrin
 * @version 1.0,12/12/2008
 *
 */
public class Regras {
	
	private StatefulSession session;
	
	/**
	 * Carrega as regras de <code>filename</code> (.drl) para o sistema
	 * @param filenames o arquivo com as regras
	 * @param salience <code>true</code> se for levar em conta a prioridade
	 * das regras e <code>false</code> caso contrário
	 * @throws Exception
	 */
	public Regras(String[] filenames, boolean salience, Progress p) throws Exception{
		Reader source;
		PackageBuilder builder= new PackageBuilder();
		if (p!=null)p.start();
		for (int i=0;i<filenames.length;i++){
			System.out.print("Carregando arquivo "+filenames[i]+"...");
			if (p!=null) p.changeText("Carregando arquivo "+filenames[i]+"...");
			source = new InputStreamReader( Regras.class.getResourceAsStream(filenames[i]),"UTF-8");
			System.out.println("Concluido");
			if (p!=null)p.addProgress();
        	//this will parse and compile in one step
			System.out.print("Compilando...");
			if (p!=null)p.changeText("Compilando...");
        	builder.addPackageFromDrl( source );
        	System.out.println("Concluido");
        	if (p!=null)p.addProgress();
        	// Check the builder for errors
        	System.out.print("Verificando erros...");
        	if (p!=null)p.changeText("Verificando erros...");
        	if ( builder.hasErrors() ) {
            	System.out.println( builder.getErrors().toString() );
            	throw new RuntimeException( "Unable to compile \""+filenames[i]+"\".");
        	}
        	System.out.println("Concluido");
        	if (p!=null)p.addProgress();
		}
        //get the compiled package (which is serializable)
        final Package pkg = builder.getPackage();
        //add the package to a rulebase (deploy the rule package).
        System.out.print("Carregando base de regras...");
        if (p!=null)p.changeText("Carregando base de regras...");
        final RuleBase ruleBase = RuleBaseFactory.newRuleBase();
        System.out.println("Concluido");
        if (p!=null)p.addProgress();
        if (!salience)clearSalience(pkg);
        ruleBase.addPackage( pkg );
        session = ruleBase.newStatefulSession();
	}
		
	public synchronized static Package loadRecources(String filename) throws ClassNotFoundException, FileNotFoundException, IOException{
		Package p=new Package();
		File f= new File(filename);
		p.readExternal(new ObjectInputStream(new FileInputStream(f)));
		return p;
	}
	
	public synchronized static Package loadRecourcesFromPackage(String path) throws ClassNotFoundException, IOException{
		Package p=new Package();
		p.readExternal(new ObjectInputStream(Regras.class.getResourceAsStream(path)));
		return p;
	}
	
	public synchronized static void saveRecources(String filename, Package p) throws FileNotFoundException, IOException {
		File f= new File (filename);
		ObjectOutputStream o=new ObjectOutputStream(new FileOutputStream(f));
		p.writeExternal(o);
	}
	
	public Regras (Package p) throws Exception{
		System.out.println("Carregando Pacote de Regras...");
		final RuleBase rulebase =RuleBaseFactory.newRuleBase();
		rulebase.addPackage(p);
		session = rulebase.newStatefulSession();
		System.out.println("Concluido");
	}
	/**
	 * Obtem o objeto <code>StatefulSession</code> 
	 * (Memoria de Trabalho) do Sistem Especialista
	 * @return um objeto do tipo <code>StatefulSession</code>
	 */
	public StatefulSession getSession(){
		return session;
	}
	
	/**
	 * Obtém a <code>Aganda</code> da execução
	 * @return um objeto <code>Agenda</code> contendo
	 *  as ativações das regras
	 */
	public Agenda getAgenda(){
		return session.getAgenda();
	}
	/**
	 * Insere um objeto na memória de Trabalho do Sistema
	 * Especialista
	 * @param obj o objeto a ser inserido
	 */
	public void inserir(Object obj){
		//clearWorkingMemory();
		session.insert(obj);
	}
	
	/**
	 * Executa as regras sobre o objeto inserido até 
	 * não haver mais regras para serem executadas
	 * sobre o objeto na memória de trabalho
	 */
	public void executar(){
		session.fireAllRules();
	}
	
	/**
	 * Executa as regras sobre o objeto na memória
	 * de trabalho até o numero de regras ser
	 * igual a limite ou não haver mais regras
	 * disponiveis
	 * @param limite o numero limite de regras a 
	 * serem executadas
	 */
	public void executar(int limite){
		session.fireAllRules(limite);
	}
	
	/**
	 * Remove um <code>fato</code> da <code>WorkingMemory</code>
	 * @param fato o fato a ser removido
	 */
	public void remover(FactHandle fato){
		session.retract(fato);
	}
	
	/**
	 * Zera a prioridade das regras
	 * @param p um <code>Package</code> contendo as regras
	 * compiladas
	 */
	private void clearSalience(Package p){
		Rule r[]=p.getRules();
		for (int i=0;i<r.length;i++){
			r[i].setSalience(new SalienceInteger(0));
		}
	}
	
	/**
	 * Retira o(s) objeto(s) resultante(s) da {@link WorkingMemory}
	 * @return uma lista do(s) objeto(s) presente(s) na {@link WorkingMemory}
	 */
	@SuppressWarnings("unchecked")
	public Vector<Object> getResult(){
		Iterator<DefaultFactHandle> itObj;
		DefaultFactHandle fato;
		ShadowProxy fatoSombra;
		Vector <Object> exp=new Vector<Object>();
		for (itObj=(Iterator<DefaultFactHandle>)session.iterateFactHandles(); itObj.hasNext(); ){
			fato=itObj.next();
			fatoSombra=(ShadowProxy) fato.getObject();
			exp.add(fatoSombra.getShadowedObject());
		}
		return exp;
	}
	
	/**
	 * Esvazia a memória de trabalho, removendo os fatos em memória e 
	 * os registros de avtivação da Agenda. <br>
	 * <b> Ao utlilzar este método, caso esteja utilizando um Agenda-Group que não
	 * seja o default (MAIN), deve-se redirecionar o foco a ele.<br>
	 * </b>Através do método {@link #setFocus(String)}.
	 * @see #setFocus(String)
	 */
	@SuppressWarnings("unchecked")
	public void clearWorkingMemory(){
		DefaultFactHandle fato;
		this.getAgenda().clearAgenda();
		Iterator<DefaultFactHandle> iterator;
		for (iterator=(Iterator<DefaultFactHandle>)session.iterateFactHandles();iterator.hasNext(); ){
			fato=iterator.next();
			session.retract(fato);
		}
	}
	
	/**
	 * Remove a referência da session da <code>RuleBase</code>
	 */
	public void finalizar(){
		session.dispose();
	}
	
	/**
	 * Caso haja um conflito de regras obtêm-se as regras conflitantes
	 * @return um array com as regras em conflito
	 */
	public Activation[] getRegrasConflito(){
		Agenda ag=session.getAgenda();
		if (ag.agendaSize()>1){
			return ag.getActivations();
		}
		else return null;
	}
	
	/**
	 * Troca o foco das regras para outro grupo de regras.
	 * Este grupo é informado na regra através da palvra reservada
	 * "agenda-group". <br>
	 * Caso não haja este comando, o dafault é "MAIN".
	 * @param grupo o nome do grupo a ser trocado
	 */
	public void setFocus(String grupo){
		session.setFocus(grupo);
	}
	
	/**
	 * Adiciona um Listener para quando houver algum evento na Agenda
	 * @param list o Listener a ser adicionado
	 */
	public void addListener(AgendaEventListener list){
		session.addEventListener(list);
	}
	
	/**
	 * Adiciona um Listener para quando houver alguma mudança, inserção,
	 * exclusão ou alteração, na Memória de Trabalho
	 * @param list o Listener a ser adicionado
	 */
	public void addListener(WorkingMemoryEventListener list){
		session.addEventListener(list);
	}
	
	/**
	 * Verifica se a <code>WorkingMemory</code> possui fatos ou não
	 * @return <code>true</code> de a <code>WorkingMemory</code>
	 * for vazia e <code>false</code> caso contrario
	 */
	@SuppressWarnings("unchecked")
	public boolean isEmpty(){
		Iterator<DefaultFactHandle> fatos=
			(Iterator<DefaultFactHandle>)session.iterateFactHandles();
		if (!fatos.hasNext())return true;
		return false;
	}
	
	/**
	 * Remove uma regra de um pacote de <code>session</code>
	 * @param nomePacote nome do pacote cuja regra sera removida
	 * @param nomeRegra a regra a ser removida
	 */
	public void removerRegra(String nomePacote, String nomeRegra){
		session.getRuleBase().removeRule(nomePacote, nomeRegra);
	}
}
