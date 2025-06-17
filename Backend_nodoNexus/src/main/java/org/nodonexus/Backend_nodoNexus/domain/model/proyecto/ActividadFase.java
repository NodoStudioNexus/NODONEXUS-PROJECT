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
@Table(name = "actividades_fase")
public class ActividadFase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "fase_id", nullable = false)
	private FaseProyecto fase;

	@Column(name = "nombre_actividad", nullable = false)
	private String nombreActividad;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "estado", nullable = false)
	private String estado = "PENDIENTE";

	@Column(name = "fecha_inicio", nullable = false)
	private Instant fechaInicio = Instant.now();

	@Column(name = "fecha_fin")
	private Instant fechaFin;
}