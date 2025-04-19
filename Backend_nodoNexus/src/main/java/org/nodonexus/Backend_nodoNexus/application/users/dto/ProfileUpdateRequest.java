package org.nodonexus.Backend_nodoNexus.application.users.dto;

import lombok.Data;
import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;

@Data
public class ProfileUpdateRequest {
	private String primerNombre;
	private String segundoNombre;
	private String primerApellido;
	private String segundoApellido;
	private IdentityType tipoIdentidad;
	private String numeroIdentidad;
	private String telefono;
}