package pat2math.resolvedor.view;


import java.awt.Color;
import java.awt.GridLayout;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;

import pat2math.util.Symbols;

public class ResultInterface extends JPanel {

	private static final long serialVersionUID = 7822154557600771099L;
	public static int NRO_LINES = 80;
	private JLabel label[];
	private int line = 0;

	public ResultInterface() {
		this.setSize(650, 400);
		setBorder(BorderFactory.createTitledBorder(" Resolução da Equação:   "));
		init();
	}

	public void init() {
		setLayout (new GridLayout(NRO_LINES,1));
		label =  new JLabel [NRO_LINES];
		for (int i=0; i<NRO_LINES; i++) {
			label[i] = new JLabel (" ");
			this.add (label[i]);			
	
		}
		setBackground(Color.WHITE);

	}
	
	public void setFormula (String f) {
		label[0].setText(f);
	}
	
	public String getFormula () {
		return label[0].getText();
	}
	
	public void incLine (){
		line ++;
	}
	public void decLine (){
		line --;
	}
	
	public void setNextStep (String f) {
		label[++line].setForeground(new Color(42,10,133));
		label[line].setText(f);
		
	}
	
	public void setNextEquation (String f){
		label[++line].setForeground(new Color(0,105,232));
		label[line].setIcon(Symbols.getImage(f));
		
	}
	public String getNextStep () {
		return label[line].getText();
	}
	public void limpa() {
		line =0;
		for (int i=0; i<NRO_LINES; i++) {
			label[i].setText (" ");
			label[i].setIcon(null);
		}
		
	}


}
