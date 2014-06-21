package pat2math.expressao.arvore;

/**
 * Excessão que indica que uma dada expressão não é uma equação algébrica
 * @author Henrique M. Seffrin
 *
 */
public class InvalidEquationException extends InvalidValueException{
	
	private static final long serialVersionUID = -5702635855314193042L;
	
	private String cause;
	
	public InvalidEquationException(String message, String cause){
		super(message);
		this.cause=cause;
	}
	
	public String message(){
		return super.message()+": "+ cause;
	}
	
	public String getLocalizedMessage(){
		return message();
	}
	
}
