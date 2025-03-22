package org.nodonexus.Backend_nodoNexus.infrastructure.external;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.nodonexus.Backend_nodoNexus.common.event.LoginEvent;
import org.nodonexus.Backend_nodoNexus.config.RabbitMQConfig;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQEventPublisher {

	private final RabbitTemplate rabbitTemplate;
	private final ObjectMapper objectMapper;

	public RabbitMQEventPublisher(RabbitTemplate rabbitTemplate, ObjectMapper objectMapper) {
		this.rabbitTemplate = rabbitTemplate;
		this.objectMapper = objectMapper;
	}

	@EventListener
	public void handleLoginEvent(LoginEvent event) {
		try {
			// Convertir el evento a JSON
			String jsonEvent = objectMapper.writeValueAsString(event);

			// Crear un mensaje con el JSON
			MessageProperties properties = new MessageProperties();
			properties.setContentType("application/json");
			Message message = new Message(jsonEvent.getBytes(), properties);

			// Enviar el mensaje a la cola
			rabbitTemplate.send(RabbitMQConfig.LOGIN_QUEUE, message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}