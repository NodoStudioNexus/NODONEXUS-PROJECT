package org.nodonexus.Backend_nodoNexus.interfaces.rest.users;

import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileResponse;
import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileUpdateRequest;
import org.nodonexus.Backend_nodoNexus.application.users.service.UserProfileService;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserProfileService userProfileService;

	public UserController(UserProfileService userProfileService) {
		this.userProfileService = userProfileService;
	}

	// Ver el perfil del usuario autenticado
	@GetMapping("/profile")
	public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
		String email = authentication.getName();
		ProfileResponse profile = userProfileService.getProfile(email);
		return ResponseEntity.ok(profile);
	}

	// Actualizar datos del perfil
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(Authentication authentication,
			@RequestBody ProfileUpdateRequest request) {
		try {
			String email = authentication.getName();
			User updatedUser = userProfileService.updateProfile(email, request);
			return ResponseEntity.ok(updatedUser);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// Subir o actualizar la foto de perfil
	@PostMapping(value = "/profile/image", consumes = "multipart/form-data")
	public ResponseEntity<?> updateProfileImage(Authentication authentication,
			@RequestParam("image") MultipartFile image) {
		try {
			if (image == null || image.isEmpty()) {
				return ResponseEntity.badRequest().body("No se proporcionó ninguna imagen");
			}
			String email = authentication.getName();
			User updatedUser = userProfileService.updateProfileImage(email, image);
			return ResponseEntity.ok(updatedUser);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al procesar la imagen: " + e.getMessage());
		}
	}

	// Subir o actualizar la imagen de banner
	@PostMapping(value = "/profile/banner", consumes = "multipart/form-data")
	public ResponseEntity<?> updateBannerProfileImage(Authentication authentication,
			@RequestParam("image") MultipartFile image) {
		try {
			if (image == null || image.isEmpty()) {
				return ResponseEntity.badRequest().body("No se proporcionó ninguna imagen");
			}
			String email = authentication.getName();
			User updatedUser = userProfileService.updateBannerProfileImage(email, image);
			return ResponseEntity.ok(updatedUser);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al procesar la imagen: " + e.getMessage());
		}
	}
}