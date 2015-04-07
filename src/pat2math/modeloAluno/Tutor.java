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

public class Tutor {

	private String mensagem = "";
    private ModeloAluno resolvedor;
    private Mensagem respostaCognitivo;
    

    public Tutor(String nome, String nomeFull, List<Tip> helps) {
        super();
        try {
            resolvedor = new ModeloAluno();
            resolvedor.useDatabase(true);
            resolvedor.setNome(nome, helps);
            resolvedor.setNomeFull(nomeFull);
        } catch (Exception ex) {
            System.out.println("Erro ao criar modelo de aluno!");
        }
    }

    public void kill(){
    	resolvedor.clear();
    }
    
    public MaterialInstrucionalPOJO informNewEquation() {
    	MaterialInstrucionalPOJO exercicio = resolvedor.getNextEquation();
    	return exercicio;
    }
    
    public Mensagem getRespostaCognitivo() {
        return respostaCognitivo;
    }

    public void setRespostaCognitivo(Mensagem respostaCognitivo) {
        this.respostaCognitivo = respostaCognitivo;
    }

    public ModeloAluno getResolvedor() {
        return resolvedor;
    }

    public void setResolvedor(ModeloAluno resolvedor) {
        this.resolvedor = resolvedor;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Mensagem validaEquacao(String mensagem, List<Tip> helps, List<Knowledge> knowledges) {
        this.mensagem = mensagem;
        resolvedor.reset();

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
            resolvedor.setOperacao(op);
            resolvedor.setExpressao(ei);
            this.respostaCognitivo = resolvedor.iniciaResolucao(exp, helps, knowledges);
            
        } catch (InvalidValueException e) {
            e.printStackTrace();
        }

        return this.respostaCognitivo;

    }


    public Tip getDica(String ultimoPasso, List<Tip> helps, List<Knowledge> knowledges) throws InvalidValueException {
        return resolvedor.hints(ultimoPasso, helps, knowledges);
    }


    public String getProximoPasso(String ultimoPasso) throws InvalidValueException {
        return resolvedor.proximoPasso(ultimoPasso);
    }

    public List<String> getResolucaoCompleta(String ultimoPasso) throws InvalidValueException {
        //List<String> resolucaoCompleta = ;


        return resolvedor.mostrarPassos(ultimoPasso);
    }

    public boolean isEndOfResolution(String s) throws InvalidValueException {
        return resolvedor.isEndOfResolution(s);
    }


	public String getNome() {
		return resolvedor.getNomeFull();
	}
	
	public void setEquacao(List<MaterialInstrucionalPOJO> equacao){
		resolvedor.addNewEquation(equacao);
	}
	
	public MaterialInstrucionalPOJO setEquacao(MaterialInstrucionalPOJO equacao){
		return resolvedor.addNewEquation(equacao);
	}
	
	public void clearListEquations(){
		resolvedor.clearEquations();
	}
	
	public List<MaterialInstrucionalPOJO> listEquations(){
		return resolvedor.listEquations();
	}
	
	public void removeFromList(MaterialInstrucionalPOJO exercicio){
		resolvedor.removeEquation(exercicio);
	}
	
	public List<Operation> getSteps() {

		List<Equacoes> fullResult = resolvedor.getPassos();
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
			solution = resolvedor.mostrarPassos(equation);
						
		} catch (InvalidValueException e) {
			System.out.println(e.getMessage());
		}
		return solution;
		
	}
	
	public String getOneStep(String equation){
		String solution="";
		try {
			solution = resolvedor.proximoPasso(equation);
		} catch (InvalidValueException e) {
			System.out.println(e.getMessage());
		}
		return solution;
	}
	
}