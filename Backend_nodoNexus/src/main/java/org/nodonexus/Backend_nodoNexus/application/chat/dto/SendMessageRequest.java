package org.nodonexus.Backend_nodoNexus.application.chat.dto;

import lombok.Data;

@Data
public class SendMessageRequest {
	private Long chatId;
	private Long emisorId;
	private String contenido;
}
