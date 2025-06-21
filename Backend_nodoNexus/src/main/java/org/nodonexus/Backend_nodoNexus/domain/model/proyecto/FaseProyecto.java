package org.nodonexus.Backend_nodoNexus.domain.model.proyecto;

import java.time.Instant;

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
@Table(name = "fases_proyecto")
public class FaseProyecto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "proyecto_id", nullable = false)
	private Proyecto proyecto;

	@Column(name = "nombre_fase", nullable = false)
	private String nombreFase;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "orden", nullable = false)
	private Integer orden;

	@Column(name = "estado", nullable = false)
	private String estado = "PENDIENTE";

	@Column(name = "fecha_creacion", nullable = false)
	private Instant fechaCreacion = Instant.now();

	@Column(name = "porcentaje_avance")
	private Double porcentajeAvance = 0.00;
}