package org.nodonexus.Backend_nodoNexus.domain.ports.proyecto;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.RequisitoFase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequisitoFaseRepository extends JpaRepository<RequisitoFase, Long> {
	List<RequisitoFase> findByRequisitoId(Long requisitoId);
}