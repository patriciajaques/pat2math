package pat2math.resolvedor.view;


import java.awt.Color;
import java.awt.GridLayout;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Titles extends JPanel {
	
	private static final long serialVersionUID = 1L;
	private JLabel equation = new JLabel("");

	public Titles() {
		init();
	}

	public void init() {
		setLayout(new GridLayout(2, 1));
		equation.setForeground(new Color(0,105,232));
		add(setTitle());
		add(equation);
		setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));
		setBackground(Color.WHITE);
	}

	public JLabel getEquation() {
		return equation;
	}

	public void setEquation(JLabel equation) {
		this.equation = equation;
	}

	public JLabel setTitle() {
		JLabel l = new JLabel("Digite a equação clicando nos botões ao lado:           ");
		l.setBorder(BorderFactory.createEmptyBorder(0,0,5,0));
		return l;
	}

}
