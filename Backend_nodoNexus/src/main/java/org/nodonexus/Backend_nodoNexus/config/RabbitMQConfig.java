package org.nodonexus.Backend_nodoNexus.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
  public static final String LOGIN_QUEUE = "login-queue";

  @Bean
  public Queue loginQueue() {
    return new Queue(LOGIN_QUEUE, true);
  }
}
