package org.nodonexus.Backend_nodoNexus.application.solicitudProyecto.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CrearSolicitudRequest {

	@NotNull(message = "El email es obligatorio")
	@Email(message = "El email debe ser válido")
	@JsonProperty("email")
	private String email;
	@NotNull(message = "El nombre es obligatorio")
	private String nombre;
	@NotNull(message = "El apellido es obligatorio")
	private String apellido;
	@NotNull(message = "El número de identidad es obligatorio")
	private String numeroIdentidad;
	private String numeroTelefonico;
	private String tipoProyecto;
	private String descripcion;
	private Double presupuestoMin;
	private Double presupuestoMax;
	private String nombreProyecto;
	private Integer plazoEstimado;
	private String archivosAdjuntos;

	// Constructor vacío (necesario para Jackson)
	public CrearSolicitudRequest() {
	}

	// Getters y Setters
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getNumeroIdentidad() {
		return numeroIdentidad;
	}

	public void setNumeroIdentidad(String numeroIdentidad) {
		this.numeroIdentidad = numeroIdentidad;
	}

	public String getNumeroTelefonico() {
		return numeroTelefonico;
	}

	public void setNumeroTelefonico(String numeroTelefonico) {
		this.numeroTelefonico = numeroTelefonico;
	}

	public String getTipoProyecto() {
		return tipoProyecto;
	}

	public void setTipoProyecto(String tipoProyecto) {
		this.tipoProyecto = tipoProyecto;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Double getPresupuestoMin() {
		return presupuestoMin;
	}

	public void setPresupuestoMin(Double presupuestoMin) {
		this.presupuestoMin = presupuestoMin;
	}

	public Double getPresupuestoMax() {
		return presupuestoMax;
	}

	public void setPresupuestoMax(Double presupuestoMax) {
		this.presupuestoMax = presupuestoMax;
	}

	public String getNombreProyecto() {
		return nombreProyecto;
	}

	public void setNombreProyecto(String nombreProyecto) {
		this.nombreProyecto = nombreProyecto;
	}

	public Integer getPlazoEstimado() {
		return plazoEstimado;
	}

	public void setPlazoEstimado(Integer plazoEstimado) {
		this.plazoEstimado = plazoEstimado;
	}

	public String getArchivosAdjuntos() {
		return archivosAdjuntos;
	}

	public void setArchivosAdjuntos(String archivosAdjuntos) {
		this.archivosAdjuntos = archivosAdjuntos;
	}
}