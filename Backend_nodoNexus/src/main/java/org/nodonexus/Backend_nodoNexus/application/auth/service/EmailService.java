package org.nodonexus.Backend_nodoNexus.application.auth.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	private final JavaMailSender mailSender;

	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendResetPasswordEmail(String to, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("Restablecimiento de Contraseña");
		message.setText("Para restablecer tu contraseña, haz clic en el siguiente enlace: "
				+ "http://tufrontend.com/reset-password?token=" + token);
		mailSender.send(message);
	}
}
