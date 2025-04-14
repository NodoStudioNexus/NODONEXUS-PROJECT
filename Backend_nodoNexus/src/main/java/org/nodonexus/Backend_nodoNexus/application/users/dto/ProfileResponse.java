package org.nodonexus.Backend_nodoNexus.application.users.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class ProfileResponse {
	private String email;
	private String nombre;
	private String apellido;
	private String telefono;
	private Instant fechaRegistro;
	private Instant ultimoAcceso;
	private boolean activo;
	private String profileImage;
	private String initial;
}