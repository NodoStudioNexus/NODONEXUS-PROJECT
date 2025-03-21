package org.nodonexus.Backend_nodoNexus.common.dto;

import lombok.Data;

@Data
public class ErrorResponse {
	private String message;
	private String code;
}