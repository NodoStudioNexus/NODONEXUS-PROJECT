package org.nodonexus.Backend_nodoNexus.domain.ports.proyecto;

import java.util.Optional;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {

	Optional<Proyecto> findBySolicitudId(Long solicitudId);

}
