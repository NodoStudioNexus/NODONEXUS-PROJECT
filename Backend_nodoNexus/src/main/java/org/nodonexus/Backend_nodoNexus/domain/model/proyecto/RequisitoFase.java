package org.nodonexus.Backend_nodoNexus.domain.model.proyecto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "requisito_fase")
public class RequisitoFase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "requisito_id", nullable = false)
	private Requisito requisito;

	@ManyToOne
	@JoinColumn(name = "fase_proyecto_id", nullable = false)
	private FaseProyecto faseProyecto;

	@Column(name = "estado", nullable = false)
	private String estado = "PENDIENTE";
}