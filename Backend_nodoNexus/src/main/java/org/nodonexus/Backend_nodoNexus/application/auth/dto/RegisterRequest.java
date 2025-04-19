package org.nodonexus.Backend_nodoNexus.application.auth.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
	@NotBlank(message = "Correo electrónico requerido")
	@Email(message = "Formato de correo inválido")
	private String email;

	@NotBlank(message = "Contraseña requerida")
	private String password;

	@NotBlank(message = "Rol requerido")
	private String role;

	@NotBlank(message = "Primer nombre requerido")
	private String primerNombre;

	@NotBlank(message = "Primer apellido requerido")
	private String primerApellido;

	@NotBlank(message = "Tipo de identidad requerido")
	private String tipoIdentidad;

	@NotBlank(message = "Número de identidad requerido")
	private String numeroIdentidad;
}