package org.nodonexus.Backend_nodoNexus.domain.ports.proyecto;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.FuncionalidadFase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionalidadFaseRepository extends JpaRepository<FuncionalidadFase, Long> {
	List<FuncionalidadFase> findByFuncionalidadId(Long funcionalidadId);
}
