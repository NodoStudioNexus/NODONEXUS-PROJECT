package org.nodonexus.Backend_nodoNexus.application.proyectos.dto;

import lombok.Data;

@Data
public class RequisitoDTO {
	private Long id;
	private Long funcionalidadId;
	private String descripcion;
	private String nombre;
	private String estado;
}