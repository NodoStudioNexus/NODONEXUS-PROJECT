package org.nodonexus.Backend_nodoNexus.application.auth.dto;

import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;
import lombok.Data;
import java.time.Instant;

@Data
public class LoginResponse {
  private String token;
  private RoleEnum role;
  private String nombre;
  private String apellido;
  private String telefono;
  private Instant fechaRegistro;
  private Instant ultimoAcceso;
  private boolean activo;
  private String profileImage;
  private String initial;
}