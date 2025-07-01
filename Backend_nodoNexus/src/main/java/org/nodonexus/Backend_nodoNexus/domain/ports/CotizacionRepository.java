package org.nodonexus.Backend_nodoNexus.domain.ports;

import java.util.Optional;

import org.nodonexus.Backend_nodoNexus.domain.model.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
	Optional<Cotizacion> findBySolicitudId(Long solicitudId);
}