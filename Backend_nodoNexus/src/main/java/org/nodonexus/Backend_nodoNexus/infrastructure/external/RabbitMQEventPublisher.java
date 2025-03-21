package org.nodonexus.Backend_nodoNexus.infrastructure.external;

import org.nodonexus.Backend_nodoNexus.common.event.LoginEvent;
import org.nodonexus.Backend_nodoNexus.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQEventPublisher {

	private final RabbitTemplate rabbitTemplate;

	public RabbitMQEventPublisher(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	@EventListener
	public void handleLoginEvent(LoginEvent event) {
		rabbitTemplate.convertAndSend(RabbitMQConfig.LOGIN_QUEUE, event);
	}
}