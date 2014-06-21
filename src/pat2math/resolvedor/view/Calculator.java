package pat2math.resolvedor.view;

import java.awt.Color;
import java.awt.GridLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.AbstractButton;
import javax.swing.BorderFactory;
import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JToggleButton;

import pat2math.util.Symbols;

public class Calculator extends JPanel {
	
	private static final long serialVersionUID = 3444310837098512667L;
	private JLabel equation;
	private String str_eq = "";
	private ResultInterface formulae;
	private boolean raiz;
	private boolean fracao;
	// guarda as posições iniciais (pares) e finais(impares) das raizes
	private ArrayList<Integer> posRaizes=new ArrayList<Integer>();
	/*
	 * guarda as posições iniciais (pares) e finais (impares) da fração onde:
	 * duas posições guardam o numerador e as outras 2 o numerador, ou seja,
	 * a cada 4 posições temos uma nova fração
	 */
	private ArrayList<Integer> posFracoes=new ArrayList<Integer>(); 
	private JToggleButton toogleButtons[];
	private JButton igualdade;
	// guara as imagens do botao de fração para nao ficar criando uma nova a cada clique do botão
	private Icon frac[]; 
	
	private static final int RAIZ=0;
	private static final int FRACAO=1;
	private static final int INICIO_FRACAO=0;
	private static final int NUMERADOR=1;
	private static final int DENOMINADOR=2;
	
	public String getEquation() {
		return str_eq;
	}

	public void setEquation(String str_eq) {
		this.str_eq = str_eq;
	}

	public Calculator(JLabel eq, ResultInterface formulae) {
		equation = eq;
		equation.setIcon(Symbols.getImage(""));
		this.formulae = formulae;
		init();
	}

	public void init() {
		setBackground(Color.WHITE);
		String v[] = { "x", "<html>x<sup>2</sup></html>", "+", "-", "*", "/",
				"(", ")", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
				"=", "DEL", "NEW","<html>&radic</html>"};
		String tooltip[]={"Incógnita","Incógnita ao quadrado","Soma","Subtração","Multiplicação","Fração",
				"Abre parentesis", "Fecha parentesis","1","2","3","4","5","6","7","8","9","0",
				"Igualdade","Apagar um caracter","Nova Equação","Raiz Quadrada"};
		GridLayout layout = new GridLayout(v.length / 2 + 1, 2, 1, 1);
		this.setLayout(layout);
		toogleButtons=new JToggleButton[2];
		frac=new Icon[3];
		frac[INICIO_FRACAO]=Symbols.getImage("\\frac{(...)}{(...)}", 10);
		frac[NUMERADOR]=Symbols.getImage("\\frac{(N)}{(...)}", 10);
		frac[DENOMINADOR]=Symbols.getImage("\\frac{(...)}{(D)}", 10);
		AbstractButton b[] = new AbstractButton[v.length];
		TratadorDeBotao t = new TratadorDeBotao();
		for (int i = 0; i < v.length; i++) {
			if (v[i].equals("/")){
				b[i]=new JToggleButton(frac[INICIO_FRACAO]);
				b[i].setActionCommand("N");
				b[i].setToolTipText(tooltip[i]);
				toogleButtons[FRACAO]=(JToggleButton)b[i];
			}
			else if (v[i].equals("*")){
				b[i]=new JButton(Symbols.getImage("\\times", 20));
				b[i].setActionCommand("*");
				b[i].setToolTipText(tooltip[i]);
			}else if (v[i].equalsIgnoreCase("<html>&radic</html>")){
				b[i]=new JToggleButton("<html>&radic</html>");
				b[i].setActionCommand("r");
				toogleButtons[RAIZ]=(JToggleButton)b[i];
				b[i].setToolTipText(tooltip[i]);
			}
			else{
				b[i] = new JButton(v[i]);
				b[i].setToolTipText(tooltip[i]);
			}
			if (v[i].equals("="))igualdade=(JButton) b[i];
			b[i].setMargin(new Insets(5, 5, 5, 5));
			this.add(b[i]);
			b[i].addActionListener(t);
			if (v[i].equalsIgnoreCase("<html>x<sup>2</sup></html>"))
				b[i].setActionCommand("w");
		}
		setBorder(BorderFactory.createEmptyBorder(10, 10, 50, 0));

	}

	class TratadorDeBotao implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			String str = e.getActionCommand();
			if (str.equalsIgnoreCase("new")) {
				equation.setText("");
				equation.setIcon(Symbols.getImage(""));
				str_eq="";
				formulae.limpa();
				posRaizes.clear();
				posFracoes.clear();
				toogleButtons[RAIZ].setSelected(false);
				toogleButtons[FRACAO].setSelected(false);
				toogleButtons[RAIZ].setEnabled(true);
				toogleButtons[FRACAO].setEnabled(true);
				igualdade.setEnabled(true);
				toogleButtons[FRACAO].setIcon(frac[INICIO_FRACAO]);
				toogleButtons[FRACAO].setToolTipText("Fração");
				raiz=false;
				fracao=false;
				return;
			}
			if (str.equalsIgnoreCase("del")){
				if(!str_eq.isEmpty()){
					int indice=0;
					int posIni,posFim;
					posIni=posFim=0;
					if (posRaizes!=null && !posRaizes.isEmpty()){
						indice= posRaizes.size()-1;
						//para o caso do botão da raiz estiver pressionado enquanto for apagar algo
						if (toogleButtons[RAIZ].isSelected()){
							str_eq+=")R2";
							posRaizes.set(indice, str_eq.length()-3);
						}
						if (posRaizes.get(indice)==str_eq.length()-1 || str_eq.endsWith(")R2")){
							if (str_eq.endsWith("^2"))posRaizes.set(indice, posRaizes.get(indice)-2);
							else if (str_eq.endsWith(")R2") && !str_eq.endsWith("()R2")){
								if(/*(posRaizes.get(indice)- posRaizes.get(indice-1))==2 ||*/ /*diferenca de 2 entre o inicio e o fim da
										raiz significa "(a)" onde posição inicial ( e a final  )*/ 
										str_eq.charAt(posRaizes.get(indice)-2)=='^')posRaizes.set(indice, posRaizes.get(indice)-2);
								else posRaizes.set(indice, posRaizes.get(indice)-1);
								toogleButtons[RAIZ].setSelected(true);
								raiz=true;
								igualdade.setEnabled(false);
								toogleButtons[FRACAO].setEnabled(false);
							}
							else posRaizes.set(indice, posRaizes.get(indice)-1);
							posIni=posRaizes.get(indice-1);
							posFim=posRaizes.get(indice);
							if ((posRaizes.get(indice)<=posRaizes.get(indice-1)) ||
									(posRaizes.get(indice)-posRaizes.get(indice-1)==1)){
								posRaizes.remove(indice);
								indice--;
								posRaizes.remove(indice);
								indice--;
								if (toogleButtons[RAIZ].isSelected())toogleButtons[RAIZ].setSelected(false);
								raiz=false;
								igualdade.setEnabled(true);
								toogleButtons[FRACAO].setEnabled(true);
							}
						}
					}
					if (posFracoes!=null && !posFracoes.isEmpty()){
						indice =posFracoes.size()-1;
						//para o caso do botão de fração estiver pressiondo enquanto for apagar algo
						if (toogleButtons[FRACAO].isSelected()){
							//se for o numerador que estiver sendo apagado
							if (indice%4==0 || (indice-1)%4==0){
								str_eq+=")/(";
								//posiciona o indice do numerador no parentese de fechamento
								posFracoes.set(indice,str_eq.length()-3);
							}//se for o denominador que estiver sendo apagado
							else if (indice%2==0 || (indice-1)%2==0){
								str_eq+=")";
								//posiciona o indice do denominador no parentese de fechamento
								posFracoes.set(indice,str_eq.length()-1);
							}
						}
						if (posFracoes.get(indice)==str_eq.length()-1 || str_eq.endsWith(")/(")){
							if (str_eq.endsWith("^2"))posFracoes.set(indice, posFracoes.get(indice)-2);
							if (str_eq.charAt(posFracoes.get(indice)-2)=='^')posFracoes.set(indice, posFracoes.get(indice)-2);
							/*
							 * Se o ultimo caracter da equação for um parantese de fechamento
							 * e este perentase pertencer a posfracoes, então ele é o parantese
							 * de fechamento da equação portanto ativar o botão da fração  
							 */
							else if (str_eq.endsWith(")") && posFracoes.get(indice)==str_eq.length()-1){
								posFracoes.set(indice, posFracoes.get(indice)-1);
								toogleButtons[FRACAO].setSelected(true);
								toogleButtons[FRACAO].setIcon(frac[DENOMINADOR]);
								toogleButtons[FRACAO].setToolTipText("Fração (Denominador)");
								toogleButtons[FRACAO].setActionCommand("D");
								fracao=true;
								igualdade.setEnabled(false);
								toogleButtons[RAIZ].setEnabled(false);
							}
							else posFracoes.set(indice, posFracoes.get(indice)-1);
							posIni=posFracoes.get(indice-1);
							posFim=posFracoes.get(indice);
							if ((posFracoes.get(indice)<=posFracoes.get(indice-1)) ||
									posFracoes.get(indice)-posFracoes.get(indice-1)==1){
								if ((indice-1)%4==0 || indice%4==0){
									toogleButtons[FRACAO].setSelected(false);
									toogleButtons[FRACAO].setIcon(frac[INICIO_FRACAO]);
									toogleButtons[FRACAO].setActionCommand("N");
									toogleButtons[FRACAO].setToolTipText("Fração");
									fracao=false;
									igualdade.setEnabled(true);
									toogleButtons[RAIZ].setEnabled(true);
								}else if ((indice-1)%2==0 || indice%2==0){
									toogleButtons[FRACAO].setSelected(true);
									fracao=true;
									igualdade.setEnabled(false);
									toogleButtons[RAIZ].setEnabled(false);
									toogleButtons[FRACAO].setIcon(frac[NUMERADOR]);
									toogleButtons[FRACAO].setActionCommand("N");
									toogleButtons[FRACAO].setToolTipText("Fração (Numerador)");
									/*
									 * marcador de denomianador utilizado unicamente para identificar
									 * que o parantesis fecha o denominador ele é removido antes 
									 * da equação chegar ao resolvedor
									 */
									str_eq+="D";
								}
								posFracoes.remove(indice);
								indice--;
								posFracoes.remove(indice);
								indice--;
							}
							//se for o denominador
							if (indice >0){
								if ((indice-1)%4!=0 && (indice-1)%2==0 && 
										str_eq.endsWith(")") && !str_eq.endsWith("D"))str_eq+="D";
							}
						}
					}
					if (str_eq.endsWith("^2"))str_eq=str_eq.substring(0,str_eq.length()-2);
					/*tem que suprimir o ")R2" mais o ultimo simbolo posto na raiz ja que o ")R2" não
					 *aparece para o usuário*/
					else if (str_eq.endsWith(")R2")){
						if (posFim-posIni<=1){
							if (posIni==0)str_eq="";
							else str_eq=str_eq.substring(0,posIni);
						}else if (!str_eq.endsWith("()R2")||raiz){
							str_eq=str_eq.substring(0, str_eq.length()-4);
							if (str_eq.endsWith("^"))str_eq=str_eq.substring(0,str_eq.length()-1);
							str_eq+=")R2";
							if (str_eq.endsWith("()R2") && !raiz){
								if (str_eq.length()==4)str_eq="";
								else str_eq=str_eq.substring(0,str_eq.length()-4);
								//posRaizes.set(indice,str_eq.length()-1);
							}
						}else str_eq=str_eq.substring(0,str_eq.length()-4);
					}else if (str_eq.endsWith(")D")){
						//elimina o parentese, que não é exibido ao usuario, mais o numero a ser apagado 		
						str_eq=str_eq.substring(0,str_eq.length()-3); 
						if (str_eq.endsWith("^"))str_eq=str_eq.substring(0,str_eq.length()-1);
						str_eq+=")";
						if (str_eq.endsWith("()")&& !toogleButtons[FRACAO].getActionCommand().equals("D")){
							/*
							 * se tiver assim "(b)/()" onde b é uma expressao deixar assim "(b)/"
							 * pois a remocao de ")/" ocorre no fim do metodo
							 */
							str_eq=str_eq.substring(0,str_eq.length()-2);
						}
						//posFracoes.set(indice,str_eq.length()-1);
					}else if (str_eq.endsWith(")/(")){
							if (posFim-posIni<=1){
								if (posIni==0)str_eq="";
								else str_eq=str_eq.substring(0,posIni);
							}else if (!str_eq.endsWith("()/(") || fracao){
								str_eq=str_eq.substring(0,str_eq.length()-4);
								if (str_eq.endsWith("^"))str_eq=str_eq.substring(0,str_eq.length()-1);
								//if (indice>0)posFracoes.set(indice,str_eq.length()-1);
								str_eq+=")/";
								if (str_eq.endsWith("()/")&& !fracao){
									if (str_eq.length()==3)str_eq="";
									else str_eq=str_eq.substring(0,str_eq.length()-3);
									//if (indice>0)posFracoes.set(indice,str_eq.length()-1);
								}
						}else str_eq=str_eq.substring(0,str_eq.length()-4);
					}else str_eq = str_eq.substring(0, str_eq.length() - 1);
				}
			}
			else if (str.equalsIgnoreCase("w")){
				str_eq = str_eq + "x^2";
				if (raiz){
					int r;
					r=posRaizes.get(posRaizes.size()-1);
					//r=r+3;
					r=str_eq.length()-1;
					posRaizes.set(posRaizes.size()-1, r);
				}
				if (fracao){
					int r;
					r=posFracoes.get(posFracoes.size()-1);
					r=str_eq.length()-1;
					posFracoes.set(posFracoes.size()-1, r);
				}
			}
			else if (str.equalsIgnoreCase("r")){
				JToggleButton jb=(JToggleButton)e.getSource();
				if (jb.isSelected()){
					raiz=true;
					str_eq+="(";
					posRaizes.add(str_eq.length()-1);
					posRaizes.add(str_eq.length()-1);
					igualdade.setEnabled(false);
					toogleButtons[FRACAO].setEnabled(false);
				}else{
					raiz=false;
					str_eq+=")R2";
					posRaizes.set(posRaizes.size()-1,str_eq.length()-3); //-3 para suprimir o R2
					igualdade.setEnabled(true);
					toogleButtons[FRACAO].setEnabled(true);
				}
			}
			else if (str.equalsIgnoreCase("N") || str.equalsIgnoreCase("D")){
				JToggleButton jb=(JToggleButton)e.getSource();
				if (jb.isSelected()){
					fracao=true;
					igualdade.setEnabled(false);
					toogleButtons[RAIZ].setEnabled(false);
					str_eq+="(";
					posFracoes.add(str_eq.length()-1);
					posFracoes.add(str_eq.length()-1);
					if (str.equalsIgnoreCase("N")){
						jb.setIcon(frac[NUMERADOR]);
						jb.setToolTipText("Fração (Numerador)");
					}
				}else{
					fracao=false;
					//posFracoes.set(posFracoes.size()-1,str_eq.length()-1);
					if (str.equalsIgnoreCase("N")){
						toogleButtons[FRACAO].setSelected(true);
						str_eq+=")/";
						jb.setIcon(frac[DENOMINADOR]);
						jb.setToolTipText("Fração (Denominador)");
						jb.setActionCommand("D");
						posFracoes.set(posFracoes.size()-1,str_eq.length()-2);
						//desta forma permite que o botão so seja liberado quando a fração estiver completa
						fracao=true;
						str_eq+="(";
						posFracoes.add(str_eq.length()-1);
						posFracoes.add(str_eq.length()-1);
					}
					else{
						str_eq+=")";
						jb.setIcon(frac[INICIO_FRACAO]);
						jb.setActionCommand("N");
						jb.setToolTipText("Fração");
						igualdade.setEnabled(true);
						toogleButtons[RAIZ].setEnabled(true);
						posFracoes.set(posFracoes.size()-1,str_eq.length()-1);
					}
				}
			}
			else{
				str_eq = str_eq + str;
				if (raiz){
					int r;
					r=posRaizes.get(posRaizes.size()-1);
					//r++;
					r=str_eq.length()-1;
					posRaizes.set(posRaizes.size()-1, r);
				}
				if (fracao){
					int r;
					r=posFracoes.get(posFracoes.size()-1);
					r=str_eq.length()-1;
					posFracoes.set(posFracoes.size()-1, r);
				}
			}
			String newStr = "";
			String aux="";
			int ptRaiz=0;
			int ptFracao=0;
			for (int i = 0; i < str_eq.length(); i++) {
				char c = str_eq.charAt(i);
				if (c=='R'){
					i+=1;
				}else if (c=='/'){
				}else if (!posRaizes.isEmpty() && (ptRaiz<posRaizes.size()) && posRaizes.get(ptRaiz).equals(i) ||
						!posFracoes.isEmpty() && (ptFracao<posFracoes.size()) && posFracoes.get(ptFracao).equals(i)){
					
					if (!posRaizes.isEmpty() && (ptRaiz<posRaizes.size()) && posRaizes.get(ptRaiz).equals(i)){
						if (posRaizes.get(ptRaiz).equals(posRaizes.get(ptRaiz+1))) aux=""+str_eq.charAt(posRaizes.get(ptRaiz));
						//else if (delRaiz)aux=str_eq.substring(posRaizes.get(ptRaiz));
						else aux=str_eq.substring(posRaizes.get(ptRaiz), posRaizes.get(ptRaiz+1)+1);
						aux=removeParentesesBorda(aux,str);
						/*
						 * Põe parantese, ja que foi removido no metodo acima, se foi pressionado o 
						 * botão de ")" e se for a raiz(raiz==true) que estiver sendo editada:
						 * ptRaiz==(posRaizes.size()-2)) , -2 para pegar o inicio da raiz
						 */
						if (str.equals(")")&&ptRaiz==(posRaizes.size()-2)&& raiz)aux+=")";
						aux=aux.replace("*", "\\times");
						System.out.println("Aux= "+aux);
						ptRaiz++;
						newStr+= "\\sqrt{"+aux+"}";
						i=posRaizes.get(ptRaiz);
						System.out.println(i);
						ptRaiz++;
					}
					if(!posFracoes.isEmpty() && (ptFracao<posFracoes.size()) && posFracoes.get(ptFracao).equals(i)){
						if (posFracoes.get(ptFracao).equals(posFracoes.get(ptFracao+1))) aux=""+str_eq.charAt(posFracoes.get(ptFracao));
						else aux=str_eq.substring(posFracoes.get(ptFracao),posFracoes.get(ptFracao+1)+1);
						aux=removeParentesesBorda(aux,str);
						/*
						 * Põe parantese, ja que foi removido no metodo acima, se foi pressionado o 
						 * botão de ")" e se for a fracao(fracao==true) que estiver sendo editada:
						 * ptFracao==(posFracoess.size()-2)) , -2 para pegar o inicio do
						 * numerado/denominador da fracao
						 */
						if (str.equals(")")&& ptFracao==(posFracoes.size()-2) && fracao)aux+=")";
						aux=aux.replace("*", "\\times");
						System.out.println("aux= "+aux);
						ptFracao++;
						/*
						 * verifica se ptFracao esta no numerador ou denominador onde
						 * posições multiplas de 4 são o inicio do numerador e 
						 * posições multiplas de 2, e não de 4 são o inicio do denominador
						 */
						if ((ptFracao-1)%4==0){
							newStr+="\\frac{"+aux+"}";
							if ((ptFracao+1)>=posFracoes.size())newStr+="{()}";
						}else if ((ptFracao-1)%2==0){
							newStr+="{"+aux+"}";
						}
						i=posFracoes.get(ptFracao);
						System.out.println(i);
						ptFracao++;
					}
				}else if (c=='*'){
					newStr+="\\times";
				}
				/*else if (c=='/'){	
				}*/else newStr += c;
			//	System.out.println(i+" "+str_eq.length());
			}
			if(toogleButtons[RAIZ].isSelected() && str.equalsIgnoreCase("del")){
				str_eq=str_eq.substring(0,str_eq.length()-3);
			}
			if(toogleButtons[FRACAO].isSelected() && str.equalsIgnoreCase("del")
					&& (posFracoes.size()-2)%4!=0 && (posFracoes.size()-2)%2==0){
				str_eq=str_eq.substring(0,str_eq.length()-1);
			}
			if(toogleButtons[FRACAO].isSelected() && str.equalsIgnoreCase("del")
					&& (posFracoes.size()-2)%4==0){
				str_eq=str_eq.substring(0,str_eq.length()-2);
			}					
					
			System.out.println(newStr);
			System.out.println(str_eq);
			equation.setIcon(Symbols.getImage(newStr));
		}

		public TratadorDeBotao() {
			super();
		}
		
		private String removeParentesesBorda(String aux, String actionCommand){
			if (aux.startsWith("(")){
				if (aux.length()==1)aux="()";
				else if (aux.endsWith(")"))	aux=aux.substring(1, aux.length()-1);
				else aux=aux.substring(1);
			}
			return aux;
		}
	}

}
