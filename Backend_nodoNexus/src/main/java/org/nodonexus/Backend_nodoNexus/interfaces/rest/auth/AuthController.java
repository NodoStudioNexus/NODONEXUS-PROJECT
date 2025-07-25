package org.nodonexus.Backend_nodoNexus.interfaces.rest.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import javax.validation.Valid;

import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginRequest;
import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginResponse;
import org.nodonexus.Backend_nodoNexus.application.auth.dto.RegisterRequest;
import org.nodonexus.Backend_nodoNexus.application.auth.service.AuthService;
import org.nodonexus.Backend_nodoNexus.application.auth.service.EmailService;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidTokenException;
import org.nodonexus.Backend_nodoNexus.common.exception.UserNotFoundException;
import org.nodonexus.Backend_nodoNexus.common.utils.JwtUtils;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;
	private final UserService userService;
	private final JwtUtils jwtUtils;
	private final PasswordEncoder passwordEncoder;
	private final EmailService emailService;

	public AuthController(AuthService authService, UserService userService, JwtUtils jwtUtils,
			PasswordEncoder passwordEncoder, EmailService emailService) {
		this.authService = authService;
		this.userService = userService;
		this.jwtUtils = jwtUtils;
		this.passwordEncoder = passwordEncoder;
		this.emailService = emailService;
	}

	@PostMapping("/login")
	@Operation(summary = "Inicia sesión y devuelve un token JWT y rol")
	@ApiResponse(responseCode = "200", description = "Login exitoso")
	@ApiResponse(responseCode = "401", description = "Credenciales inválidas")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
		LoginResponse response = authService.login(request);
		User user = userService.findByEmail(request.getEmail());
		response.setMustChangePassword(user.isMustChangePassword());
		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	@Operation(summary = "Registra un nuevo usuario")
	@ApiResponse(responseCode = "201", description = "Usuario registrado exitosamente")
	@ApiResponse(responseCode = "400", description = "Datos inválidos o error en el registro")
	public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
		authService.register(
				request.getEmail(),
				request.getPassword(),
				request.getRole(),
				request.getPrimerNombre(),
				request.getPrimerApellido(),
				request.getTipoIdentidad(),
				request.getNumeroIdentidad());
		return ResponseEntity.status(201).body("Usuario registrado exitosamente");
	}

	@PostMapping("/forgot-password")
	@Operation(summary = "Solicitar restablecimiento de contraseña.", description = "Envía un correo con un enlace para restablecer la contraseña.")
	@ApiResponse(responseCode = "200", description = "Sí el correo existe, enviará un enlace de restablecimiento.")
	@ApiResponse(responseCode = "400", description = "Error en la solicitud.")
	public ResponseEntity<String> forgotPassword(@RequestParam String email) {
		try {
			User user = userService.findByEmail(email);
			String resertToken = jwtUtils.generateResetToken(user.getEmail());
			user.setResetToken(resertToken);
			userService.save(user);
			emailService.sendResetPasswordEmail(user.getEmail(), resertToken);
			return ResponseEntity.ok("Si el correo está registrado se enviara un enlace de restalecimiento..");
		} catch (UserNotFoundException e) {
			return ResponseEntity.ok("Si el correo está registrado se enviar un enlace de restablecimiento oo..");
		}
	}

	@PostMapping("/reset-password")
	@Operation(summary = "Restablecer Contraseña", description = "Restablecer la contraseña utilizando un token valido.")
	@ApiResponse(responseCode = "200", description = "Contraseña restablecida correctamente.")
	@ApiResponse(responseCode = "400", description = "Token invalido, expirado o ya utilizado")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		try {
			String email = jwtUtils.getEmailFromResetToken(token);
			User user = userService.findByEmail(email);
			if (!token.equals(user.getResetToken())) {
				throw new InvalidTokenException("Token invalido o ya utilizado ... ");
			}
			user.setPassword(passwordEncoder.encode(newPassword));
			user.setResetToken(null);
			userService.save(user);
			return ResponseEntity.ok("Contraseña restablecida correctamente");
		} catch (Exception e) {
			throw new InvalidTokenException("tokem invalido, expirado o ya utilizado.");
		}
	}
}