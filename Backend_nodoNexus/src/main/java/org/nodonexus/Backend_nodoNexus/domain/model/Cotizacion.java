package org.nodonexus.Backend_nodoNexus.domain.model;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "cotizacion")
public class Cotizacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "solicitud_id", nullable = false, unique = true)
	private SolicitudProyecto solicitud;

	@Column(name = "costo_total", nullable = false)
	private BigDecimal costoTotal;

	@Column(name = "desglose_costos", columnDefinition = "jsonb", nullable = false)
	@JdbcTypeCode(SqlTypes.JSON)
	private String desgloseCostos;

	@Column(name = "tiempos_estimados", columnDefinition = "jsonb", nullable = false)
	@JdbcTypeCode(SqlTypes.JSON)
	private String tiemposEstimados;

	@Column(name = "alcance", nullable = false)
	private String alcance;

	@Column(name = "fecha_generacion", nullable = false)
	private Instant fechaGeneracion = Instant.now();

	@Column(name = "expiracion", nullable = false)
	private Instant expiracion;

	@Column(name = "archivo_url")
	private String archivoUrl;
}