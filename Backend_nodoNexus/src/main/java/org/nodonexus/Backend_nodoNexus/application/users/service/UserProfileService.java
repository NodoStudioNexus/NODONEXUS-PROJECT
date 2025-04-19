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
		response.setPrimerNombre(user.getPrimerNombre());
		response.setSegundoNombre(user.getSegundoNombre());
		response.setPrimerApellido(user.getPrimerApellido());
		response.setSegundoApellido(user.getSegundoApellido());
		response.setTipoIdentidad(user.getTipoIdentidad());
		response.setNumeroIdentidad(user.getNumeroIdentidad());
		response.setTelefono(user.getTelefono());
		response.setFechaRegistro(user.getFechaRegistro());
		response.setUltimoAcceso(user.getUltimoAcceso());
		response.setActivo(user.isActivo());
		response.setProfileImage(user.getProfileImage());
		response.setBannerProfileImage(user.getBannerProfileImage());
		response.setInitial(user.getProfileImage() == null || user.getProfileImage().isEmpty()
				? user.getPrimerNombre().substring(0, 1).toUpperCase()
				: null);
		response.setRole(user.getRole());
		return response;
	}

	// Actualizar datos del perfil
	public User updateProfile(String email, ProfileUpdateRequest request) {
		User user = userService.findByEmail(email);

		// Validar campos obligatorios
		if (request.getPrimerNombre() == null || request.getPrimerNombre().isEmpty()) {
			throw new IllegalArgumentException("El primer nombre es obligatorio");
		}
		if (request.getPrimerApellido() == null || request.getPrimerApellido().isEmpty()) {
			throw new IllegalArgumentException("El primer apellido es obligatorio");
		}
		if (request.getTipoIdentidad() == null) {
			throw new IllegalArgumentException("El tipo de identidad es obligatorio");
		}
		if (request.getNumeroIdentidad() == null || request.getNumeroIdentidad().isEmpty()) {
			throw new IllegalArgumentException("El número de identidad es obligatorio");
		}

		// Actualizar campos
		user.setPrimerNombre(request.getPrimerNombre());
		user.setSegundoNombre(request.getSegundoNombre());
		user.setPrimerApellido(request.getPrimerApellido());
		user.setSegundoApellido(request.getSegundoApellido());
		user.setTipoIdentidad(request.getTipoIdentidad());
		user.setNumeroIdentidad(request.getNumeroIdentidad());
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

	// Actualizar la imagen de banner
	public User updateBannerProfileImage(String email, MultipartFile image) throws IOException {
		User user = userService.findByEmail(email);
		String imagePath = imageService.saveAndCompressImage(image);
		user.setBannerProfileImage(imagePath);
		return userService.save(user);
	}
}