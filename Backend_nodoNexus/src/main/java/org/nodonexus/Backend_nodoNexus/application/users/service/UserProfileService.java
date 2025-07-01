package org.nodonexus.Backend_nodoNexus.application.users.service;

import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileResponse;
import org.nodonexus.Backend_nodoNexus.application.users.dto.ProfileUpdateRequest;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.service.UserService;
import org.nodonexus.Backend_nodoNexus.infrastructure.external.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserProfileService {

	private static final Logger logger = LoggerFactory.getLogger(UserProfileService.class);

	private final UserService userService;
	private final ImageService imageService;
	private final SimpMessagingTemplate messagingTemplate;

	public UserProfileService(UserService userService, ImageService imageService,
			SimpMessagingTemplate messagingTemplate) {
		this.userService = userService;
		this.imageService = imageService;
		this.messagingTemplate = messagingTemplate;
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

		User updatedUser = userService.save(user, true);

		// Notificar a los clientes
		logger.info("Notificando actualización de perfil para el usuario: {}", email);
		messagingTemplate.convertAndSend("/topic/profile_updated", email);

		return updatedUser;
	}

	// Actualizar la imagen de perfil
	public User updateProfileImage(String email, MultipartFile image) throws IOException {
		User user = userService.findByEmail(email);

		// Eliminar la imagen antigua si existe
		if (user.getProfileImage() != null && !user.getProfileImage().isEmpty()) {
			imageService.deleteImage(user.getProfileImage());
		}

		// Guardar la nueva imagen
		String imagePath = imageService.saveAndCompressImage(image);
		user.setProfileImage(imagePath);

		User updatedUser = userService.save(user, true);

		// Notificar a los clientes
		logger.info("Notificando actualización de imagen de perfil para el usuario: {}", email);
		messagingTemplate.convertAndSend("/topic/profile_updated", email);

		return updatedUser;
	}

	// Actualizar la imagen de banner
	public User updateBannerProfileImage(String email, MultipartFile image) throws IOException {
		User user = userService.findByEmail(email);

		// Eliminar la imagen antigua si existe
		if (user.getBannerProfileImage() != null && !user.getBannerProfileImage().isEmpty()) {
			imageService.deleteImage(user.getBannerProfileImage());
		}

		// Guardar la nueva imagen
		String imagePath = imageService.saveAndCompressImage(image);
		user.setBannerProfileImage(imagePath);

		User updatedUser = userService.save(user, true);

		// Notificar a los clientes
		logger.info("Notificando actualización de imagen de banner para el usuario: {}", email);
		messagingTemplate.convertAndSend("/topic/profile_updated", email);

		return updatedUser;
	}

	// Método para buscar un usuario por email
	public User findByEmail(String email) {
		return userService.findByEmail(email);
	}

	// Método para guardar un usuario
	public User save(User user) {
		return userService.save(user, false);
	}
}