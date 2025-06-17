package org.nodonexus.Backend_nodoNexus.interfaces.websocket;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.application.chat.service.ChatService;
import org.nodonexus.Backend_nodoNexus.application.notificaciones.NotificationService;
import org.nodonexus.Backend_nodoNexus.domain.model.Mensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	private final SimpMessagingTemplate messagingTemplate;
	private final NotificationService notificationService;
	private final ChatService chatService;

	@Autowired
	public WebSocketController(SimpMessagingTemplate messagingTemplate, NotificationService notificationService,
			ChatService chatService) {
		this.messagingTemplate = messagingTemplate;
		this.notificationService = notificationService;
		this.chatService = chatService;
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

	@MessageMapping("/chat/sendMessage")
	@SendTo("/topic/messages")
	public Mensaje sendMessage(Mensaje mensaje) {
		return chatService.enviarMensaje(mensaje.getChat().getId(), mensaje.getEmisor().getId(), mensaje.getContenido());
	}

}