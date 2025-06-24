package org.nodonexus.Backend_nodoNexus.application.proyectos.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CrearRequisitoRequest {
	private String descripcion;

	public Long getFuncionalidadId() {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getFuncionalidadId'");
	}
}