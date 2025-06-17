package org.nodonexus.Backend_nodoNexus.application.chat.service;

import java.time.Instant;
import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.Chat;
import org.nodonexus.Backend_nodoNexus.domain.model.Mensaje;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.ports.ChatRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.MensajeRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

	private final ChatRepository chatRepository;
	private final MensajeRepository mensajeRepository;
	private final UserRepository userRepository;

	@Autowired
	public ChatService(ChatRepository chatRepository, MensajeRepository mensajeRepository,
			UserRepository userRepository) {
		this.chatRepository = chatRepository;
		this.mensajeRepository = mensajeRepository;
		this.userRepository = userRepository;
	}

	public Chat crearChat(String nombre, Long creadorId, List<Long> participantesIds) {
		User creador = userRepository.findById(creadorId)
				.orElseThrow(() -> new IllegalArgumentException("Creador no encontrado"));
		List<User> participantes = userRepository.findAllById(participantesIds);

		Chat chat = new Chat();
		chat.setNombre(nombre);
		chat.setCreador(creador);
		chat.setParticipantes(participantes);
		chat.setCreadoEn(Instant.now());

		return chatRepository.save(chat);
	}

	public Mensaje enviarMensaje(Long chatId, Long emisorId, String contenido) {
		Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new IllegalArgumentException("Chat no encontrado"));
		User emisor = userRepository.findById(emisorId)
				.orElseThrow(() -> new IllegalArgumentException("Emisor no encontrado"));

		Mensaje mensaje = new Mensaje();
		mensaje.setContenido(contenido);
		mensaje.setEmisor(emisor);
		mensaje.setChat(chat);
		mensaje.setEnviadoEn(Instant.now());

		return mensajeRepository.save(mensaje);
	}
}