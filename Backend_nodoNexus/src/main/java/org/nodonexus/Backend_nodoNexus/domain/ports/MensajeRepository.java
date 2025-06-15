package org.nodonexus.Backend_nodoNexus.domain.ports;

import org.nodonexus.Backend_nodoNexus.domain.model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
}