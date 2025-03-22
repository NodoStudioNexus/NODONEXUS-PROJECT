package org.nodonexus.Backend_nodoNexus.common.event;

import lombok.Data;

@Data
public class LoginEvent {
	private final String email;
	private final String role;
}