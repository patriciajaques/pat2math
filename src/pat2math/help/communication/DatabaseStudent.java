package pat2math.help.communication;


public class DatabaseStudent  {//implements CommunicationMA
	/*	
	private DatabaseManagerStudent ds;
	
	public DatabaseStudent(){
		ds=new DatabaseManagerStudent("help");
	}
	
	public void insert(Aluno a){
		ds.insert(a);
	}
	
	@Override
	public Aluno select(String chaveBusca) {
		List<?> obj=ds.find(chaveBusca);
		for (Object o:obj){
			if (obj.get(0) instanceof Aluno) return (Aluno)o;
		}
		return null;
	}

	//@Override
	//public boolean update(Aluno al) {
//		Aluno db=ds.find(al.getId());
//		if (db==al)return ds.update();
//		else{
//			db.setAjuda(al.getAjuda());
//			db.setConhece(al.getConhecimento());
//			db.setNome(al.getNome());
//			db.setAcoes(al.getAcoes());
//			return ds.update();
//		}
		//return ds.update(al);
	//}
	
	public boolean update (){
		return ds.update();
	}
	
	public Travas getTrava(String aluno, String operacao){
		return ds.findTrava(aluno, operacao);
	}

	@Override
	public AjudasAluno getAjudaRequisitada(int idAjudaRequisitada, String nomeAluno) {
		return ds.getAjudaRequisitada(idAjudaRequisitada, nomeAluno);
	}

	@Override
	public Aluno selectLogin(String login) {
		return ds.findLogin(login);
	}

	@Override
	public boolean updateAcoes(String login, Acoes a) {
		Aluno aluno= ds.findLogin(login);
		if (aluno!=null){
			aluno.setAcao(a);
			return true;
		}else return false;
	}

}
*/
	
}