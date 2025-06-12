package org.nodonexus.Backend_nodoNexus.domain.ports;

import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudProyectoRepository extends JpaRepository<SolicitudProyecto, Long> {

}
