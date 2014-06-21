package pat2math.gerador;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.util.Funcoes;

public class Gerador {

	private static int LIMIT_MIN=-999;
	private static int LIMIT_MAX=999;
	private static int A=0;
	private static int B=1;
	private static int C=2;
	private static int D=3;
	private static int E=4;
	private static String variables[]=new String [5];
	private static ArrayList<BTNode> removeList=new ArrayList<BTNode>();
	
	
	private static int getRandom(int min,int max, boolean zero){
		int intmaxmin=max-min; //numero de valores entre max e min;
		intmaxmin++; //como random é exclusivo para 1 o MAX nunca sera exibido logo max+1 que sera exclusivo pelo random
		int random;
		boolean repeat;
		do{
			repeat=false;
			random= min+(int)(intmaxmin*Math.random());
			if (!zero && random==0)repeat=true;
		}while(repeat);
		System.out.println(random);
		return random;
	}
	
	public static String gerarEquacao(String template, int limitMin, int limitMax, boolean zero){
		if (limitMin>=LIMIT_MIN && limitMax<=LIMIT_MAX){
			//int intmaxmin=limitMax-limitMin; //numero de valores entre max e min;
			//intmaxmin++; //como random é exclusivo para 1 o MAX nunca sera exibido logo max+1 que sera exclusivo pelo random
			for (int i=0;i<5;i++){
				variables[i]=String.valueOf(getRandom(limitMin, limitMax,zero));
			}
			return fillEquation(template);
			/*StringBuffer equacao=new StringBuffer(template);
			char c;
			boolean inc=false;
			for (int i=0;i<equacao.length();i++){
				c=equacao.charAt(i);
				inc=false;
				if (i<equacao.length()-1 &&Funcoes.isInc(equacao.charAt(i+1)))inc=true;
				switch (c) {
				case 'a':
					fillEquation(equacao, variables,i, A, inc);
					break;
				case 'b':
					fillEquation(equacao, variables,i, B, inc);
					break;
				case 'c':
					fillEquation(equacao, variables,i, C, inc);
					break;
				case 'd':
					fillEquation(equacao, variables,i, D, inc);
					break;
				case 'e':
					fillEquation(equacao, variables,i, E, inc);
					break;
				default:
					break;
				}
			}
			return equacao.toString();*/
		}
		return template;
	}
	
	private static String fillEquation(String template){
		if (!template.isEmpty()){
			try {
				Expression e=new Expression(template);
				makeSubstitution(e.getRoot());
				removeNodesMarked();
				e.setmod();
				return e.getCleanExpression();
			} catch (InvalidValueException e) {
				return template;
			}
		}
		return template;
	}
	
	private static void makeSubstitution(BTNode bt){
		if (bt!=null){
			if (!bt.eFolha()){
				makeSubstitution(bt.getEsq());
				makeSubstitution(bt.getDir());
			}else{
				String value=bt.getValue();
				boolean inc=false;
				if (bt.getLast()!='d' && Funcoes.isInc(bt.getLast())){
					value=value.substring(0,value.length()-1);
					inc=true;
				}
				char c= value.charAt(value.length()-1);
				String nValue="";
				switch (c){
					case 'a':
						nValue=variables[A];
						break;
					case 'b':
						nValue=variables[B];
						break;	
					case 'c':
						nValue=variables[C];
						break;
					case 'd':
						nValue=variables[D];
						break;	
					case 'e':
						nValue=variables[E];
						break;	
					default:
						nValue=String.valueOf(c);
						break;
				}
				nValue=processValues(nValue, inc);
				//processar caso "-(-d)" d=um inteiro sorteado
				BTNode esq,dir;
				value=bt.getValue();
				if (nValue.startsWith("-") && bt.getFirst()=='-'){
					esq=new BTNode("-1",true);
					//remove o - que ja foi criado no nodo esq
					value=value.substring(1);
					nValue=value.replace(String.valueOf(c), nValue);
					dir=new BTNode(nValue);
					bt.setValue("*");
					bt.setEsq(esq);
					bt.setDir(dir);
				}else if(nValue.equals("0") && inc){
					if (bt.getPai().getValue().equals("^") || bt.getPai().getValue().equals("R")){
						removeList.add(bt.getPai());
					}else removeList.add(bt);//eliminar caso 0x
				}
				else{
					if (nValue.equals("0") && bt.getFirst()=='-')bt.setValue(bt.getValue().substring(1));
					nValue=bt.getValue().replace(String.valueOf(c), nValue);
					bt.setValue(nValue);
				}
			}
		}
	}
	
	private static void removeNodesMarked(){
		for (BTNode bt:removeList){
			if (bt.getPai()!=null)Expression.removeDaArvore(bt);
		}
	}
	
	/*private static void fillEquation(StringBuffer equacao,int[] randomNumbers, int index, int option, boolean inc){
		equacao.deleteCharAt(index);
		String value=processValues(randomNumbers[option], inc);
		if (value.equals("ZERO")){
			equacao.deleteCharAt(index);//remove a incognita se o inteiro é zero
			if (index< equacao.length()&&(equacao.charAt(index)=='^' || equacao.charAt(index)=='R')){
				equacao.delete(index, index+2);//em caso de 0x^2 ou 0R2, index+2 pois eh exclusive
			}
			if (index>0 &&index< equacao.length() && (equacao.charAt(index-1)=='-'||
										   equacao.charAt(index-1)=='+' ||
										   equacao.charAt(index-1)=='*'))equacao.deleteCharAt(index-1);//remove o sinal que sobra
			if (index==equacao.length()){
				if (equacao.charAt(index-1)=='=')equacao.insert(index, 0);
				else if (equacao.charAt(index-1)=='-' && equacao.charAt(index-2)=='='){
					equacao.deleteCharAt(index-1);
					equacao.append(0);
				}
			}
		}else equacao.insert(index, value);
		 
		 * Não da ZERO pois não ha incognita, mas há o caso de zero poder estar no inicio ou no fim (depois do =)
		 * de uma equação e neste caso não há sinad
		 
		if (index>0 && value.equals("0")&& (index-1==0 || equacao.charAt(index-2)=='='))equacao.deleteCharAt(index-1);
		if (!value.equals("ZERO") && index>0 && index<equacao.length()-1 && value.startsWith("-")){
			if(equacao.charAt(index-1)=='+')equacao.deleteCharAt(index-1);
			else if(equacao.charAt(index-1)=='-'){
				equacao.insert(index, "(");
				index+=value.length();
				if (inc)index++;
				//se for na ultima posicao entao tem que concatenar em vez de adicionar
				if (index<equacao.length()-1)equacao.insert(index+1, ")");
				else equacao.append(")");
			}
		}
		
	}*/
	
	private static String processValues(String v, boolean inc){
		String nValue=v;
		if (inc){
			if (v.equals("1"))nValue="";
			else if (v.equals("-1"))nValue="-";
			else if (v.equals("-0"))nValue="0";
		}
		return nValue;
	}
	
	/*private static String processValues(int v, boolean inc){
		if (inc && (v<=1 && v>=-1)){
			String nValue;
			switch (v) {
			case 1:
				nValue="";
				break;
			case -1:
				nValue="-";
				break;
			default:
				nValue="ZERO";
				break;
			}
			return nValue;
		}else return String.valueOf(v);
	}*/
	
	public static ArrayList<String> gerarEquacaoFromFile(String file, int min, int max, boolean zero) throws FileNotFoundException{
		Scanner scan=new Scanner(new File(file));
		ArrayList<String> list=new ArrayList<String>();
		while (scan.hasNext()) {
			String s = scan.nextLine();
			list.add(s);
		}
		scan.close();
		return gerarEquacao(list, min, max,zero);
	}
	
	public static ArrayList<String> gerarEquacao(ArrayList<String> templates, int min, int max, boolean zero){
		ArrayList<String> equacoes=new ArrayList<String>();
		for (String template:templates){
			System.out.println(template);
			equacoes.add(gerarEquacao(template, min, max,zero));
			System.out.println(equacoes.get(equacoes.size()-1));
		}
		return equacoes;
	}
	
	public static void main(String[] args) throws FileNotFoundException {
		//System.out.println(Gerador.gerarEquacao("-c*(ax+b)=-dx", 0, 10,true));
		System.out.println(Gerador.gerarEquacaoFromFile("out.txt", 0, 10,true));
	}
}
