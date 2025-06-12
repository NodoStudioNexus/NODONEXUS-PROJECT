package org.nodonexus.Backend_nodoNexus.application.solicitudProyecto.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.nodonexus.Backend_nodoNexus.application.notificaciones.NotificationService;
import org.nodonexus.Backend_nodoNexus.application.solicitudProyecto.dto.CrearSolicitudRequest;
import org.nodonexus.Backend_nodoNexus.common.constants.EstadoSolicitud;
import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.ports.SolicitudProyectoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.UserRepository;
import org.nodonexus.Backend_nodoNexus.infrastructure.notification.EmailNotificationService;
import org.nodonexus.Backend_nodoNexus.infrastructure.notification.WhatsAppNotificationService;
import org.nodonexus.Backend_nodoNexus.interfaces.websocket.WebSocketController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SolicitudProyectoService {

	private final SolicitudProyectoRepository solicitudRepository;
	private final UserRepository userRepository;
	private final EmailNotificationService emailService;
	private final WhatsAppNotificationService whatsAppService;
	private final WebSocketController webSocketController;
	private final NotificationService notificationService;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public SolicitudProyectoService(SolicitudProyectoRepository solicitudRepository,
			UserRepository userRepository,
			EmailNotificationService emailService,
			WhatsAppNotificationService whatsAppService,
			WebSocketController webSocketController,
			NotificationService notificationService,
			PasswordEncoder passwordEncoder) {
		this.solicitudRepository = solicitudRepository;
		this.userRepository = userRepository;
		this.emailService = emailService;
		this.whatsAppService = whatsAppService;
		this.webSocketController = webSocketController;
		this.notificationService = notificationService;
		this.passwordEncoder = passwordEncoder;
	}

	public SolicitudProyecto crearSolicitud(CrearSolicitudRequest request) {
		if (request.getEmail() == null || request.getEmail().isEmpty()) {
			throw new IllegalArgumentException("El email es obligatorio");
		}

		// Buscar o crear usuario
		Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
		User usuario = existingUser.orElseGet(() -> {
			User newUser = new User();
			newUser.setEmail(request.getEmail());
			newUser.setPrimerNombre(request.getNombre());
			newUser.setPrimerApellido(request.getApellido());
			newUser.setTelefono(request.getNumeroTelefonico());
			newUser.setNumeroIdentidad(request.getNumeroIdentidad());
			newUser.setTipoIdentidad(IdentityType.CC);
			newUser.setRole(RoleEnum.CLIENT);
			newUser.setActivo(true);
			newUser.setFechaRegistro(Instant.now());
			// Establecer la contraseña encriptada con el número de identidad
			newUser.setPassword(passwordEncoder.encode(request.getNumeroIdentidad()));
			return userRepository.save(newUser);
		});

		// Crear solicitud
		SolicitudProyecto solicitud = new SolicitudProyecto();
		solicitud.setUsuario(usuario);
		solicitud.setTipoProyecto(request.getTipoProyecto());
		solicitud.setDescripcion(request.getDescripcion());
		solicitud.setPresupuestoMin(request.getPresupuestoMin());
		solicitud.setPresupuestoMax(request.getPresupuestoMax());
		solicitud.setNombreProyecto(request.getNombreProyecto());
		solicitud.setPlazoEstimado(request.getPlazoEstimado());
		solicitud.setArchivosAdjuntos(request.getArchivosAdjuntos());
		solicitud.setFechaSolicitud(Instant.now());
		solicitud.setEstado(EstadoSolicitud.PENDIENTE);
		solicitud.setNumeroTelefonico(request.getNumeroTelefonico());

		SolicitudProyecto savedSolicitud = solicitudRepository.save(solicitud);

		// Notificar al cliente
		String mensajeCliente = "Hola " + request.getNombre() + ", tu solicitud '" + request.getNombreProyecto()
				+ "' ha sido recibida.";
		emailService.sendEmail(request.getEmail(), "Solicitud Recibida - Nodo Studio", mensajeCliente);
		notificationService.sendAndSaveNotification(usuario.getId().toString(), mensajeCliente,
				"/solicitudes/" + savedSolicitud.getId());

		// TODO: Configurar el servicio de WhatsApp para enviar notificaciones al
		// cliente
		// whatsAppService.sendWhatsAppMessage(request.getNumeroTelefonico(),
		// "Hola " + request.getNombre() + ", tu solicitud '" +
		// request.getNombreProyecto() + "' ha sido recibida.");

		// Notificar a administradores y analistas
		List<User> adminsAndAnalysts = userRepository.findByRoleIn(List.of(RoleEnum.ADMIN, RoleEnum.ANALYST));
		String mensajeAdmin = "Nueva solicitud: '" + request.getNombreProyecto() + "' de " + request.getNombre() + ".";
		for (User adminOrAnalyst : adminsAndAnalysts) {
			emailService.sendEmail(adminOrAnalyst.getEmail(), "Nueva Solicitud", mensajeAdmin);
			notificationService.sendAndSaveNotification(adminOrAnalyst.getId().toString(), mensajeAdmin,
					"/solicitudes/" + savedSolicitud.getId());
			// TODO: Configurar el servicio de WhatsApp para enviar notificaciones a
			// administradores y analistas
			// whatsAppService.sendWhatsAppMessage(adminOrAnalyst.getTelefono(),
			// "Nueva solicitud: '" + request.getNombreProyecto() + "'.");
		}

		// Notificación WebSocket general (opcional)
		// El frontend debe suscribirse a /topic/notifications para recibir
		// actualizaciones en tiempo real
		List<String> adminAndAnalystIds = adminsAndAnalysts.stream()
				.map(user -> user.getId().toString())
				.collect(Collectors.toList());
		webSocketController.notifyNewSolicitud(savedSolicitud.getId().toString(), adminAndAnalystIds, mensajeAdmin,
				"/solicitudes/" + savedSolicitud.getId());

		return savedSolicitud;
	}
}