package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.List;
import java.util.Map;

import org.nodonexus.Backend_nodoNexus.common.constants.EstadoSolicitud;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.FuncionalidadFase;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Proyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.RequisitoFase;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudUsuario;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesEnProgreso;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesPendientes;
import org.nodonexus.Backend_nodoNexus.domain.ports.SolicitudProyectoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.UserRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FaseProyectoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadFaseRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.ProyectoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.RequisitoFaseRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.RequisitoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.vistas.VistaSolicitudUsuarioRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.vistas.VistaSolicitudesEnProgresoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.vistas.VistaSolicitudesPendientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {

	private final VistaSolicitudesPendientesRepository vistaSolicitudesPendientesRepository;
	private final VistaSolicitudesEnProgresoRepository vistaSolicitudesEnProgresoRepository;
	private final SolicitudProyectoRepository solicitudProyectoRepository;
	private final VistaSolicitudUsuarioRepository vistaSolicitudUsuarioRepository;
	private final ProyectoRepository proyectoRepository;
	private final FuncionalidadFaseRepository funcionalidadFaseRepository;
	private final RequisitoFaseRepository requisitoFaseRepository;

	private final JdbcTemplate jdbcTemplate;

	private final ServiciosPorcentajesProyectos serviciosPorcentajesProyectos;

	@Autowired
	public ProyectoService(
			VistaSolicitudesPendientesRepository vistaSolicitudesPendientesRepository,
			VistaSolicitudesEnProgresoRepository vistaSolicitudesEnProgresoRepository,
			SolicitudProyectoRepository solicitudProyectoRepository,
			VistaSolicitudUsuarioRepository vistaSolicitudUsuarioRepository,
			ProyectoRepository proyectoRepository,
			FuncionalidadFaseRepository funcionalidadFaseRepository,
			RequisitoFaseRepository requisitoFaseRepository,
			FuncionalidadRepository funcionalidadRepository,
			RequisitoRepository requisitoRepository,
			JdbcTemplate jdbcTemplate,
			SimpMessagingTemplate messagingTemplate,
			UserRepository userRepository,
			FaseProyectoRepository faseProyectoRepository,
			ServiciosPorcentajesProyectos serviciosPorcentajesProyectos) {
		this.vistaSolicitudesPendientesRepository = vistaSolicitudesPendientesRepository;
		this.vistaSolicitudesEnProgresoRepository = vistaSolicitudesEnProgresoRepository;
		this.solicitudProyectoRepository = solicitudProyectoRepository;
		this.vistaSolicitudUsuarioRepository = vistaSolicitudUsuarioRepository;
		this.proyectoRepository = proyectoRepository;
		this.funcionalidadFaseRepository = funcionalidadFaseRepository;
		this.requisitoFaseRepository = requisitoFaseRepository;
		this.jdbcTemplate = jdbcTemplate;
		this.serviciosPorcentajesProyectos = serviciosPorcentajesProyectos;
	}

	public List<VistaSolicitudesPendientes> getSolicitudesPendientes() {
		return vistaSolicitudesPendientesRepository.findAll();
	}

	public List<VistaSolicitudesEnProgreso> getSolicitudesEnProgresos() {
		return vistaSolicitudesEnProgresoRepository.findAll();
	}

	public SolicitudProyecto getSolicitudDetalles(Long id) {
		return solicitudProyectoRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada con ID: " + id));
	}

	public List<SolicitudProyecto> getAllSolicitudes() {
		return solicitudProyectoRepository.findAll();
	}

	public List<VistaSolicitudUsuario> getSolicitudesByUsuarioId(Long usuarioId) {
		return vistaSolicitudUsuarioRepository.findByUsuarioId(usuarioId);
	}

	public void actualizarEstadoFuncionalidadFase(Long id, String nuevoEstado) {
		FuncionalidadFase ff = funcionalidadFaseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("FuncionalidadFase no encontrada con ID: " + id));
		jdbcTemplate.update("SELECT validar_avance_fase('funcionalidad_fase', ?, ?, ?)",
				ff.getFuncionalidad().getId(), ff.getFaseProyecto().getId(), nuevoEstado);
		ff.setEstado(nuevoEstado);
		funcionalidadFaseRepository.save(ff);
		// Recalcular porcentajes y enviar actualizaciones usando el nuevo servicio
		serviciosPorcentajesProyectos.calcularPorcentajeFuncionalidad(ff.getFuncionalidad().getId());
		serviciosPorcentajesProyectos.calcularPorcentajeFase(ff.getFaseProyecto().getId());
		Long proyectoId = getProyectoIdPorFuncionalidadFase(id);
		serviciosPorcentajesProyectos.calcularPorcentajeAvance(proyectoId);
	}

	public void actualizarEstadoRequisitoFase(Long id, String nuevoEstado) {
		RequisitoFase rf = requisitoFaseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("RequisitoFase no encontrada con ID: " + id));
		Boolean validacionExitosa = jdbcTemplate.queryForObject(
				"SELECT validar_avance_fase('requisito_fase', ?, ?, ?)",
				new Object[] { rf.getRequisito().getId(), rf.getFaseProyecto().getId(), nuevoEstado },
				Boolean.class);
		if (validacionExitosa != null && validacionExitosa) {
			rf.setEstado(nuevoEstado);
			requisitoFaseRepository.save(rf);
			// Recalcular porcentajes y enviar actualizaciones usando el nuevo servicio
			serviciosPorcentajesProyectos.calcularPorcentajeFuncionalidad(rf.getRequisito().getFuncionalidad().getId());
			serviciosPorcentajesProyectos.calcularPorcentajeFase(rf.getFaseProyecto().getId());
			Long proyectoId = getProyectoIdPorRequisitoFase(id);
			serviciosPorcentajesProyectos.calcularPorcentajeAvance(proyectoId);
		} else {
			throw new IllegalStateException("No se puede actualizar el estado debido a la validación de avance.");
		}
	}

	public Long getProyectoIdPorRequisitoFase(Long requisitoFaseId) {
		RequisitoFase rf = requisitoFaseRepository.findById(requisitoFaseId)
				.orElseThrow(() -> new IllegalArgumentException("RequisitoFase no encontrado con ID: " + requisitoFaseId));
		return rf.getRequisito().getFuncionalidad().getProyecto().getId();
	}

	public SolicitudProyecto actualizarEstadoSolicitudACompletada(Long solicitudId) {
		SolicitudProyecto solicitud = solicitudProyectoRepository.findById(solicitudId)
				.orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada con ID: " + solicitudId));
		solicitud.setEstado(EstadoSolicitud.COMPLETADA);
		return solicitudProyectoRepository.save(solicitud);
	}

	public Long getProyectoIdPorSolicitud(Long solicitudId) {
		Proyecto proyecto = proyectoRepository.findBySolicitudId(solicitudId)
				.orElseThrow(
						() -> new IllegalArgumentException("Proyecto no encontrado para la solicitud con ID: " + solicitudId));
		return proyecto.getId();
	}

	public Long getProyectoIdPorFuncionalidadFase(Long funcionalidadFaseId) {
		FuncionalidadFase ff = funcionalidadFaseRepository.findById(funcionalidadFaseId)
				.orElseThrow(
						() -> new IllegalArgumentException("FuncionalidadFase no encontrada con ID: " + funcionalidadFaseId));
		return ff.getFuncionalidad().getProyecto().getId();
	}

	public List<Map<String, Object>> getProyectosVista() {
		return jdbcTemplate.queryForList("SELECT * FROM vista_proyectos");
	}
}