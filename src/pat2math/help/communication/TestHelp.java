package pat2math.help.communication;

public class TestHelp {
/*
	private PopulateHelps ph;
	private List<Help> help;
	
	public TestHelp(){
		try {
			ph=new PopulateHelps("./Dicas.txt");
			ph.createList();
			help=ph.getHelp();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ph=null;
		}
	}
	
	@Override
	public List<Help> select(String op, int lvl) {
		List<Help> he=new ArrayList<Help>();
		if (help==null){
			he=new ArrayList<Help>();
			for (int i=1;i<=5;i++){
				Help h=new Help();
				h.setLevel(i);
				h.setOperation("AD");
				h.setDescription("Ajuda de soma de nivel "+i);
				h.setContent("AD");
				h.setId(1l);
				he.add(h);
			}
		}else{
			for (Help h:help){
				if (h.getOperation().equals(op)&& h.getLevel()==lvl)he.add(h);
			}
		}
		return he;
	}

	@Override
	public Hashtable<String, Integer> getMaxLvlOfHints() {
		Hashtable<String, Integer> help=new Hashtable<String, Integer>();
		for (Help h:this.help){
			if (help.get(h.getOperation())==null)help.put(h.getOperation(), h.getLevel());
			else if (help.get(h.getOperation())<h.getLevel())help.put(h.getOperation(), h.getLevel());
		}
		return help;
	}

	@Override
	public String getContentRelatedToHint(String tipo) {
		for (int i=0;i<help.size();i++){
			if (help.get(i).getOperation().equals(tipo))return help.get(i).getContent();
		}
		return "";
	}

	@Override
	public List<Mensagem> getErrorMessage() {
		List<Mensagem> m=new ArrayList<Mensagem>();
		m.add(new Mensagem("Não há dicas possiveis no momento."));
		return m;
	}

}
*/
}