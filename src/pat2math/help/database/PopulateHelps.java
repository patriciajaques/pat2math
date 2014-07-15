package pat2math.help.database;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import pat2math.help.Help;
import pat2math.modeloAluno.Mensagem;
import pat2math.util.Funcoes;
import br.com.pat2math.studentModel.AgentSpeeches;
import br.com.pat2math.studentModel.Animation;
import br.com.pat2math.studentModel.Tip;

public class PopulateHelps {

	private String filename;
	private List<Tip> ajudas;

	public PopulateHelps(String path) {
		filename=path;
		ajudas=new ArrayList<Tip>();
	}

	public void createList(EntityManager em) throws Exception{
		File f= new File(filename);
		InputStreamReader is= new InputStreamReader(new FileInputStream(f),"UTF-8");
		Scanner scan=new Scanner(is);
		String line="";
		List<String>tipo=new ArrayList<String>();
		List <String> conteudo=new ArrayList<String>();
		int nivel=0;
		while (scan.hasNext()){
			line=scan.nextLine();
			//tratamento para o caracter de inicio de arquivo UTF-8
			if (!line.isEmpty() &&((int)line.charAt(0))==65279){
				if (line.length()>1)line=line.substring(1);
				else line="";
			}
			//indica que eh o codigo da operacao
			int spaceIndex=line.indexOf(" ");
			if (spaceIndex==-1)spaceIndex=line.length();
			//65279 caracter de inicio de arquivo usado em codificações UTF-8
			if (line.isEmpty()){
				//inicia uma nova entrada, limpar listas
				tipo.clear();
				conteudo.clear();
			}else if (!line.isEmpty()){
				if (!Funcoes.isInteger(line.charAt(0))){
					
					/*
					 * O tipo da ajuda, pois o que for numero eh ajuda
					 */
					tipo.add(line.substring(0,spaceIndex).toString()); // ateh o espaco eh tipo depois eh conteudo
					/*
					 * Conteudo da ajuda, nao confunfir com tipo,
					 * codigos de misconseptions sao tipos e n conteudos.
					 * Se forem varios conteudos eles estarão divididos por ";"
					 * logo nenhuma operação extra eh necessaria
					 */
					if (spaceIndex==line.length()){
						conteudo.add(line.substring(0,spaceIndex).toString());
						//+1 abaixo é para ignorar o espaço em branco
					} else conteudo.add(line.substring(spaceIndex+1).toString());
				}else if (Funcoes.isInteger(line.charAt(0))){
					/*
					 * Char para identificar a qual operação especifica da listagem
					 * o texto deve ser associado. Exemplo:
					 * QS
					 * QD
					 * 1a Que operação pode ser aplicada sobre (a+b)^2?
					 * 1b Que operação pode ser aplicada sobre (a-b)^2?
					 * 2 Qual relação se estabelece entre o produto notável Quadrado da Soma/Diferença?
					 * 3 Utilize o produto notável:... 
					 * 
					 * 1a => QS
					 * 1b => QD
					 * 2 => Ambas
					 * 3 => Ambas 
					 */
					char tipoHelp=' '; 
					//se for o nivel sem a letra indicando a ajuda a ser associada
					if (Funcoes.isInteger(line.substring(0, spaceIndex))){
						nivel = Integer.parseInt(line.substring(0, spaceIndex));
					}else{
						//o unico char antes do primeiro espaço 
						tipoHelp=Character.toLowerCase(line.charAt(spaceIndex-1));
						nivel=Integer.parseInt(line.substring(0,spaceIndex-1));

					}
					if (tipoHelp==' '){	
						int contentIndex=0;
						for (String t:tipo){
							Tip h=new Tip();
							h.setContent(conteudo.get(contentIndex));
							h.setLevel(nivel);
							
							
							int animePosition= line.lastIndexOf("#");
							String desc;
							if (animePosition>0){
								desc = line.substring(line.indexOf(" ")+1,animePosition);
								String animation = line.substring(animePosition+1);
							
								Animation anime = new Animation();
								anime.setCode(animation);
								em.persist(anime);
						
								h.setAnimation(anime);
							}else {desc=line.substring(line.indexOf(" ")+1);
								Animation anime = new Animation();
							//	anime.setCode("NO");
								em.persist(anime);
								h.setAnimation(anime);
							}
							h.setDescription(desc);
							h.setOperation(t);
							ajudas.add(h);
							contentIndex++;
						}
					}else{
						//transforma 'a' em 0, 'b' em 1...
						int typeIndex=(int)tipoHelp;
						typeIndex-=97;
						if (typeIndex<tipo.size() && typeIndex>=0){
							Tip h=new Tip();
							h.setContent(conteudo.get(typeIndex));
							h.setLevel(nivel);
							h.setDescription(line.substring(line.indexOf(" ")+1));
							h.setOperation(tipo.get(typeIndex));
							ajudas.add(h);
						}
					}
				//	System.out.println("Adicinado: "+ ajudas.get(ajudas.size()-1));
				}
			}
		}
		
		em.getTransaction().commit();
		em.getTransaction().begin();
		
		scan.close();
	}

	public void printListFile () {
		File out= new File (filename+".table");
		if (!out.exists()){
			try {
				BufferedWriter bf=new BufferedWriter(new FileWriter(out));
				bf.write("Operação\tNível\tConteúdo\tDescrição\tAnimation\n");
				for (Tip h: ajudas){
					bf.write(h.getOperation()+"\t"+h.getLevel()+"\t"+h.getContent()+"\t"+ h.getDescription()+"\t"+h.getAnimation().getCode()+"\n");
				}
				bf.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	public List<Tip> getHelp(){
		return ajudas;
	}

/*	public static void main(String[] args) throws Exception {
		PopulateHelps ph= new PopulateHelps("Dicas.txt");
		try {
			
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("pat2math");
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			
			ph.createList(em);
			//ph.printListFile();

			List<Tip> a = ph.getHelp();
			
			for(Tip p : a) {
				if(p.getAnimation() == null) {
					Animation anime = new Animation();
					anime.setCode("NO");
					em.persist(anime);
					p.setAnimation(anime);
				}
				
				em.persist(p);
			}
			
			AgentSpeeches m=new AgentSpeeches("Infelizmente não há dicas relacionadas a esta operação");
			em.persist(m);
			
			em.getTransaction().commit();
			em.close();
			emf.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/
}
