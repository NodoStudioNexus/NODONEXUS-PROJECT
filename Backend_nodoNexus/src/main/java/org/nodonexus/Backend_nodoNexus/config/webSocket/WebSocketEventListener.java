package org.nodonexus.Backend_nodoNexus.config.webSocket;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

	private final ConcurrentHashMap<String, String> connectedUsers = new ConcurrentHashMap<>();
	private final SimpMessagingTemplate messagingTemplate;

	public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		if (headerAccessor.getUser() == null) {
			System.out.println("No se encontró usuario en la conexión");
			return;
		}
		String userId = headerAccessor.getUser().getName();
		System.out.println("Usuario conectado: " + userId);
		connectedUsers.put(userId, headerAccessor.getSessionId());
		messagingTemplate.convertAndSend("/topic/users/connected", connectedUsers.keySet());
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String sessionId = headerAccessor.getSessionId();
		connectedUsers.entrySet().stream()
				.filter(entry -> entry.getValue().equals(sessionId))
				.findFirst()
				.ifPresent(entry -> {
					String userId = entry.getKey();
					connectedUsers.remove(userId);
					System.out.println("Usuario desconectado: " + userId);
					messagingTemplate.convertAndSend("/topic/users/connected", connectedUsers.keySet());
					messagingTemplate.convertAndSend("/topic/users/disconnected", userId);
				});
	}
}