package pat2math.resolvedor.view;

import java.util.Vector;

import pat2math.expressao.arvore.InvalidValueException;
import pat2math.resolvedor.Equacoes;
import pat2math.resolvedor.Resolvedor;

public class Control {
	private ResultInterface formulae;
	private Calculator c ;
	private Resolvedor solver;

	public Control(Calculator c, ResultInterface formulae, Resolvedor r) {
		this.c = c;
		this.formulae = formulae;
		this.solver=r;
	}

	/*Cria regra moveINTequerda moveINTdireita 
	 * isolaXEquerda isolaXdireita
	 */
	public String getEquation() {
		return c.getEquation();
	}

	public void setEquation(String str_eq) {
		c.setEquation(str_eq);
	}

	public void start() throws InvalidValueException{
			// String pedido = "Entre com a expressao: ";
			Vector<Equacoes> resp;
			String expressao = getEquation();
			System.out.println(expressao);
		//	if (!expressao.equals("")) {
				solver.imprimeRespostaFinal(expressao);
				resp = solver.getPassos();
				showExpression(resp);
		//	}
	}

	private void showExpression(Vector<Equacoes> resp) {
		for (Equacoes a : resp) {
			System.out.println("exibindo=" + a.getFullEquation());
			// se iniciar com "#" significa que é explicação logo deve ser posto com texto no label
			if (a.getFullEquation().startsWith("#")){
				if(a.getFullEquation().startsWith("# Solucao da Equacao")){
					String [] s=a.getFullEquation().split("\\n");
					formulae.setNextStep(s[0].substring(1));
					if (s[1].startsWith("#"))formulae.setNextStep(s[1]);
					else formulae.setNextEquation(s[1]);
				}else formulae.setNextStep(a.getFullEquation().substring(1));
			}
			//senão, é equação então põe no label como Icon
			else{
				formulae.setNextEquation(a.getTeXEquation());
			}
		}
		resp.clear();
	}

}
