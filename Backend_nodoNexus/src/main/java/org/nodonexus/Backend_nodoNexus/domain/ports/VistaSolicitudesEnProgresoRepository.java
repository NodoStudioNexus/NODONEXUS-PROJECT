package org.nodonexus.Backend_nodoNexus.domain.ports;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.VistaSolicitudesEnProgreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaSolicitudesEnProgresoRepository extends JpaRepository<VistaSolicitudesEnProgreso, Long> {
	List<VistaSolicitudesEnProgreso> findAll();
}