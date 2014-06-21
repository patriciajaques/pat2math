package pat2math.expressao.arvore;

/**
 * Excessão de valor invalido na contrução da equação
 * @author Henrique M. Seffrin
 * @version 1.0, 12/01/2009
 *
 */
public class InvalidValueException extends Exception {

	private static final long serialVersionUID = 8915533006593550605L;

	private String message;
	
	public InvalidValueException(String msg){
		super(msg);
		this.message=msg;
	}
	
	public InvalidValueException(){
		super();
	}
	
	public String message(){
		return this.message;
	}
}
