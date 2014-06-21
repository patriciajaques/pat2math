package pat2math.analisaEquacao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import pat2math.modeloAluno.ModeloAluno;

public class Pontos{

	private ModeloAluno ma;
	private List<String> blackList;
	
	public Pontos (ModeloAluno ma){
		this.ma=ma;
		initBlackList();
	}
	
	private void initBlackList(){
		blackList=new ArrayList<String>();
		blackList.addAll(Arrays.asList("UT","ER","OG","DE","PA","PM","AS"));
		Collections.sort(blackList);
	}
	
	public int getPontos(String exp){
		int pontos=0;
		try{
			List<String> passos=ma.mostrarPassos(exp);
			for (String p: passos){
				if (Collections.binarySearch(blackList, p.split(";")[0])<0)pontos+=10;
			//	System.out.println(p);
			}
		}catch(Exception e ){
			e.printStackTrace();
		}
		return pontos;
	}
	
	public static void main(String[] args) throws Exception {
		Pontos a = new Pontos(new ModeloAluno());
		System.out.println("Pontos: "+a.getPontos("3x+3=4x-3"));
	}
}
