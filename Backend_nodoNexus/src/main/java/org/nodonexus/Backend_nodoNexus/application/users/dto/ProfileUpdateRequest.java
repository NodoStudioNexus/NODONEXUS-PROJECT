package org.nodonexus.Backend_nodoNexus.application.users.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
	private String nombre;
	private String apellido;
	private String telefono;
}