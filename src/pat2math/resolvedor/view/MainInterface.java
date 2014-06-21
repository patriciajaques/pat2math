package pat2math.resolvedor.view;


import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import pat2math.expressao.arvore.InvalidEquationException;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.resolvedor.Resolvedor;

public class MainInterface extends JPanel {
	
	
	private static final long serialVersionUID = 7365582129516871815L;
	private Control controller;
	private ResultInterface formulae = new ResultInterface();
	private Resolvedor solver;
	

	public MainInterface() {
		init();
	}

	public void init() {
		try {
			solver=new Resolvedor(true,new SolverProgressBar());
			setBackground(Color.WHITE);
			Titles t = new Titles();
			Calculator c = new Calculator(t.getEquation(), formulae); 
			controller = new Control (c, formulae,solver);
			this.setLayout(new BorderLayout(10, 10));
			this.add(t, BorderLayout.NORTH);
			JScrollPane scrollPane = new JScrollPane(formulae);
			this.add(scrollPane, BorderLayout.CENTER);
			this.add(c, BorderLayout.EAST);
			JButton resol = new JButton ("Resolver Equação");
			resol.addActionListener(new ActionListener(){public void actionPerformed(ActionEvent e) {
				formulae.limpa();
				resolveEquacao ();
			}});
			this.add(resol, BorderLayout.SOUTH);
			setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
		} catch (Exception e1) {
			JOptionPane.showMessageDialog(this, e1.getMessage(),"Erro",JOptionPane.ERROR_MESSAGE);
			System.exit(-1);
		}
	}

	public void resolveEquacao() {
		try {
			controller.start();
		} catch (Exception e) {
			if (e instanceof InvalidValueException || e instanceof InvalidEquationException){
				InvalidValueException iv=(InvalidValueException)e;
				JOptionPane.showMessageDialog(this, iv.message(), "Atenção", JOptionPane.WARNING_MESSAGE);
			}
		}
		
	}

	public static void centerContainer(Container container) {
		java.awt.Dimension screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
		int componentWidth = container.getWidth();
		int componentHeight = container.getHeight();
		container.setBounds((screenSize.width-componentWidth)/2,
				(screenSize.height-componentHeight)/2, componentWidth, componentHeight);
		}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		JFrame f = new JFrame("Resolvedor de Equações PATSolver");
		MainInterface main = new MainInterface();
		f.getContentPane().add(main);
		f.setSize(850, 550);
		centerContainer(f);
		f.setVisible(true);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});

	}

}
