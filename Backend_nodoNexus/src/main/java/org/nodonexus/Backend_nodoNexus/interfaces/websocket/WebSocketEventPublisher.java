package org.nodonexus.Backend_nodoNexus.interfaces.websocket;

import org.nodonexus.Backend_nodoNexus.application.notificaciones.NotificationService; // Añadido
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketEventPublisher {

	private final SimpMessagingTemplate messagingTemplate;
	private final NotificationService notificationService; // Añadido

	@Autowired
	public WebSocketEventPublisher(SimpMessagingTemplate messagingTemplate, NotificationService notificationService) {
		this.messagingTemplate = messagingTemplate;
		this.notificationService = notificationService; // Añadido
	}

	public void publishProfileUpdatedEvent(String userId) {
		messagingTemplate.convertAndSend("/topic/profile_updated", userId);
		notificationService.sendAndSaveNotification(userId, "Tu perfil ha sido actualizado", "/perfil");
	}

	public void publishDocumentUpdatedEvent(String documentId) {
		messagingTemplate.convertAndSend("/topic/document_updated", documentId);
		notificationService.sendAndSaveNotification("admin-user-id", "Documento actualizado: " + documentId,
				"/documentos/" + documentId);
	}
}