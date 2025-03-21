package org.nodonexus.Backend_nodoNexus.common.event;

import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import lombok.Data;

@Data
public class LoginEvent {
	private final String email;
	private final RoleEnum role;
}