package org.nodonexus.Backend_nodoNexus.interfaces.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import javax.validation.Valid;

import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginRequest;
import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginResponse;
import org.nodonexus.Backend_nodoNexus.application.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	@Operation(summary = "Inicia sesión y devuelve un token JWT y rol")
	@ApiResponse(responseCode = "200", description = "Login exitoso")
	@ApiResponse(responseCode = "401", description = "Credenciales inválidas")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
		LoginResponse response = authService.login(request);
		return ResponseEntity.ok(response);
	}
}