package org.nodonexus.Backend_nodoNexus.domain.ports;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.VistaNotificacionUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VistaNotificacionUsuarioRepository extends JpaRepository<VistaNotificacionUsuario, Long> {
	List<VistaNotificacionUsuario> findByIdUsuario(String idUsuario);

	List<VistaNotificacionUsuario> findByIdUsuarioAndLeido(String idUsuario, boolean leido);
}