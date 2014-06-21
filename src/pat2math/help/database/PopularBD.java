package pat2math.help.database;

public class PopularBD {
	/*
	@SuppressWarnings("unchecked")
	public void popular() {
		EntityManagerFactory factory =
			Persistence.createEntityManagerFactory("help");
		EntityManager em = factory.createEntityManager();
		ArrayList<String> operacoes= new ArrayList<String>(Arrays.asList( new String[]{
				"AD",
				"SB",
				"DV",
				"MT",
				"MM",
				"DM",
				"FC",
				"QS",
				"QD",
				"PS",
				"BK",
				"OI",
				"SP",
				"RC",
				"FT",
				"RZ",
				"PT",
				"DF",
				"DT"
		}));

		Collections.sort(operacoes);
		Aluno alunoA=new Aluno ("Eu");
		Aluno alunoB=new Aluno ("Henrique");
		List<Aluno>al=new ArrayList<Aluno>();
		al.add(alunoA);
		al.add(alunoB);
		//limpar ajudas
		Query q = em.createQuery("select a from Ajuda a");
		List<Ajuda> h = q.getResultList();
//		while (!h.isEmpty()) {
//		em.remove(h.remove(0));			
//		}
		//limpar dados atuais do aluno
		for (Aluno a:al){
			List<AjudasAluno> aa=a.getAjuda();
			List<Conhecimento>cc=a.getConhecimento();
			em.getTransaction().begin();
			while (!aa.isEmpty()) {
				em.remove(aa.remove(0));			
			}
			while (!cc.isEmpty()){
				em.remove(cc.remove(0));
			}
			em.flush();
			
			//inicio da população de conhecimentos
			for (String winsdom: operacoes){
				int know= (int)(Math.random()*100);
				float porcen=know/100f;
				cc.add(new Conhecimento(porcen, winsdom));
//				}
			}
			em.persist(a);
			em.getTransaction().commit();
		}
		
		 * População para as dicas :
		 * "Este é uma dica de nivel x o da opearação y os termos são <eq ty> e <eq yt>"
		 * No nivel 5 acresecentar:
		 * "O próximo passo de solução da equação é <PP>."
		 
		int lvl=1;
		int j=0;
		while (j<operacoes.size()){
			for (int d=0;d<4;d++){
				String s=operacoes.get(j);
				Ajuda aj=new Ajuda();
				String msg="Este é a dica "+d+" de nivel "+lvl+" da operação "+s+".";
				if (lvl==5)msg+=" O próximo passo de solução da equação é <PP>.";	
				aj.setTexto(msg);
				aj.setNivel(lvl);
				aj.setTipo(s);
				aj.setConteudo(s);
				h.add(aj);
				
			}
			lvl++;
			if(lvl>=6){
				lvl=1;
				j++;
			}
		}
		String misc[]={
				"EqPrim_Ad_Num","AD",
				"EqPrim_Ad_Inc", "AD",
				"EqPrim_Ad_Sin", "AD",
				"EqPrim_Sb_Num", "SB",
				"EqPrim_Sb_Inc", "SB",
				"EqPrim_Sb_Sin", "SB",
				"EqPrim_Mt_Num", "MT",
				"EqPrim_Mt_Inc", "MT",
				"EqPrim_Mt_Sin", "MT",
				"EqPrim_Dv_Num", "DV",
				"EqPrim_Dv_Inc", "DV",
				"EqPrim_Dv_Sin", "DV",
				"EqPrim_Dv_Simp", "DV",
				"EqPrim_Pt_Num", "PT",
				"EqPrim_Pt_Inc", "PT",
				"EqPrim_Pt_Sin", "PT",
				"EqPrim_Rd_Num", "RZ",
				"EqPrim_Rd_Inc", "RZ",
				"EqPrim_Rd_Sin", "RZ",
				"EqPrim_OpPrim_Ad_Num/Inc","AD",
				"EqPrim_OpPrim_Sb_Num/Inc","SB",

				"EqSec_OpFrac_MMC_Ad-Lin","MM",
				"EqSec_OpFrac_MMC_Sub-Lin","MM",

				"EqSec_OpFrac_MMC_Den_Num/Inc","MM",
				"EqSec_OpFrac_MMC_Den_Inc","MM",
				"EqSec_OpFrac_MMC_MtNumerador","MM",
				"EqSec_OpFrac_Dv_Lin","DV",
				"EqSec_OpFrac_Mt_Inv","MT",
				"EqSec_OpFrac_Mt_Num_Frac","MT",
				"EqSec_Distrib_MtTerm","DM",
				"EqSec_Distrib_SinTerm", "DM",
				"EqSec_FC_Num","FC",
				"EqSec_FC_Inc","FC",
				"EqSec_RZ_Fat","FT",
				"EqSec_RZ_Ext-Ad","FT",
				"EqSec_RZ_Ext-Sb","FT",
				"EqSec_Par_~SinPref","?",

				"OI_Ad_Ad","OI",
				"OI_Sb_Sb","OI",
				"OI_Dv(+)_Dv(-)","OI",
				"OI_Dv(+)_Dv(+)","OI",
				"OI_Dv(+)_Mt(-)","OI",
				"OI_Dv(-)_Dv(-)","OI",
				"OI_Dv(-)_Dv(+)","OI",
				"OI_Dv(-)_Mt(+)","OI",
				"OI_Dv(-)_Ad","OI",
				"OI_Dv(-)_Sb","OI",
				"OI_Dv(+)_Ad","OI",
				"OI_Dv(+)_Sb","OI",
				"OI_Mt(+)_Mt(+)","OI",
				"OI_Mt(+)_Mt(-)","OI",
				"OI_Mt(+)_Dv(-)","OI",
				"OI_Mt(+)_Ad","OI",
				"OI_Mt(+)_Sb","OI",
				"OI_Mt(-)_Mt(+)","OI",
				"OI_Mt(-)_Mt(-)","OI",
				"OI_Mt(-)_Dv(+)","OI",
				"OI_Mt(-)_Ad","OI",
				"OI_Mt(-)_Sb","OI",

				"BK_Coef_a_c_b","BK",
				"BK_Coef_c_a_b","BK",
				"BK_Coef_b_a_c","BK",
				"BK_Coef_b_c_a","BK",
				"BK_Coef_c_b_a","BK",
				"BK_AplicForm_DelTerm","BK"
		};

		ArrayList<String> misco= new ArrayList<String>(Arrays.asList(misc));
		lvl=1;
		Ajuda aj=null;
		String tipo,conteudo;
		tipo=conteudo="";
		boolean done=false;
		while(!done){
			aj=new Ajuda();
			if (lvl==1){
				tipo=misco.remove(0);
				conteudo=misco.remove(0);
			}
			aj.setTipo(tipo);
			aj.setConteudo(conteudo);
			aj.setNivel(lvl);
			String msg="Este é uma dica da misconseption "+aj.getTipo()+" de  nivel "+lvl+" da" +
			" operação "+aj.getConteudo()+".";
			if (lvl==5)msg+=" O próximo passo de solução da equação é <PP>.";
			aj.setTexto(msg);
			h.add(aj);
			lvl++;
			if (lvl>=6) {
				if (misco.isEmpty())done=true;
				lvl=1;
			}
		}
		em.getTransaction().begin();
		for (Ajuda ajuda: h){
			em.persist(ajuda);
		}
		em.getTransaction().commit();
	}

	@SuppressWarnings("unchecked")
	public void destruir(){
		EntityManagerFactory factory =
			Persistence.createEntityManagerFactory("help");
		EntityManager em = factory.createEntityManager();
		Query q= em.createQuery("select a from Aluno a");
		List<Aluno> al=q.getResultList();
		for (Aluno a:al){
			List<AjudasAluno> aa=a.getAjuda();
			List<Conhecimento>cc=a.getConhecimento();
			em.getTransaction().begin();
			while (!aa.isEmpty()) {
				em.remove(aa.remove(0));			
			}
			while (!cc.isEmpty()){
				em.remove(cc.remove(0));
			}
			em.flush();
			em.remove(a);
			em.getTransaction().commit();
		}
		q=em.createQuery("select a from Ajuda a");
		List<Ajuda> h = q.getResultList();
		em.getTransaction().begin();
		while (!h.isEmpty()) {
			em.remove(h.remove(0));			
		}
		em.flush();
		em.getTransaction().commit();
	}
	
	public void mensagensErro(){
		EntityManagerFactory factory =
		Persistence.createEntityManagerFactory("help");
		EntityManager em = factory.createEntityManager();
		Mensagem m=new Mensagem ("Infelizmente não há dicas relacionadas a esta operação");
		em.getTransaction().begin();
		em.persist(m);
		em.getTransaction().commit();
	}

	public static void main(String[] args) {
		PopularBD p=new PopularBD();
		//p.destruir();
		//p.popular();
		p.mensagensErro();
	}
}
*/
}