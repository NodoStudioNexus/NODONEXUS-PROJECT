package org.nodonexus.Backend_nodoNexus.interfaces.rest.chat;

import org.nodonexus.Backend_nodoNexus.application.chat.dto.SendMessageRequest;
import org.nodonexus.Backend_nodoNexus.application.chat.dto.chatRequest;
import org.nodonexus.Backend_nodoNexus.application.chat.service.ChatService;
import org.nodonexus.Backend_nodoNexus.domain.model.Chat;
import org.nodonexus.Backend_nodoNexus.domain.model.Mensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	private final ChatService chatService;

	@Autowired
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}

	@PostMapping("/create")
	public ResponseEntity<Chat> createChat(@RequestBody chatRequest request) {
		Chat chat = chatService.crearChat(request.getNombre(), request.getCreadorId(), request.getParticipantesIds());
		return ResponseEntity.ok(chat);
	}

	@PostMapping("/sendMessage")
	public ResponseEntity<Mensaje> sendMessage(@RequestBody SendMessageRequest request) {
		Mensaje mensaje = chatService.enviarMensaje(request.getChatId(), request.getEmisorId(), request.getContenido());
		return ResponseEntity.ok(mensaje);
	}
}