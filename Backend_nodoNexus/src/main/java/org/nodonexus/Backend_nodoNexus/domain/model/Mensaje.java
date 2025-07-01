package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Mensaje {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String contenido;

	@ManyToOne
	private User emisor;

	@ManyToOne
	private Chat chat;

	private Instant enviadoEn;
}