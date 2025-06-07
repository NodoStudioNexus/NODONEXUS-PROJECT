package org.nodonexus.Backend_nodoNexus.interfaces.websocket;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.application.notificaciones.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	private final SimpMessagingTemplate messagingTemplate;
	private final NotificationService notificationService;

	@Autowired
	public WebSocketController(SimpMessagingTemplate messagingTemplate, NotificationService notificationService) {
		this.messagingTemplate = messagingTemplate;
		this.notificationService = notificationService;
	}

	// Método para notificar sobre una nueva solicitud
	public void notifyNewSolicitud(String solicitudId, List<String> userIds, String message, String link) {
		// Enviar al topic general (opcional)
		messagingTemplate.convertAndSend("/topic/solicitud_creada", solicitudId);
		// Enviar notificaciones personalizadas usando NotificationService
		notificationService.sendAndSaveNotificationToMultiple(userIds, message, link);
	}

	@MessageMapping("/solicitud")
	public void handleSolicitudMessage(String message) {
		messagingTemplate.convertAndSend("/topic/solicitud_response", "Mensaje recibido: " + message);
	}
}