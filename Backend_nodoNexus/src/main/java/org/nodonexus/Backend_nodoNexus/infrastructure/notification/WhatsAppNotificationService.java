package org.nodonexus.Backend_nodoNexus.infrastructure.notification;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WhatsAppNotificationService {

	@Value("${WHATSAPP_TOKEN}")
	private String token;

	@Value("${WHATSAPP_PHONE_NUMBER_ID}")
	private String phoneNumberId;

	private final RestTemplate restTemplate;

	@Autowired
	public WhatsAppNotificationService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public void sendWhatsAppMessage(String to, String message) {
		String url = "https://graph.facebook.com/v13.0/" + phoneNumberId + "/messages";

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);
		headers.set("Content-Type", "application/json");

		Map<String, Object> body = new HashMap<>();
		body.put("messaging_product", "whatsapp");
		body.put("to", to);
		body.put("type", "text");
		body.put("text", Map.of("body", message));

		HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
		restTemplate.exchange(url, HttpMethod.POST, request, String.class);
	}
}
