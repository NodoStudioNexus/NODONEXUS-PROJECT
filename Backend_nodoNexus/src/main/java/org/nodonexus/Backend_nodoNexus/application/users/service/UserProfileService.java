package org.nodonexus.Backend_nodoNexus.application.users.service;

import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileResponse;
import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileUpdateRequest;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.service.UserService;
import org.nodonexus.Backend_nodoNexus.infrastructure.external.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserProfileService {
	private final UserService userService;
	private final ImageService imageService;

	public UserProfileService(UserService userService, ImageService imageService) {
		this.userService = userService;
		this.imageService = imageService;
	}

	// Obtener el perfil del usuario
	public ProfileResponse getProfile(String email) {
		User user = userService.findByEmail(email);
		ProfileResponse response = new ProfileResponse();
		response.setEmail(user.getEmail());
		response.setNombre(user.getNombre());
		response.setApellido(user.getApellido());
		response.setTelefono(user.getTelefono());
		response.setFechaRegistro(user.getFechaRegistro());
		response.setUltimoAcceso(user.getUltimoAcceso());
		response.setActivo(user.isActivo());
		response.setProfileImage(user.getProfileImage());
		response.setInitial(user.getProfileImage() == null || user.getProfileImage().isEmpty()
				? user.getNombre().substring(0, 1).toUpperCase()
				: null);
		return response;
	}

	// Actualizar datos del perfil
	public User updateProfile(String email, ProfileUpdateRequest request) {
		User user = userService.findByEmail(email);
		user.setNombre(request.getNombre());
		user.setApellido(request.getApellido());
		user.setTelefono(request.getTelefono());
		return userService.save(user);
	}

	// Actualizar la imagen de perfil
	public User updateProfileImage(String email, MultipartFile image) throws IOException {
		User user = userService.findByEmail(email);
		String imagePath = imageService.saveAndCompressImage(image);
		user.setProfileImage(imagePath);
		return userService.save(user);
	}
}