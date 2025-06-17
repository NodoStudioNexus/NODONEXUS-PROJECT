package org.nodonexus.Backend_nodoNexus.domain.ports.vistas;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesPendientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaSolicitudesPendientesRepository extends JpaRepository<VistaSolicitudesPendientes, Long> {
	List<VistaSolicitudesPendientes> findAll();
}