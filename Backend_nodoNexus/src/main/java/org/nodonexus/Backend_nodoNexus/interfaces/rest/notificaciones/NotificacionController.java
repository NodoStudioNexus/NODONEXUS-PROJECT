package org.nodonexus.Backend_nodoNexus.interfaces.rest.notificaciones;

import org.nodonexus.Backend_nodoNexus.application.notificaciones.NotificationService;
import org.nodonexus.Backend_nodoNexus.common.utils.JwtUtils;
import org.nodonexus.Backend_nodoNexus.domain.model.Notificacion;
import org.nodonexus.Backend_nodoNexus.domain.model.VistaNotificacionUsuario;
import org.nodonexus.Backend_nodoNexus.domain.ports.NotificacionRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.VistaNotificacionUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

	private final NotificacionRepository notificacionRepository;
	private final VistaNotificacionUsuarioRepository vistaNotificacionRepository;
	private final NotificationService notificationService;
	private final JwtUtils jwtUtils;

	@Autowired
	public NotificacionController(
			NotificacionRepository notificacionRepository,
			VistaNotificacionUsuarioRepository vistaNotificacionRepository,
			NotificationService notificationService,
			JwtUtils jwtUtils) {
		this.notificacionRepository = notificacionRepository;
		this.vistaNotificacionRepository = vistaNotificacionRepository;
		this.notificationService = notificationService;
		this.jwtUtils = jwtUtils;
	}

	@GetMapping
	public ResponseEntity<List<VistaNotificacionUsuario>> getNotificacionesByUser(
			@RequestParam(required = false) Boolean leido,
			HttpServletRequest request) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Autenticación en /notificaciones: " + auth);
		if (auth == null) {
			System.out.println("No se encontró autenticación");
			return ResponseEntity.status(401).build();
		}
		String userId = getUserIdFromRequest(request);
		System.out.println("Buscando notificaciones para userId: " + userId);

		List<VistaNotificacionUsuario> notificaciones;
		if (leido != null) {
			notificaciones = vistaNotificacionRepository.findByIdUsuarioAndLeido(userId, leido);
		} else {
			notificaciones = vistaNotificacionRepository.findByIdUsuario(userId);
		}
		System.out.println("Notificaciones encontradas: " + notificaciones.size());
		return ResponseEntity.ok(notificaciones);
	}

	@GetMapping("/unread")
	public ResponseEntity<List<VistaNotificacionUsuario>> getUnreadNotificaciones(HttpServletRequest request) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Autenticación en /unread: " + auth);
		if (auth == null) {
			System.out.println("No se encontró autenticación");
			return ResponseEntity.status(401).build();
		}
		String userId = getUserIdFromRequest(request);
		System.out.println("Buscando notificaciones no leídas para userId: " + userId);
		List<VistaNotificacionUsuario> notificaciones = vistaNotificacionRepository.findByIdUsuarioAndLeido(userId, false);
		System.out.println("Notificaciones no leídas encontradas: " + notificaciones.size());
		return ResponseEntity.ok(notificaciones);
	}

	@PutMapping("/{id}/read")
	public ResponseEntity<Void> markAsRead(@PathVariable Long id, HttpServletRequest request) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Autenticación en /read: " + auth);
		String userId = getUserIdFromRequest(request);

		Notificacion notificacion = notificacionRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
		if (!notificacion.getIdUsuario().equals(userId)) {
			return ResponseEntity.status(403).build();
		}

		notificacion.setLeido(true);
		notificacionRepository.save(notificacion);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNotificacion(@PathVariable Long id, HttpServletRequest request) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Autenticación en /delete: " + auth);
		String userId = getUserIdFromRequest(request);

		Notificacion notificacion = notificacionRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
		if (!notificacion.getIdUsuario().equals(userId)) {
			return ResponseEntity.status(403).build();
		}

		notificacionRepository.delete(notificacion);
		return ResponseEntity.ok().build();
	}

	private String getUserIdFromRequest(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		if (header == null || !header.startsWith("Bearer ")) {
			throw new IllegalStateException("No se encontró un token válido en el encabezado Authorization");
		}
		String token = header.substring(7);
		return jwtUtils.getIdFromToken(token);
	}
}