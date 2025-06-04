package org.nodonexus.Backend_nodoNexus.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
  public static final String LOGIN_QUEUE = "login-queue";
  public static final String SOLICITUD_PROYECTO_QUEUE = "solicitud-proyecto-queue";

  @Bean
  public Queue loginQueue() {
    return new Queue(LOGIN_QUEUE, true);
  }

  @Bean
  public Queue solicitudProyectoQueue() {
    return new Queue(SOLICITUD_PROYECTO_QUEUE, true);
  }
}
