package org.nodonexus.Backend_nodoNexus.application.auth.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class RegisterRequest {
	@NotBlank(message = "Correo electronico Requerido")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Contraseña requerida")
	private String password;

	@NotBlank(message = "El Rol es requerido")
	private String role;

}
