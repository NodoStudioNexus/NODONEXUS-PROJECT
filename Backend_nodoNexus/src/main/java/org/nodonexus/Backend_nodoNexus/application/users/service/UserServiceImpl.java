package org.nodonexus.Backend_nodoNexus.application.users.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.nodonexus.Backend_nodoNexus.common.exception.UserNotFoundException;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.service.UserService;
import org.nodonexus.Backend_nodoNexus.domain.ports.UserRepository;
import org.nodonexus.Backend_nodoNexus.interfaces.websocket.WebSocketEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final WebSocketEventPublisher eventPublisher;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, WebSocketEventPublisher eventPublisher) {
		this.userRepository = userRepository;
		this.eventPublisher = eventPublisher;
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("Usuario no Encontrado con correo electronico : " + email));
	}

	@Override
	public User save(User user) {
		User savedUser = userRepository.save(user);
		// Emitir evento WebSocket tras guardar
		eventPublisher.publishProfileUpdatedEvent(savedUser.getId().toString());
		return savedUser;
	}

	@Override
	public boolean hasRecentResetRequest(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
		return user.getLastResetRequest() != null &&
				user.getLastResetRequest().isAfter(Instant.now().minus(1, ChronoUnit.HOURS));
	}
}