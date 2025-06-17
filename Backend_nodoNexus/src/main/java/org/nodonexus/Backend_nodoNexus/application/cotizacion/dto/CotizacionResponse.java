package org.nodonexus.Backend_nodoNexus.application.cotizacion.dto;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CotizacionResponse {
	private Long id;
	private Long solicitudId;
	private BigDecimal costoTotal;
	private String desgloseCostos;
	private String tiemposEstimados;
	private String alcance;
	private Instant fechaGeneracion;
	private Instant expiracion;
	private String archivoUrl;
	private String estado;
}