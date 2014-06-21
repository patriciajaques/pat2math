package pat2math.resolvedor.view;

import javax.swing.JWindow;

import pat2math.regras.Progress;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * SolverProgressBar.java
 *
 * Created on 13/11/2009, 17:57:27
 */

/**
 * Compões a janela de carga do resolvedor
 * @author Henrique M. Seffrin
 */
public class SolverProgressBar extends JWindow implements Progress{

	
	private static final long serialVersionUID = 3196582032392910251L;

	/** Construtor de SolverProgressBar */
    public SolverProgressBar() {
        initComponents();
    }

    /**
     * Constroi a interface
     */
    // <editor-fold defaultstate="collapsed" desc="Generated Code">
    private void initComponents() {

    	jPanel1 = new javax.swing.JPanel();
        jProgressBar1 = new javax.swing.JProgressBar();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));

        jProgressBar1.setForeground(new java.awt.Color(0, 105, 232));

        jLabel1.setText("Carregando...");

        jLabel2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/pat2math/resolvedor/view/logo.png"))); // NOI18N

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel1)
                    .addComponent(jLabel2, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 623, Short.MAX_VALUE))
                .addContainerGap())
            .addComponent(jProgressBar1, javax.swing.GroupLayout.DEFAULT_SIZE, 633, Short.MAX_VALUE)
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jProgressBar1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        java.awt.Dimension screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        setBounds((screenSize.width-631)/2, (screenSize.height-316)/2, 631, 316);
    }

    /**
    * @param args the command line arguments
    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new SolverProgressBar().setVisible(true);
            }
        });
    }

    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JProgressBar jProgressBar1;
    
	@Override
	public void addProgress() {
		jProgressBar1.setIndeterminate(false);
		jProgressBar1.setValue(jProgressBar1.getValue()+25);
		if (jProgressBar1.getValue()==100){
			setVisible(false);
			dispose();
		}
	}

	@Override
	public void changeText(String text) {
		jLabel1.setText(text);
	}

	@Override
	public void start() {
		setVisible(true);
	}

}
