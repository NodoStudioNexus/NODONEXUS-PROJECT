package org.nodonexus.Backend_nodoNexus.application.auth.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginRequest {
  @NotBlank(message = "El correo es requerido")
  @Email(message = "El formato del correo no es valido")
  private String email;

  @NotBlank(message = "La contraseña es requerida")
  private String password;
}
