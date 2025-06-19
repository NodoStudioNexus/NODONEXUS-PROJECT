package org.nodonexus.Backend_nodoNexus.application.proyectos.dto;

import java.time.Instant;

import lombok.Data;

@Data
public class VistaProyectoCompleto {
	private Long proyectoId;
	private String nombreProyecto;
	private String descripcion;
	private String proyectoEstado;
	private Instant fechaInicio;
	private Double porcentajeProyecto;
	private Long faseId;
	private String nombreFase;
	private String faseDescripcion;
	private Integer orden;
	private String faseEstado;
	private Instant faseFechaCreacion;
	private Double porcentajeFase;
}