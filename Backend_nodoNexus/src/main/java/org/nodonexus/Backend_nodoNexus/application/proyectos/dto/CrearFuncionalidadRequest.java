package org.nodonexus.Backend_nodoNexus.application.proyectos.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CrearFuncionalidadRequest {
	private String nombre;
	private String descripcion;

}