package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;

import org.nodonexus.Backend_nodoNexus.common.constants.EstadoSolicitud;

import ch.qos.logback.classic.spi.STEUtil;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "solicitud_proyecto")
public class SolicitudProyecto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	private User usuario;

	@Column(name = "tipo_proyecto", nullable = false)
	private String tipoProyecto;

	@Column(name = "descripcion", nullable = false)
	private String descripcion;

	@Column(name = "presupuesto_Min")
	private Double presupuestoMin;

	@Column(name = "presupuesto_Max")
	private Double presupuestoMax;

	@Column(name = "nombre_Proyecto")
	private String nombreProyecto;

	@Column(name = "plazo_estimado")
	private Integer plazoEstimado;

	@Column(name = "archivos_adjuntos")
	private String archivosAdjuntos;

	@Column(name = "fecha_solicitud", nullable = false)
	private Instant fechaSolicitud;

	@Enumerated(EnumType.STRING)
	@Column(name = "estado", nullable = false)
	private EstadoSolicitud estado;

	@Column(name = "numero_telefonico")
	private String numeroTelefonico;

}
