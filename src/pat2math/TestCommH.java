package pat2math;

public class TestCommH {
	/*
	private List<Help> lh;
	
	public TestCommH() {
		try {
			PopulateHelps ph = new PopulateHelps("C:\\Dicas.txt");
			ph.createList();
			lh = ph.getHelp();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public List<Help> select(String op, int lvl) {
		ArrayList<Help> ah=new ArrayList<Help>();
		for (Help h: lh){
			if (h.getOperation().equals(op)){
				ah.add(h);
			}
		}
		return ah;
	}

	@Override
	public Hashtable<String, Integer> getMaxLvlOfHints() {
		Hashtable<String, Integer> maxH=new Hashtable<String, Integer>();
		for (Help h:lh){
			if (maxH.get(h.getOperation())==null)maxH.put(h.getOperation(), h.getLevel());
			else if (maxH.get(h.getOperation())<h.getLevel()){
				maxH.put(h.getOperation(), h.getLevel());
			}
		}
		return maxH;
	}

	@Override
	public String getContentRelatedToHint(String tipo) {
		String content="";
		for (Help h:lh){
			if (h.getOperation().equals(tipo)){
				content= h.getContent();
				break;
			}
		}
		return content;
	}

	@Override
	public List<Mensagem> getErrorMessage() {
		ArrayList<Mensagem> err=new ArrayList<Mensagem>();
		err.add(new Mensagem("ERRO!!!"));
		return err;
			
	}


*/
	
}