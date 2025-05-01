package org.nodonexus.Backend_nodoNexus.interfaces.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketEventPublisher {

	private final SimpMessagingTemplate messagingTemplate;

	@Autowired
	public WebSocketEventPublisher(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	public void publishProfileUpdatedEvent(String userId) {
		messagingTemplate.convertAndSend("/topic/profile_updated", userId);
	}

	// Métodos para futuros eventos
	public void publishDocumentUpdatedEvent(String documentId) {
		messagingTemplate.convertAndSend("/topic/document_updated", documentId);
	}
}