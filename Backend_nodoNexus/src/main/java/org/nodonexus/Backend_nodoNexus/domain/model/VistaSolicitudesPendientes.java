package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "vista_solicitudes_pendientes")
public class VistaSolicitudesPendientes {

	@Id
	@Column(name = "solicitud_id")
	private Long id;

	@Column(name = "nombre_proyecto")
	private String nombreProyecto;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "estado")
	private String estado;

	@Column(name = "fecha_solicitud")
	private Instant fechaSolicitud;

	@Column(name = "cliente_email")
	private String clienteEmail;

	@Column(name = "cliente_nombre")
	private String clienteNombre;

	@Column(name = "cliente_apellido")
	private String clienteApellido;

	@Column(name = "cliente_numero_identidad")
	private String clienteNumeroIdentidad;
}