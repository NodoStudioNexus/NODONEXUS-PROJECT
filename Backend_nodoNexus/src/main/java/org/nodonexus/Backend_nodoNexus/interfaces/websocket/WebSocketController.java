package org.nodonexus.Backend_nodoNexus.interfaces.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	private final SimpMessagingTemplate messagingTemplate;

	@Autowired
	public WebSocketController(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	// Método para notificar a los clientes sobre una nueva solicitud de proyecto
	public void notifyNewSolicitud(String solicitudId) {
		messagingTemplate.convertAndSend("/topic/solicitud_created", solicitudId);
	}

	// Opcional: Método para recibir mensajes de los clientes (si necesitas
	// interacción bidireccional)
	@MessageMapping("/solicitud")
	public void handleSolicitudMessage(String message) {
		// Lógica para procesar mensajes enviados por los clientes, si aplica
		messagingTemplate.convertAndSend("/topic/solicitud_response", "Mensaje recibido: " + message);
	}
}
