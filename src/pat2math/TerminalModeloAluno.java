package pat2math;

import java.util.Stack;

import pat2math.expressao.arvore.InvalidValueException;
import pat2math.modeloAluno.ModeloAluno;
import pat2math.regras.Progress;
import pat2math.regras.Regras;
import pat2math.util.Teclado;


/**
 * Realiza a entrada da expressao matemática a ser resolvida, modo texto,
 * e pede o proximo passo de solução bem como a operação realizada,
 * retorando se a resposta está certa ou não.
 * @author Henrique M. Seffrin
 * @version 1.0, 12/08/2008
 */

public class TerminalModeloAluno {
	/*
	*//**
	 * Inicia, compila e executa as regras. Pede ao usuario a expressão
	 * e a devolve resolvida (até onde as regras permitirem)
	 * @throws Exception geralmente é realacionado a compilação das regras
	 */
	//tester com x^2+3x+4=0 e	a=1&b=3&c=4
	public void start() throws Exception{
		String pedido ="Nova expressao: ";
		boolean nova=true;
		Progress prog=null;
		ModeloAluno model=new ModeloAluno(prog,false);
		//System.out.print("Nome: ");
		model.setNome("Teste");
		String expressao="";
		do{
			try{
				if (nova || expressao.equals("")){
					System.out.print(pedido);
					expressao=Teclado.leString();
					//model.resetNiveisDicas();
				}
				if (!expressao.equals("") && !expressao.toLowerCase().equals("fim")){
					model.setExpressao(expressao);
					model.start();
					Stack<String> p=model.getPassosCorretos();
					if (!p.isEmpty()){
						System.out.println("\nPassos utilizados: ");
						while(!p.isEmpty()){
							System.out.println(p.pop());
						}
					}
					System.out.println();
					if (Teclado.leString("Entrar nova expressão(s/n)?:").equalsIgnoreCase("s")){
						nova=true;
					}else nova=false;
				}
			}catch(InvalidValueException ive){
				System.out.println("Erro:" +ive.message());
			}
		}while (!expressao.equals("") && !expressao.equalsIgnoreCase("fim"));
		model.finalizar();
		System.out.println("Encerrado");
	}
	
	
	public static void main(String[] args) throws Exception {
		if (args.length >0 && args[0].equals("-c")){
			System.out.println("Processando regras de ajuda");
			Regras r=new Regras(new String[]{"/pat2math/help/hint_selection.drl"}, true, null);
			Regras.saveRecources("pat2math.help", r.getSession().getRuleBase().getPackage("pat2math.help"));
			System.out.println("Processando regras de resolução");
			r=new Regras(new String[]{"/pat2math/regras/expressao.drl","/pat2math/regras/modelo_aluno.drl", "/pat2math/regras/misconseptions.drl"}, true, null);
			Regras.saveRecources("pat2math.regras", r.getSession().getRuleBase().getPackage("pat2math.regras"));
			System.out.println("Processo concluído!");
		}else{
			TerminalModeloAluno t=new TerminalModeloAluno();
			t.start();
		}
	}

	/*public static void main(String[] args) throws Exception {
		
	}*/
	/*
	6x-17=13*(x-1)-4 funciona
	 * 5x=12x+49 funciona
	 *((x+1)*(x+2))/(20x*(x+1))=20+5 funciona	
	 *(x+6)/x=-7 funciona
	 *(x+2)/(x+1)=2x/(x-4) funciona
	 *(2-x)/3+1/5=3/2 funciona
	 *(2-x)/x+1/x^2=3/x funciona
	 *(x^2)/x=1 funciona
	 *(x+2)/(x-2)+(x-2)/(x+2)=1 funciona
	 *(4x^2)=2 funciona
	 *x=2/(3*5R2) funciona
	 *x=(2R2)/((3R2)-(2R2)) funciona
	 *((1x^2)+4x)=-12 funciona
	 *3/((x^2)-4)+1/(x-3)=0 funciona
	 *x=x+(x+((x^2)-(-3R2))) funciona
	 */


}