package org.nodonexus.Backend_nodoNexus.interfaces.rest.users;

import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileResponse;
import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileUpdateRequest;
import org.nodonexus.Backend_nodoNexus.application.users.dto.ChangePasswordRequest;
import org.nodonexus.Backend_nodoNexus.application.users.service.UserProfileService;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserProfileService userProfileService;
	private final PasswordEncoder passwordEncoder;

	public UserController(UserProfileService userProfileService, PasswordEncoder passwordEncoder) {
		this.userProfileService = userProfileService;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(Authentication authentication) {
		String email = authentication.getName();
		ProfileResponse profile = userProfileService.getProfile(email);
		return ResponseEntity.ok(profile);
	}

	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(Authentication authentication,
			@RequestBody ProfileUpdateRequest request) {
		try {
			String email = authentication.getName();
			userProfileService.updateProfile(email, request);
			ProfileResponse response = userProfileService.getProfile(email);
			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
		}
	}

	@PostMapping(value = "/profile/image", consumes = "multipart/form-data")
	public ResponseEntity<?> updateProfileImage(Authentication authentication,
			@RequestParam("image") MultipartFile image) {
		try {
			if (image == null || image.isEmpty()) {
				return ResponseEntity.badRequest().body(new ErrorResponse("No se proporcionó ninguna imagen"));
			}
			String email = authentication.getName();
			userProfileService.updateProfileImage(email, image);
			ProfileResponse response = userProfileService.getProfile(email);
			return ResponseEntity.ok(response);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Error al procesar la imagen: " + e.getMessage()));
		}
	}

	@PostMapping(value = "/profile/banner", consumes = "multipart/form-data")
	public ResponseEntity<?> updateBannerProfileImage(Authentication authentication,
			@RequestParam("image") MultipartFile image) {
		try {
			if (image == null || image.isEmpty()) {
				return ResponseEntity.badRequest().body(new ErrorResponse("No se proporcionó ninguna imagen"));
			}
			String email = authentication.getName();
			userProfileService.updateBannerProfileImage(email, image);
			ProfileResponse response = userProfileService.getProfile(email);
			return ResponseEntity.ok(response);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Error al procesar la imagen: " + e.getMessage()));
		}
	}

	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(Authentication authentication,
			@RequestBody ChangePasswordRequest request) {
		String email = authentication.getName();
		User user = userProfileService.findByEmail(email);

		if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
			return ResponseEntity.badRequest().body("La contraseña antigua es incorrecta");
		}

		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		user.setMustChangePassword(false);
		userProfileService.save(user);

		return ResponseEntity.ok("Usuario actualizó la contraseña satisfactoriamente");
	}

	private static class ErrorResponse {
		private final String message;

		public ErrorResponse(String message) {
			this.message = message;
		}

		public String getMessage() {
			return message;
		}
	}
}