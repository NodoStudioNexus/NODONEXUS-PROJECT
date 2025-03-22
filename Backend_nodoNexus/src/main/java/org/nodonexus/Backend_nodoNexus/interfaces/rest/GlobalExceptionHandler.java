package org.nodonexus.Backend_nodoNexus.interfaces.rest;

import org.nodonexus.Backend_nodoNexus.common.dto.ErrorResponse;
import org.nodonexus.Backend_nodoNexus.common.exception.AuthenticationException;
import org.nodonexus.Backend_nodoNexus.common.exception.EmailAlreadyExistsException;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidEmailException;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidPasswordException;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidRoleException;
import org.nodonexus.Backend_nodoNexus.common.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		error.setCode("AUTH_001");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		error.setCode("USER_001");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}

	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		error.setCode("REG_001");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}

	@ExceptionHandler(InvalidRoleException.class)
	public ResponseEntity<ErrorResponse> handleInvalidRoleException(InvalidRoleException ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		error.setCode("REG_002");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}

	@ExceptionHandler(InvalidEmailException.class)
	public ResponseEntity<ErrorResponse> handleInvalidEmailException(InvalidEmailException ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		error.setCode("AUTH_002");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
	}

	@ExceptionHandler(InvalidPasswordException.class)
	public ResponseEntity<ErrorResponse> handleInvalidPasswordException(InvalidPasswordException ex) {
		ErrorResponse error = new ErrorResponse();
		error.setMessage(ex.getMessage());
		error.setCode("AUTH_003");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
	}
}