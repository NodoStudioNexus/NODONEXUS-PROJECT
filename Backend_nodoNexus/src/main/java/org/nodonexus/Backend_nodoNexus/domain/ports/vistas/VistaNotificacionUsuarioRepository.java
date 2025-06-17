package org.nodonexus.Backend_nodoNexus.domain.ports.vistas;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaNotificacionUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VistaNotificacionUsuarioRepository extends JpaRepository<VistaNotificacionUsuario, Long> {
	List<VistaNotificacionUsuario> findByIdUsuario(String idUsuario);

	List<VistaNotificacionUsuario> findByIdUsuarioAndLeido(String idUsuario, boolean leido);
}