package org.nodonexus.Backend_nodoNexus.domain.model.proyecto;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "documentacion")
public class Documentacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "proyecto_id", nullable = false)
	private Proyecto proyecto;

	@Column(name = "contenido", nullable = false)
	private String contenido;

	@Column(name = "estado", nullable = false)
	private String estado = "EN_PROGRESO";

	@Column(name = "fecha_creacion", nullable = false)
	private Instant fechaCreacion = Instant.now();
}