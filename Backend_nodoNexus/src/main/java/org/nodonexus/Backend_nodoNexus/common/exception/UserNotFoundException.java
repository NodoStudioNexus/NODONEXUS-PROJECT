package org.nodonexus.Backend_nodoNexus.common.exception;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(String message) {
		super(message);
	}
}