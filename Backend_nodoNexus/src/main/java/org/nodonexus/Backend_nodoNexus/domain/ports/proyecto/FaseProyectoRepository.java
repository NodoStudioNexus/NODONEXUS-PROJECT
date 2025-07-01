package org.nodonexus.Backend_nodoNexus.domain.ports.proyecto;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.FaseProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaseProyectoRepository extends JpaRepository<FaseProyecto, Long> {
}