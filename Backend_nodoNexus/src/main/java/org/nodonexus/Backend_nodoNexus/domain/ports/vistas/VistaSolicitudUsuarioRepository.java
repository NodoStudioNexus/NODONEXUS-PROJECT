package org.nodonexus.Backend_nodoNexus.domain.ports.vistas;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaSolicitudUsuarioRepository extends JpaRepository<VistaSolicitudUsuario, Long> {
	// Obtener todas las solicitudes de un usuario específico
	List<VistaSolicitudUsuario> findByUsuarioId(Long usuarioId);
}