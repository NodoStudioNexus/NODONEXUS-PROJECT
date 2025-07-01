package org.nodonexus.Backend_nodoNexus.domain.ports.proyecto;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Requisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequisitoRepository extends JpaRepository<Requisito, Long> {
}