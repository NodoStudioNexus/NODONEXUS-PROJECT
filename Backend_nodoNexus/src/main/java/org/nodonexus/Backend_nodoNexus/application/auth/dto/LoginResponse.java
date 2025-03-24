package org.nodonexus.Backend_nodoNexus.application.auth.dto;

import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import lombok.Data;

@Data
public class LoginResponse {
  private String token;
  private RoleEnum role;
}
