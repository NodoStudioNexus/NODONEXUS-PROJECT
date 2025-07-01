package org.nodonexus.Backend_nodoNexus.application.cotizacion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActualizarEstadoCotizacionRequest {
	private String estado;
}
