package org.nodonexus.Backend_nodoNexus.application.proyectos.dto;

import lombok.Data;

@Data
public class FuncionalidadDTO {
	private Long id;
	private String nombre;
	private String descripcion;
	private String estado;
	private Double porcentajeAvance;
	private Long proyectoId;
}
