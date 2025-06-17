package org.nodonexus.Backend_nodoNexus.domain.model.proyecto;

import java.time.Instant;

import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.User;

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
@Table(name = "proyectos")
public class Proyecto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "solicitud_id", nullable = false)
	private SolicitudProyecto solicitud;

	@ManyToOne
	@JoinColumn(name = "cliente_id", nullable = false)
	private User cliente;

	@Column(name = "nombre_proyecto", nullable = false)
	private String nombreProyecto;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "fecha_inicio", nullable = false)
	private Instant fechaInicio = Instant.now();

	@Column(name = "estado", nullable = false)
	private String estado = "INICIADO"; //

	@Column(name = "documentacion_url")
	private String documentacionUrl;

	@Column(name = "porcentaje_avance")
	private Double porcentajeAvance;
}