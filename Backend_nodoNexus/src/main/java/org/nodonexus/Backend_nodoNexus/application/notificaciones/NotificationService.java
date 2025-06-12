package org.nodonexus.Backend_nodoNexus.application.notificaciones;

import java.time.Instant;
import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.Notificacion;
import org.nodonexus.Backend_nodoNexus.domain.ports.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

	private final NotificacionRepository notificationRepository;
	private final SimpMessagingTemplate messagingTemplate;

	@Autowired
	public NotificationService(NotificacionRepository notificationRepository,
			SimpMessagingTemplate messagingTemplate) {
		this.notificationRepository = notificationRepository;
		this.messagingTemplate = messagingTemplate;
	}

	public void sendAndSaveNotification(String userId, String message, String link) {
		// Crear la notificación
		Notificacion notification = new Notificacion();
		notification.setMensaje(message);
		notification.setCreadoEn(Instant.now());
		notification.setLeido(false);
		notification.setEnlace(link);
		notification.setIdUsuario(userId);

		// Guardar en la base de datos
		notificationRepository.save(notification);

		// Enviar a través de WebSocket al topic específico del usuario
		messagingTemplate.convertAndSend("/topic/notifications/" + userId, notification);
	}

	// Método para enviar notificaciones a múltiples usuarios
	public void sendAndSaveNotificationToMultiple(List<String> userIds, String message, String link) {
		for (String userId : userIds) {
			sendAndSaveNotification(userId, message, link);
		}
	}
}