package org.nodonexus.Backend_nodoNexus.application.cotizacion.dto;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.Data;

@Data
public class CrearCotizacionRequest {
	private Long solicitudId;
	private BigDecimal costoTotal;
	private String desgloseCostos; // JSON como String
	private String tiemposEstimados; // JSON como String
	private String alcance;
	private Instant expiracion;
	private String archivoUrl;
}