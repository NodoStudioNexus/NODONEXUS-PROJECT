package org.nodonexus.Backend_nodoNexus.interfaces.rest.users;

import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileResponse;
import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileUpdateRequest;
import org.nodonexus.Backend_nodoNexus.application.users.service.UserProfileService;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
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
		String email = authentication.getName(); // Obtiene el email del JWT
		ProfileResponse profile = userProfileService.getProfile(email);
		return ResponseEntity.ok(profile);
	}

	// Actualizar datos del perfil
	@PutMapping("/profile")
	public ResponseEntity<User> updateProfile(Authentication authentication,
			@RequestBody ProfileUpdateRequest request) {
		String email = authentication.getName();
		User updatedUser = userProfileService.updateProfile(email, request);
		return ResponseEntity.ok(updatedUser);
	}

	// Subir o actualizar la foto de perfil
	@PostMapping("/profile/image")
	public ResponseEntity<User> updateProfileImage(Authentication authentication,
			@RequestParam("image") MultipartFile image) throws IOException {
		String email = authentication.getName();
		User updatedUser = userProfileService.updateProfileImage(email, image);
		return ResponseEntity.ok(updatedUser);
	}
}