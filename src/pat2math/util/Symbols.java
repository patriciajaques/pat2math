package pat2math.util;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.Icon;
import javax.swing.JFrame;
import javax.swing.JLabel;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.InvalidValueException;
import be.ugent.caagt.jmathtex.TeXConstants;
import be.ugent.caagt.jmathtex.TeXFormula;

/**
 * Classe responsável pela geração de imagens das equações a partir da linguagem TeX,
 * e da conversão de uma equação em formato de arvore para a linguaguem TeX.
 * @author Henrique M. Seffrin
 *
 */
public class Symbols {
		
	/**
	 * Gera a imagem de uma equação, de tamanho 15, a
	 * partir de <code>texEquation</code>
	 * @param texEquation uma equação descrita em linguagem TeX
	 * @return um {@link Icon} contendo a equação
	 */
	public static Icon getImage(String texEquation){
		TeXFormula formula = new TeXFormula(texEquation);
        Icon icon = formula.createTeXIcon(TeXConstants.STYLE_DISPLAY, 15);
        return icon;
	}
	
	/**
	 * Gera a imagem de uma equação, de tamanho <code>tam</code>, a
	 * partir de <code>texEquation</code>
	 * @param equation uma equação descrita em linguagem TeX
	 * @param tam o tamanho da fonte
	 * @return um {@link Icon} contendo a equação
	 */
	public static Icon getImage (String equation,int tam){
		TeXFormula formula = new TeXFormula(equation);
        Icon icon = formula.createTeXIcon(TeXConstants.STYLE_DISPLAY, tam);
        return icon;
	}
		
	/**
	 * Converte a arvore de expressões <code>b</code> para
	 * a liguagem TeX
	 * @param b a arvore de expressões a ser analizada
	 * @return uma String da equação, em formato TeX
	 */
	public static String getTeXEquation(BTNode b){
		String str="";
		boolean par=false;
		boolean noSignal=false;
		if (b!=null){
			if (b.getPai()!=null){
				BTNode pai=b.getPai();
				String value=b.getValue();
				if (pai.getValue().equals("*") && !b.isAbstract()){
					if (!b.eFolha() && !value.equals("^")&&
							!value.equals("R")){
						if (b.getValue().equals("+")&& 
								Funcoes.getMaisAEsquerda(b.getDir()).getValue().startsWith("-"))noSignal=true;
						par=true;
					}
					else if (b.getValue().startsWith("-"))par=true;
				}else if (Funcoes.getMaisAEsquerda(b).getValue().startsWith("-")
						&& b.ehFilhoDir() && !b.getPai().getValue().equals("=") &&
						b.getPai().getValue().equals("-") &&
						!b.getValue().equals("R")){par=true;
				}else if (!b.eFolha() && !value.equals("^")&&
						!value.equals("R") && Funcoes.getMaisAEsquerda(b.getDir()).getValue().startsWith("-")&&
						b.getValue().equals("+") && !b.getDir().getValue().equals("R"))noSignal=true;
				else if (pai.getValue().equals("^")){
					if (pai.getEsq().equals(b)&& !b.eFolha())par=true;
				}
			}else par=false;
			if (par)str+="(";
			if (b.getValue().equals("R"))str+="\\sqrt{"+getTeXEquation(b.getEsq())+"}";
			else if (b.getValue().equals("/"))str+="\\frac{"+getTeXEquation(b.getEsq())+"}" +
					"{"+getTeXEquation(b.getDir())+"}";
			else if (b.getValue().equals("*") && !b.isAbstract())str+=getTeXEquation(b.getEsq())+"\\times"
					+getTeXEquation(b.getDir());
			else if (b.eFolha()){
				if (b.isAbstract())str+="-";
				else{
					if (!(b.getValue().equals("*") &&
							(b.getEsq().isAbstract()||b.getDir().isAbstract())))str+= b.getValue();
				}
			}
			else {
				if (!b.eFolha() && b.isAbstract())str+=getTeXEquation(b.getEsq())+getTeXEquation(b.getDir());
				else if (noSignal)str+=getTeXEquation(b.getEsq())+getTeXEquation(b.getDir());
				else str+=getTeXEquation(b.getEsq())+b.getValue()+getTeXEquation(b.getDir());
			}
			if (par)str+=")";
		}
		return str;
	}
	
	public static void main(String[] args) throws InvalidValueException {
		JFrame f = new JFrame("Resolvedor de Problemas");
		String str = "x=((5-(((-5^2)-((4*1)*(-14)))R2))/(2*1))";
		String tex=getTeXEquation(new Expression(str).getRoot());
		Icon str2 = Symbols.getImage(tex);
		JLabel label = new JLabel(str2);
		f.getContentPane().add(label);
		f.setSize(100, 200);
		f.setVisible(true);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
	}
}
