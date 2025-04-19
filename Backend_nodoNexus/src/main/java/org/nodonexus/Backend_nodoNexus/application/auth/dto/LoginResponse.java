package org.nodonexus.Backend_nodoNexus.application.auth.dto;

import lombok.Data;
import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import java.time.Instant;

@Data
public class LoginResponse {
  private String token;
  private RoleEnum role;
  private String primerNombre;
  private String segundoNombre;
  private String primerApellido;
  private String segundoApellido;
  private IdentityType tipoIdentidad;
  private String numeroIdentidad;
  private String telefono;
  private Instant fechaRegistro;
  private Instant ultimoAcceso;
  private boolean activo;
  private String profileImage;
  private String bannerProfileImage;
  private String initial;
}