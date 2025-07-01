package org.nodonexus.Backend_nodoNexus.domain.model.proyecto;

import org.nodonexus.Backend_nodoNexus.domain.model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Funcionalidad_responsable")
@IdClass(FuncionalidadResponsables.class)
public class FuncionalidadResponsables {

	@Id
	@ManyToOne
	@JoinColumn(name = "funcionalidad_id", referencedColumnName = "id", nullable = false)
	private Funcionalidad funcionalidad;

	@Id
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private User user;

	// Constructor por defecto (requerido por JPA)
	public FuncionalidadResponsables() {
	}

	// Constructor con parámetros
	public FuncionalidadResponsables(Funcionalidad funcionalidad, User user) {
		this.funcionalidad = funcionalidad;
		this.user = user;
	}
}