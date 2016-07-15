package br.com.pat2math.studentModel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * AQUI TEM TODAS AS DICAS COM SEUS RESPECTIVOS CÓDIGOS DE TIPO DE EQUAÇÃO
 * tip == dica == hint !!!!
 * 
 * @author Savanna
 *
 */
@Entity
@Table(name="tip")
public class Tip {
	
	//ID na tabela
	@Id @GeneratedValue
	private Long id;
	
	//
	@Transient // == transitório 
	private int pedidosConsecutivos = 0;

	//A frase e o lugar para por o número com <...>
	@Column(length=255, nullable=true, updatable=false)
	private String description;
	
	//Código da operação == AD/SB
	@Column(length=40, nullable=true, updatable=true)
	private String content;
	
	//Puxa da tabela operation o código da operação
	@Column(length=40, nullable=true, updatable=true)
	private String operation;
	
	//Determina um nível para cada código de operação
	@Column(length=1, nullable=true, updatable=true)
	private Integer level;
	
	//1 lista da tabela resolution_step
	@ManyToMany(mappedBy="tips", targetEntity=ResolutionStep.class)									 
	private List<ResolutionStep> resolutionSteps = new ArrayList<ResolutionStep>();
	
	//1 lista da tabela animation
	@ManyToOne
	@JoinColumn(name="id_animation", referencedColumnName="id", nullable=false)
	private Animation animation;
	
	private boolean deprecated;

	public int getPedidosConsecutivos() {
		return pedidosConsecutivos;
	}

	public void setPedidosConsecutivos(int pedidosConsecutivos) {
		this.pedidosConsecutivos = pedidosConsecutivos;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public List<ResolutionStep> getResolutionSteps() {
		return resolutionSteps;
	}

	public void setResolutionSteps(List<ResolutionStep> resolutionSteps) {
		this.resolutionSteps = resolutionSteps;
	}

	public Animation getAnimation() {
		return animation;
	}

	public void setAnimation(Animation animation) {
		this.animation = animation;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Deprecated = Obsoleto = que já não se usa; arcaico, antigo.
	 * @return
	 */
	public boolean isDeprecated() {
		return deprecated;
	}

	public void setDeprecated(boolean deprecated) {
		this.deprecated = deprecated;
	}
}