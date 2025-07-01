package org.nodonexus.Backend_nodoNexus.domain.model.proyecto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "funcionalidades")
public class Funcionalidad {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "proyecto_id", nullable = false)
	private Proyecto proyecto;

	@Column(name = "nombre", nullable = false)
	private String nombre;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "estado", nullable = false)
	private String estado = "PENDIENTE";

	@OneToMany(mappedBy = "funcionalidad", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<FuncionalidadFase> funcionalidadFases;

	@Column(name = "porcentaje_avance")
	private Double porcentajeAvance = 0.00;

}