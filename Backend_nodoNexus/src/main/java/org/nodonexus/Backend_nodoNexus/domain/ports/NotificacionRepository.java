package org.nodonexus.Backend_nodoNexus.domain.ports;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
	List<Notificacion> findByIdUsuario(String idUsuario);

	List<Notificacion> findByIdUsuarioAndLeidoFalse(String idUsuario);
}