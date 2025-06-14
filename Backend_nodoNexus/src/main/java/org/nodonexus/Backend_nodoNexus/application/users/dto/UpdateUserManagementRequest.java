package org.nodonexus.Backend_nodoNexus.application.users.dto;

import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import lombok.Data;

@Data
public class UpdateUserManagementRequest {
	private Boolean activo;
	private String primerNombre;
	private String primerApellido;
	private String telefono;
	private RoleEnum role;
}