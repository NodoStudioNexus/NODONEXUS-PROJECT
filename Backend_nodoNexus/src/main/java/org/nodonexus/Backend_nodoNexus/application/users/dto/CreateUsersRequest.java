package org.nodonexus.Backend_nodoNexus.application.users.dto;

import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import lombok.Data;

@Data
public class CreateUsersRequest {
    private String email;
    private String primerNombre;
    private String primerApellido;
    private IdentityType tipoIdentidad;
    private String numeroIdentidad;
    private String telefono;
    private RoleEnum role;
}