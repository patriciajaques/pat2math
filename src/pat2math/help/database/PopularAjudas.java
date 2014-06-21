package pat2math.help.database;

public class PopularAjudas {
	/*
	public void popular(EntityManager em) {
		List <Ajuda> aj=new ArrayList<Ajuda>();
		aj.add(createAjuda("AD",1,"Há termos nesta equação que se pode aplicar uma das 4 operações básicas.","AD"));
		aj.add(createAjuda("AD",2,"Qual operação é descrita entre os termos <eq t+> e <eq +t>?","AD"));
		aj.add(createAjuda("AD",3,"A equação apresenta termos compatíveis para serem somados.","AD"));
		aj.add(createAjuda("AD",4,"Os termos <eq t+>  e <eq +t>  estão ligados por uma operação de soma.","AD"));
		aj.add(createAjuda("AD",5,"Some <eq t+> com <eq +t>. Resultando em <PP>.","AD"));
		
		aj.add(createAjuda("SB", 1, "Há termos nesta equação que se pode aplicar uma das 4 operações básicas.", "SB"));
		aj.add(createAjuda("SB", 2, "Qual operação é descrita entre os termos <eq t-> e <eq -t>?", "SB"));
		aj.add(createAjuda("SB", 3, "A equação apresenta termos compatíveis para serem subtraídos.", "SB"));
		aj.add(createAjuda("SB", 4, "Os termos <eq t->  e <eq -t> estão ligados por uma operação de subtração.", "SB"));
		aj.add(createAjuda("SB", 5, "Subtraia <eq t-> com <eq -t>. Resultando em <PP>.", "SB"));
		
		aj.add(createAjuda("MT", 1, "Há termos nesta equação que se pode aplicar uma das 4 operações básicas.", "MT"));
		aj.add(createAjuda("MT", 2, "Qual operação é descrita entre os termos <eq t*> e <eq *t>?", "MT"));
		aj.add(createAjuda("MT", 3, "A equação apresenta termos compatíveis para serem multiplicados.", "MT"));
		aj.add(createAjuda("MT", 4, "Os termos <eq t*>  e <eq *t> estão ligados por uma operação de multiplicação.", "MT"));
		aj.add(createAjuda("MT", 5, "Multiplique <eq t*> por <eq *t>. Resultando em <PP>.", "MT"));
		
		aj.add(createAjuda("DV",1,"Há termos nesta equação que se pode aplicar uma das 4 operações básicas.","DV"));
		aj.add(createAjuda("DV",2,"Qual operação é descrita entre os termos <eq t/> e <eq /t>?","DV"));
		aj.add(createAjuda("DV",3,"O termo <eq t/> é múltiplo de <eq /t>.","DV"));
		aj.add(createAjuda("DV",4,"Os termos <eq t/>  e <eq /t> estão ligados por uma operação de divisão.","DV"));
		aj.add(createAjuda("DV",5,"Divida <eq t/> por </t>. Resultando em <PP>.","DV"));
		
		aj.add(createAjuda("DM", 1, "Que operação pode ser aplicada sobre <eq t*> e <eq *t>?", "DM"));
		aj.add(createAjuda("DM", 2, "Que propriedade da multiplicação permite operar <eq t*> com <eq *t>?", "DM"));
		aj.add(createAjuda("DM", 3, "Aplique a propriedade distributiva da multiplicação nos termos <eq t*> e <eq *t>.", "DM"));
		
		aj.add(createAjuda("MM", 1, "Há frações nesta equação, como fazemos a equivalência delas?", "MM"));
		aj.add(createAjuda("MM", 2, "Observe que as frações a serem operadas possuem denominadores diferentes. O que você pode fazer para operá-las?", "MM"));
		aj.add(createAjuda("MM", 3, "Calcule o Mínimo Múltiplo Comum dos termos <eq /t1> <eq /t2> <eq /t3>.", "MM"));
		
		aj.add(createAjuda("OI", 1, "Há dois termos que podem ser operados, no entanto esses estão em lados opostos da igualdade. O que pode ser feito para operá-los?", "OI"));
		aj.add(createAjuda("OI", 2, "Como operar <eq tOI> e <eq OIt> ?", "OI"));
		aj.add(createAjuda("OI", 3, "Qual a operação inversa do termo <eq tOI> ?", "OI"));
		aj.add(createAjuda("OI", 4, "Aplique a operação inversa em <eq tOI>. Resultando em <PP>.", "OI"));
		
		aj.add(createAjuda("SP", 1, "Há uma operação possível de ser aplicada sobre a fração <eq t/t>.", "SP"));
		aj.add(createAjuda("SP", 2, "Nesta situação há termos equivalentes. Qual operação aplicar para que esta fração se torne irredutível?", "SP"));
		aj.add(createAjuda("SP", 3, "Os termos <eq t/ > e <eq /t> possuem um número múltiplo em comum.", "SP"));
		aj.add(createAjuda("SP", 4, "Esta fração pode ser simplificada.", "SP"));
		aj.add(createAjuda("SP", 5, "Simplifique <eq t/> e <eq /t>, resultando em <PP>.", "SP"));
			
		String [] s={"EqPrim_Ad_Num","AD",
		"EqPrim_Ad_Inc", "AD",
		"EqPrim_Sb_Num", "SB",
		"EqPrim_Sb_Inc", "SB",
		"EqPrim_Mt_Num", "MT",
		"EqPrim_Mt_Inc", "MT",
		"EqPrim_Dv_Num", "DV",
		"EqPrim_Dv_Inc", "DV",
		"EqPrim_Dv_Simp", "DV"};
		
		for (int i=0;i<s.length-1;i+=2){
			aj.add(createAjuda(s[i],1, "Você aplicou corretamente a operação especificada?", s[i+1]));
			aj.add(createAjuda(s[i],2, "Aplique novamente a operação de X sobre os mesmos termos e confira novamente o resultado obtido.", s[i+1]));
			aj.add(createAjuda(s[i],3, "O resultado correto desta operação é <PP>.", s[i+1]));
		}
		
		String st[]={"EqPrim_Mt_Sin", "MT",
		"EqPrim_Dv_Sin", "DV"};
		
		for (int i=0;i<st.length-1;i+=2){
			aj.add(createAjuda(st[i],1, "O sinal do valor que você obteve está correto? Tem certeza?", st[i+1]));
			aj.add(createAjuda(st[i],2, "Lembre-se que nesta operação os sinais dos termos também são operados.", st[i+1]));
			aj.add(createAjuda(st[i],3, "O resultado correto é <PP>.", st[i+1]));
		}
				
		aj.add(createAjuda("EqPrim_OpPrim_Ad_Num/Inc", 1, "Tem certeza que é possível somar <eq t+> com <eq +t>?", "AD"));
		aj.add(createAjuda("EqPrim_OpPrim_Ad_Num/Inc", 2, "Quais os requisitos necessários pra se realizar uma operação de soma/subtração sobre um número e uma incógnita?", "AD"));
		aj.add(createAjuda("EqPrim_OpPrim_Ad_Num/Inc", 3, "Você não pode operar um inteiro com uma incógnita.", "AD"));
		
		aj.add(createAjuda("EqPrim_OpPrim_Sb_Num/Inc", 1, "Tem certeza que é possível subtrair <eq t-> com <eq -t>?", "SB"));
		aj.add(createAjuda("EqPrim_OpPrim_Sb_Num/Inc", 2, "Quais os requisitos necessários pra se realizar uma operação de soma/subtração sobre um número e uma incógnita?", "SB"));
		aj.add(createAjuda("EqPrim_OpPrim_Sb_Num/Inc", 3, "Você não pode operar um inteiro com uma incógnita.", "SB"));
		
		aj.add(createAjuda("EqSec_OpFrac_MMC_Ad-Lin", 1, "A operação realizada foi <eq t/1> + <eq t/2>  e <eq /t1> + <eq /t2>. Isto é correto?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Ad-Lin", 2, "Como é realizada a soma de frações? O que deve ser calculado primeiro?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Ad-Lin", 3, "Observe que as frações a serem operadas possuem denominadores diferentes. O que você pode fazer para operá-las?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Ad-Lin", 4, "Para se resolver está operação você deve aplicar o MMC", "MM"));
		
		aj.add(createAjuda("EqSec_OpFrac_MMC_Sub-Lin", 1, "A operação realizada foi <eq t/1> - <eq t/2>  e <eq /t1> - <eq /t2>. Isto é correto?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Sub-Lin", 2, "Como é realizada a subtração de frações? O que deve ser calculado primeiro?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Sub-Lin", 3, "Observe que as frações a serem operadas possuem denominadores diferentes. O que você pode fazer para operá-las?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Sub-Lin", 4, "Para se resolver está operação você deve aplicar o MMC", "MM"));
		
		aj.add(createAjuda("EqSec_OpFrac_MMC_Den_Num/Inc", 1, "O Mínimo Múltiplo Comum foi calculado corretamente?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Den_Num/Inc", 2, "Lembre-se das regras de cálculo do MMC, se há números e incógnitas nos denominadores, eles são unidos ou mantidos separados?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_Den_Num/Inc", 3, "No cálculo do MMC o valor obtido deve ser divisível por todos os denominadores da fração.", "MM"));
		
		
		aj.add(createAjuda("EqSec_OpFrac_MMC_MtNumerador", 1, "Após a aplicação do MMC, qual o próximo passo?", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_MtNumerador", 2, "Utilize o MMC obtido em conjunto com os numeradores e denominadores, de cada fração,  para calcular os novos valores das frações.", "MM"));
		aj.add(createAjuda("EqSec_OpFrac_MMC_MtNumerador", 3, "Lembre-se: o MMC deverá ser  dividido pelo denominador e o resultado desta divisão deverá multiplicar o numerador.", "MM"));
		
		aj.add(createAjuda("EqSec_OpFrac_Dv_Lin",1,"Está certo de que a divisão de frações é resolvida desta forma?","DV"));
		aj.add(createAjuda("EqSec_OpFrac_Dv_Lin",2,"Você dividiu <eq t/1> com <eq t/2> este processo é utilizado em outra operação. Como é o processo da divisão de frações?","DV"));
		aj.add(createAjuda("EqSec_OpFrac_Dv_Lin",3,"Divida <eq t/1> por <eq /t2> e <eq /t1> por <eq t/2>.","DV"));
		
		aj.add(createAjuda("EqSec_OpFrac_Mt_Inv",1,"Está certo de que a multiplicação de frações é resolvida dessa forma?","MT"));
		aj.add(createAjuda("EqSec_OpFrac_Mt_Inv",2,"Você multiplicou <eq t/1> com <eq /t2> este processo é utilizado em outra operação. Como é o processo da multiplicação de frações?","MT"));
		aj.add(createAjuda("EqSec_OpFrac_Mt_Inv",3,"Multiplique <eq t/1> por <eq t/2> e <eq /t1> por <eq /t2>.","MT"));
				
		aj.add(createAjuda("EqSec_Distrib_MtTerm", 1, "Não faltam termos a serem multiplicados?", "DM"));
		aj.add(createAjuda("EqSec_Distrib_MtTerm", 2, "A operação distributiva da multiplicação é válida para todos os termos/números que estão entre os parênteses.", "DM"));
		aj.add(createAjuda("EqSec_Distrib_MtTerm", 3, "Todos os termos da expressão <eq t*> devem ser multiplicados por cada termo da expressão <eq *t>.", "DM"));
		
		aj.add(createAjuda("EqSec_Distrib_SinTerm", 1, "Está certo de que a os sinais dos termos do resultado foram corretamente ajustados? Você multiplicou corretamente todos os termos? Os sinais estão corretos?", "DM"));
		aj.add(createAjuda("EqSec_Distrib_SinTerm", 2, "Como proceder com os sinais dos termos em uma multiplicação?", "DM"));
		aj.add(createAjuda("EqSec_Distrib_SinTerm", 3, "Lembre-se: se há um valor negativo na multiplicação então o resultado é negativo, caso contrário é positivo.", "DM"));
		
		aj.add(createAjuda("EqSec_Par_~SinPref", 1, "Não há outra operação que deve ser realizada primeiro?", "MT"));
		aj.add(createAjuda("EqSec_Par_~SinPref", 2, "Lembre-se da precedência de operadores.", "MT"));
		aj.add(createAjuda("EqSec_Par_~SinPref", 3, "Níveis de precedência:\n1-( )\n 2- [ ]\n 3-{ }\n 4- Multiplicação e Divisão\n5- Soma e Subtração", "MT"));
		
		aj.add(createAjuda("OI_Ad_Ad", 1, "Qual a operação inversa da soma?", "OI"));
		aj.add(createAjuda("OI_Ad_Ad", 2, "Mantenha o equilíbrio da equação: ao remover uma quantia de um lado você deve remover do outro lado também. Lembre-se do princípio aditivo.", "OI"));
		aj.add(createAjuda("OI_Ad_Ad", 3, "A operação inversa da soma é a subtração.", "OI"));
		
		aj.add(createAjuda("OI_Sb_Sb", 1, "Qual a operação inversa da subtração?", "OI"));
		aj.add(createAjuda("OI_Sb_Sb", 2, "Mantenha o equilíbrio da equação: ao adicionar uma quantia de um lado você deve adicionar no outro lado também.Lembre-se do princípio aditivo.", "OI"));
		aj.add(createAjuda("OI_Sb_Sb", 3, "A operação inversa da subtração é a soma.", "OI"));
		
		
		String oi[]={"OI_Dv(+)_Dv(-)","OI_Dv(+)_Dv(+)","OI_Dv(-)_Dv(-)","OI_Dv(-)_Dv(+)"};
		for (int i=0;i<oi.length;i++){
			aj.add(createAjuda(oi[i], 1, "Você deve aplicar a operação inversa sobre a operação e não sobre os sinais dos termos.", "OI"));
			aj.add(createAjuda(oi[i], 2, "Qual é a operação?", "OI"));
			aj.add(createAjuda(oi[i], 3, "Você deve aplicar a regra da operação inversa sobre a divisão.", "OI"));
		}
		
		
		aj.add(createAjuda("OI_Dv(+)_Mt(-)", 1, "Você quase acertou na regra da operação inversa, pois algo a mais foi alterado.", "OI"));
		aj.add(createAjuda("OI_Dv(+)_Mt(-)", 2, "Esta alteração a mais que você fez seria correto se fosse operação inversa de duas outras operações.", "OI"));
		aj.add(createAjuda("OI_Dv(+)_Mt(-)", 3, "Na operação inversa, não se altera o sinal do termo, apenas a operação. A operação inversa é multiplicação/divisão e não adição/subtração.", "OI"));
		
		aj.add(createAjuda("OI_Dv(-)_Mt(+)", 1, "Você quase acertou na regra da operação inversa, pois algo a mais foi alterado.", "OI"));
		aj.add(createAjuda("OI_Dv(-)_Mt(+)", 2, "Esta alteração a mais que você fez seria correto se fosse operação inversa de duas outras operações.", "OI"));
		aj.add(createAjuda("OI_Dv(-)_Mt(+)", 3, "Na operação inversa, não se altera o sinal do termo, apenas a operação. A operação inversa é multiplicação/divisão e não adição/subtração.", "OI"));
		
		String oiAS[]={"OI_Dv(-)_Ad","OI_Dv(-)_Sb","OI_Dv(+)_Ad","OI_Dv(+)_Sb"};
		
		for (int i=0;i<oiAS.length;i++){
			aj.add(createAjuda(oiAS[i], 1, "A operação inversa que você realizou não é possível de ser realizada. Pois as operações são incompatíveis.", "OI"));
			aj.add(createAjuda(oiAS[i], 2, "Qual a operação inversa da divisão?", "OI"));
			aj.add(createAjuda(oiAS[i], 3, "Na operação inversa, não se altera o sinal do termo, apenas a operação. A operação inversa é multiplicação/divisão e não adição/subtração.", "OI"));
		}
		
		String oiM[]={"OI_Mt(+)_Mt(+)","OI_Mt(+)_Mt(-)","OI_Mt(-)_Mt(+)","OI_Mt(-)_Mt(-)"};
		
		for(int i=0;i<oiM.length;i++){
			aj.add(createAjuda(oiM[i], 1, "Você deve aplicar a operação inversa sobre a operação e não sobre os sinais dos termos.", "OI"));
			aj.add(createAjuda(oiM[i], 2, "Qual é a operação?", "OI"));
			aj.add(createAjuda(oiM[i], 3, "Você deve aplicar a regra da operação inversa sobre a multiplicação.", "OI"));
		}
		
		String oiMAS[]={"OI_Mt(+)_Ad","OI_Mt(+)_Sb","OI_Mt(-)_Ad","OI_Mt(-)_Sb"};
		
		for (int i=0;i<oiMAS.length;i++){
			aj.add(createAjuda(oiMAS[i],1,"A operação inversa que você realizou não é possível de ser realizada. Pois as operações são incompatíveis.","OI"));
			aj.add(createAjuda(oiMAS[i],2,"Qual a operação inversa da multiplicação?","OI"));
			aj.add(createAjuda(oiMAS[i],3,"Na operação inversa, não se altera o sinal do termo, apenas a operação. A operação inversa é multiplicação/divisão e não adição/subtração.","OI"));
		}

		
		aj.add(createAjuda("OI_Mt(+)_Dv(-)", 1, "Você quase acertou na regra da operação inversa, pois algo a mais foi alterado.", "OI"));
		aj.add(createAjuda("OI_Mt(+)_Dv(-)", 2, "Está alteração a mais que você fez seria correto se fosse operação inversa de duas outras operações.", "OI"));
		aj.add(createAjuda("OI_Mt(+)_Dv(-)", 3, "Na operação inversa, não se altera o sinal do termo, apenas a operação. A operação inversa é multiplicação/divisão e não adição/subtração.", "OI"));
		
		aj.add(createAjuda("OI_Mt(-)_Dv(+)", 1, "Você quase acertou na regra da operação inversa, pois algo a mais foi alterado.", "OI"));
		aj.add(createAjuda("OI_Mt(-)_Dv(+)", 2, "Está alteração a mais que você fez seria correto se fosse operação inversa de duas outras operações.", "OI"));
		aj.add(createAjuda("OI_Mt(-)_Dv(+)", 3, "Na operação inversa, não se altera o sinal do termo, apenas a operação. A operação inversa é multiplicação/divisão e não adição/subtração.", "OI"));
		
		Mensagem m=new Mensagem("Infelizmente não há uma ajuda relacionada este erro");
		limparAjuda(em);
		
		em.persist(m);
		em.getTransaction().begin();
		for (Ajuda h:aj){
			em.persist(h);
		}
		em.getTransaction().commit();

	}
	
	@SuppressWarnings("unchecked")
	public static void limparAjuda(EntityManager em){
		Query q = em.createQuery("select a from Ajuda a");
		List<Ajuda> he = q.getResultList();
		em.getTransaction().begin();
		while (!he.isEmpty()) {
			em.remove(he.remove(0));			
		}
		em.flush();
		em.getTransaction().commit();
	}
	
	public static Ajuda createAjuda(String op, int lvl, String texto, String conteudo){
		Ajuda a=new Ajuda();
		a.setTipo(op);
		a.setNivel(lvl);
		a.setTexto(texto);
		a.setConteudo(conteudo);
		return a;
	}
}

*/
}