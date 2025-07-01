package org.nodonexus.Backend_nodoNexus.domain.ports.proyecto;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionalidadRepository extends JpaRepository<Funcionalidad, Long> {
	List<Funcionalidad> findByProyectoId(Long proyectoId);
}