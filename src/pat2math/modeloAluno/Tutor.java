package pat2math.modeloAluno;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import pat2math.expressao.arvore.InvalidValueException;
import pat2math.regras.Operacao;
import pat2math.resolvedor.Equacoes;
import baseDominio.POJO.MaterialInstrucionalPOJO;
import br.com.pat2math.studentModel.Operation;
import br.com.pat2math.studentModel.ResolutionStep;
import br.com.pat2math.studentModel.Tip;
import br.com.pat2math.studentModel.Knowledge;

/**
 *  Precisa de uma Mensagem e de uma List<Tip> helps no contrutor do Tutor, tem como atributos ModeloAluno e Mensagem
 *  
 * 
 * @author Savanna
 *
 */
public class Tutor {

	private String mensagem = "";
    
	/**
	 * Cria no construtor um modelo de aluno, com nome, e usa os dados do Banco de Dados
	 */
	private ModeloAluno modeloAluno;
    /**
     * A classe Mensagem manda uma mensagem para o Tutor
     */
    private Mensagem respostaCognitivo;
    

    public Tutor(String nome, String nomeFull, List<Tip> helps) {
        super();
        try {
            modeloAluno = new ModeloAluno(); // Cria um novo aluno
            modeloAluno.useDatabase(true); // Ativa/desativa Banco de Dados com as Hints no ModeloAluno
            modeloAluno.setNome(nome, helps); // Bota o nome e o conjunto de dicas
            modeloAluno.setNomeFull(nomeFull); 
        } catch (Exception ex) {
            System.out.println("Erro ao criar modelo de aluno!");
        }
    }

    public void kill(){
    	modeloAluno.clear();
    }
    
    public MaterialInstrucionalPOJO informNewEquation() {
    	MaterialInstrucionalPOJO exercicio = modeloAluno.getNextEquation();
    	return exercicio;
    }
    
    public Mensagem getRespostaCognitivo() {
        return respostaCognitivo;
    }

    public void setRespostaCognitivo(Mensagem respostaCognitivo) {
        this.respostaCognitivo = respostaCognitivo;
    }

    public ModeloAluno getResolvedor() {
        return modeloAluno;
    }

    public void setResolvedor(ModeloAluno resolvedor) {
        this.modeloAluno = resolvedor;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    /**
     * 
     * @param mensagem
     * @param helps
     * @param knowledges
     * @return
     */
    public Mensagem validaEquacao(String mensagem, List<Tip> helps, List<Knowledge> knowledges) {
        this.mensagem = mensagem;
        modeloAluno.reset();

        String[] messagePart = mensagem.split("#");
        String ia, ic, ei, op, exp;
        ia = ic = ei = op = exp = "";

        for (int i = 0; i < messagePart.length; i++) {
            if (messagePart[i].split(":")[0].equals("IA")) {
                ia = messagePart[i].split(":")[1];
            } else if (messagePart[i].split(":")[0].equals("IC")) {
                ic = messagePart[i].split(":")[1];
            } else if (messagePart[i].split(":")[0].equals("EI")) {
                ei = messagePart[i].split(":")[1];
            } else if (messagePart[i].split(":")[0].equals("OP")) {
                op = messagePart[i].split(":")[1];
            } else if (messagePart[i].split(":")[0].equals("EXP")) {
                exp = messagePart[i].split(":")[1];
            }
        }


        try {
            modeloAluno.setOperacao(op);
            modeloAluno.setExpressao(ei);
            this.respostaCognitivo = modeloAluno.iniciaResolucao(exp, helps, knowledges);
            
        } catch (InvalidValueException e) {
            e.printStackTrace();
        }

        return this.respostaCognitivo;

    }


    public Tip getDica(String ultimoPasso, List<Tip> helps, List<Knowledge> knowledges) throws InvalidValueException {
        return modeloAluno.hints(ultimoPasso, helps, knowledges);
    }


    public String getProximoPasso(String ultimoPasso) throws InvalidValueException {
        return modeloAluno.proximoPasso(ultimoPasso);
    }

    public List<String> getResolucaoCompleta(String ultimoPasso) throws InvalidValueException {
        //List<String> resolucaoCompleta = ;


        return modeloAluno.mostrarPassos(ultimoPasso);
    }

    public boolean isEndOfResolution(String s) throws InvalidValueException {
        return modeloAluno.isEndOfResolution(s);
    }


	public String getNome() {
		return modeloAluno.getNomeFull();
	}
	
	public void setEquacao(List<MaterialInstrucionalPOJO> equacao){
		modeloAluno.addNewEquation(equacao);
	}
	
	public MaterialInstrucionalPOJO setEquacao(MaterialInstrucionalPOJO equacao){
		return modeloAluno.addNewEquation(equacao);
	}
	
	public void clearListEquations(){
		modeloAluno.clearEquations();
	}
	
	public List<MaterialInstrucionalPOJO> listEquations(){
		return modeloAluno.listEquations();
	}
	
	public void removeFromList(MaterialInstrucionalPOJO exercicio){
		modeloAluno.removeEquation(exercicio);
	}
	
	public List<Operation> getSteps() {

		List<Equacoes> fullResult = modeloAluno.getPassos();
		List<Operation> operations = new ArrayList<Operation>();
		for(Equacoes e : fullResult) {
			if(e.getFullEquation().startsWith("#")) {
				Operation operation = new Operation();
				String code =Operacao.getWithNewCodes(e.getFullEquation());
				if (!code.startsWith("#")){
					operation.setCode(code);
					operations.add(operation);
				}
				
			}
		}
		return operations;
	}
	
	public List<String> getSteps(String equation){
		List<String> solution = new ArrayList<String>();
		try {
			solution = modeloAluno.mostrarPassos(equation);
						
		} catch (InvalidValueException e) {
			System.out.println(e.getMessage());
		}
		return solution;
		
	}
	
	public String getOneStep(String equation){
		String solution="";
		try {
			solution = modeloAluno.proximoPasso(equation);
		} catch (InvalidValueException e) {
			System.out.println(e.getMessage());
		}
		return solution;
	}
	
}