package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notificaciones")
@Getter
@Setter
public class Notificacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String mensaje;

	@Column(name = "creado_en", nullable = false)
	private Instant creadoEn;

	@Column(nullable = false)
	private boolean leido;

	private String enlace;

	@Column(name = "id_usuario", nullable = false)
	private String idUsuario;
}