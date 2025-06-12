package org.nodonexus.Backend_nodoNexus.config;

import org.nodonexus.Backend_nodoNexus.common.utils.JwtUtils;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {

	private final JwtUtils jwtUtils;

	public WebSocketAuthInterceptor(JwtUtils jwtUtils) {
		this.jwtUtils = jwtUtils;
	}

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

		if (StompCommand.CONNECT.equals(accessor.getCommand())) {
			String token = accessor.getFirstNativeHeader("Authorization");
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (jwtUtils.validateToken(token)) {
					String email = jwtUtils.getEmailFromToken(token);
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
							email, null, null);
					SecurityContextHolder.getContext().setAuthentication(auth);
				} else {
					throw new SecurityException("Invalid JWT token");
				}
			} else {
				throw new SecurityException("Missing JWT token");
			}
		}

		return message;
	}
}