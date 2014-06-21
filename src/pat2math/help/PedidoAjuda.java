package pat2math.help;

public class PedidoAjuda {
	
	private int pedidosConsecutivos;
	
	private boolean madeAction;
	
	
	public PedidoAjuda(){
		this.pedidosConsecutivos=0;
		madeAction=true;
	}
	
	
	public void update(){
		if (!madeAction)pedidosConsecutivos++;
		else pedidosConsecutivos=0;
	}
	
	public void madeAction(){
		madeAction=true;
	}
	
	public void requestHint(){
		madeAction=false;
	}
	
	public int getPedidosConsecutivos(){
		return pedidosConsecutivos;
	}
	
	
}
