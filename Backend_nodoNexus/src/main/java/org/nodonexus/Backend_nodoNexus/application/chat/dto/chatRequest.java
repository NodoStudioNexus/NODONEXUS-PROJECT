package org.nodonexus.Backend_nodoNexus.application.chat.dto;

import java.util.List;

import lombok.Data;

@Data
public class chatRequest {
	private String nombre;
	private Long creadorId;
	private List<Long> participantesIds;

}
