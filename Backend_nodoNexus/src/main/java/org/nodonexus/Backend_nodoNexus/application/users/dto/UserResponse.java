package org.nodonexus.Backend_nodoNexus.application.users.dto;

import java.time.Instant;

import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import lombok.Data;

@Data
public class UserResponse {
	private Long id;
	private String email;
	private String primerNombre;
	private String primerApellido;
	private IdentityType tipoIdentidad;
	private String numeroIdentidad;
	private String telefono;
	private RoleEnum role;
	private Instant fechaRegistro;
	private boolean activo;
}