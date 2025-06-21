package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.VistaProyectoCompleto;
import org.nodonexus.Backend_nodoNexus.common.constants.EstadoSolicitud;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.FuncionalidadFase;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Proyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Requisito;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.RequisitoFase;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudUsuario;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesEnProgreso;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesPendientes;
import org.nodonexus.Backend_nodoNexus.domain.ports.SolicitudProyectoRepository;
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
	private final FuncionalidadRepository funcionalidadRepository;
	private final RequisitoRepository requisitoRepository;
	private final JdbcTemplate jdbcTemplate;
	private final SimpMessagingTemplate messagingTemplate;

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
			SimpMessagingTemplate messagingTemplate) {
		this.vistaSolicitudesPendientesRepository = vistaSolicitudesPendientesRepository;
		this.vistaSolicitudesEnProgresoRepository = vistaSolicitudesEnProgresoRepository;
		this.solicitudProyectoRepository = solicitudProyectoRepository;
		this.vistaSolicitudUsuarioRepository = vistaSolicitudUsuarioRepository;
		this.proyectoRepository = proyectoRepository;
		this.funcionalidadFaseRepository = funcionalidadFaseRepository;
		this.requisitoFaseRepository = requisitoFaseRepository;
		this.funcionalidadRepository = funcionalidadRepository;
		this.requisitoRepository = requisitoRepository;
		this.jdbcTemplate = jdbcTemplate;
		this.messagingTemplate = messagingTemplate;
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

	public Double calcularPorcentajeAvance(Long proyectoId) {
		Double porcentaje = jdbcTemplate.queryForObject(
				"SELECT calcular_porcentaje_avance(?)",
				new Object[] { proyectoId },
				Double.class);
		messagingTemplate.convertAndSend("/topic/proyectos/" + proyectoId + "/avance", porcentaje);
		return porcentaje;
	}

	public void actualizarEstadoFuncionalidadFase(Long id, String nuevoEstado) {
		FuncionalidadFase ff = funcionalidadFaseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("FuncionalidadFase no encontrada con ID: " + id));
		jdbcTemplate.update("SELECT validar_avance_fase('funcionalidad_fase', ?, ?, ?)",
				ff.getFuncionalidad().getId(), ff.getFaseProyecto().getId(), nuevoEstado);
		ff.setEstado(nuevoEstado);
		funcionalidadFaseRepository.save(ff);
		// Recalcular porcentajes y enviar actualizaciones
		Double porcentajeFuncionalidad = calcularPorcentajeFuncionalidad(ff.getFuncionalidad().getId());
		Double porcentajeFase = calcularPorcentajeFase(ff.getFaseProyecto().getId());
		Long proyectoId = getProyectoIdPorFuncionalidadFase(id);
		Double porcentajeProyecto = calcularPorcentajeAvance(proyectoId);
		messagingTemplate.convertAndSend("/topic/funcionalidades/" + ff.getFuncionalidad().getId() + "/avance",
				porcentajeFuncionalidad);
		messagingTemplate.convertAndSend("/topic/fases/" + ff.getFaseProyecto().getId() + "/avance", porcentajeFase);
		messagingTemplate.convertAndSend("/topic/proyectos/" + proyectoId + "/avance", porcentajeProyecto);
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
			// Recalcular porcentajes y enviar actualizaciones
			Double porcentajeFuncionalidad = calcularPorcentajeFuncionalidad(rf.getRequisito().getFuncionalidad().getId());
			Double porcentajeFase = calcularPorcentajeFase(rf.getFaseProyecto().getId());
			Long proyectoId = getProyectoIdPorRequisitoFase(id);
			Double porcentajeProyecto = calcularPorcentajeAvance(proyectoId);
			messagingTemplate.convertAndSend(
					"/topic/funcionalidades/" + rf.getRequisito().getFuncionalidad().getId() + "/avance",
					porcentajeFuncionalidad);
			messagingTemplate.convertAndSend("/topic/fases/" + rf.getFaseProyecto().getId() + "/avance", porcentajeFase);
			messagingTemplate.convertAndSend("/topic/proyectos/" + proyectoId + "/avance", porcentajeProyecto);
		} else {
			throw new IllegalStateException("No se puede actualizar el estado debido a la validación de avance.");
		}
	}

	public Requisito crearRequisito(Long funcionalidadId, String descripcion) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		Requisito requisito = new Requisito();
		requisito.setFuncionalidad(funcionalidad);
		requisito.setDescripcion(descripcion);
		requisito.setEstado("PENDIENTE");
		return requisitoRepository.save(requisito);
	}

	public Funcionalidad crearFuncionalidad(Long proyectoId, String nombre, String descripcion) {
		Proyecto proyecto = proyectoRepository.findById(proyectoId)
				.orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado con ID: " + proyectoId));
		Funcionalidad funcionalidad = new Funcionalidad();
		funcionalidad.setProyecto(proyecto);
		funcionalidad.setNombre(nombre);
		funcionalidad.setDescripcion(descripcion);
		funcionalidad.setEstado("PENDIENTE");
		return funcionalidadRepository.save(funcionalidad);
	}

	public List<VistaProyectoCompleto> getProyectoCompleto(Long proyectoId) {
		return jdbcTemplate.query(
				"SELECT * FROM vista_proyecto_completo WHERE proyecto_id = ?",
				new Object[] { proyectoId },
				(rs, rowNum) -> {
					VistaProyectoCompleto vista = new VistaProyectoCompleto();
					vista.setProyectoId(rs.getLong("proyecto_id"));
					vista.setNombreProyecto(rs.getString("nombre_proyecto"));
					vista.setDescripcion(rs.getString("descripcion"));
					vista.setProyectoEstado(rs.getString("proyecto_estado"));
					vista.setFechaInicio(rs.getTimestamp("fecha_inicio").toInstant());
					vista.setPorcentajeProyecto(rs.getDouble("porcentaje_proyecto"));
					vista.setFaseId(rs.getLong("fase_id"));
					vista.setNombreFase(rs.getString("nombre_fase"));
					vista.setFaseDescripcion(rs.getString("fase_descripcion"));
					vista.setOrden(rs.getInt("orden"));
					vista.setFaseEstado(rs.getString("fase_estado"));
					vista.setFaseFechaCreacion(rs.getTimestamp("fase_fecha_creacion").toInstant());
					vista.setPorcentajeFase(rs.getDouble("porcentaje_fase"));
					return vista;
				});
	}

	public Long getProyectoIdPorRequisitoFase(Long requisitoFaseId) {
		RequisitoFase rf = requisitoFaseRepository.findById(requisitoFaseId)
				.orElseThrow(() -> new IllegalArgumentException("RequisitoFase no encontrado con ID: " + requisitoFaseId));
		Requisito requisito = rf.getRequisito();
		Funcionalidad funcionalidad = requisito.getFuncionalidad();
		Proyecto proyecto = funcionalidad.getProyecto();
		return proyecto.getId();
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
		Funcionalidad funcionalidad = ff.getFuncionalidad();
		Proyecto proyecto = funcionalidad.getProyecto();
		return proyecto.getId();
	}

	public List<Map<String, Object>> getProyectosVista() {
		return jdbcTemplate.queryForList("SELECT * FROM vista_proyectos");
	}

	public Double calcularPorcentajeFuncionalidad(Long funcionalidadId) {
		Double porcentaje = jdbcTemplate.queryForObject(
				"SELECT calcular_porcentaje_funcionalidad(?)",
				new Object[] { funcionalidadId },
				Double.class);
		messagingTemplate.convertAndSend("/topic/funcionalidades/" + funcionalidadId + "/avance", porcentaje);
		return porcentaje;
	}

	public Double calcularPorcentajeFase(Long faseId) {
		Double porcentaje = jdbcTemplate.queryForObject(
				"SELECT calcular_porcentaje_fase(?)",
				new Object[] { faseId },
				Double.class);
		messagingTemplate.convertAndSend("/topic/fases/" + faseId + "/avance", porcentaje);
		return porcentaje;
	}

	public Map<String, Object> getAvanceCompletoProyecto(Long proyectoId) {
		Map<String, Object> avanceCompleto = new HashMap<>();

		// Porcentaje total del proyecto
		Double porcentajeProyecto = calcularPorcentajeAvance(proyectoId);
		avanceCompleto.put("porcentajeProyecto", porcentajeProyecto);

		// Funcionalidades con ID, nombre y porcentaje
		List<Funcionalidad> funcionalidades = funcionalidadRepository.findAll().stream()
				.filter(f -> f.getProyecto().getId().equals(proyectoId))
				.toList();
		List<Map<String, Object>> funcionalidadesConPorcentaje = new ArrayList<>();
		for (Funcionalidad f : funcionalidades) {
			Double porcentaje = calcularPorcentajeFuncionalidad(f.getId());
			Map<String, Object> funcionalidadData = new HashMap<>();
			funcionalidadData.put("id", f.getId());
			funcionalidadData.put("nombre", f.getNombre());
			funcionalidadData.put("porcentaje", porcentaje);
			funcionalidadesConPorcentaje.add(funcionalidadData);
		}
		avanceCompleto.put("funcionalidades", funcionalidadesConPorcentaje);

		// Fases con ID, nombre y porcentaje
		List<VistaProyectoCompleto> proyectoCompleto = getProyectoCompleto(proyectoId);
		Map<Long, Map<String, Object>> fasesConPorcentaje = new HashMap<>();
		for (VistaProyectoCompleto vista : proyectoCompleto) {
			if (!fasesConPorcentaje.containsKey(vista.getFaseId())) {
				Double porcentaje = calcularPorcentajeFase(vista.getFaseId());
				Map<String, Object> faseData = new HashMap<>();
				faseData.put("id", vista.getFaseId());
				faseData.put("nombre", vista.getNombreFase());
				faseData.put("porcentaje", porcentaje);
				fasesConPorcentaje.put(vista.getFaseId(), faseData);
			}
		}
		avanceCompleto.put("fases", new ArrayList<>(fasesConPorcentaje.values()));

		// Enviar actualización por WebSocket (si aplica)
		messagingTemplate.convertAndSend("/topic/proyectos/" + proyectoId + "/avance-completo", avanceCompleto);
		return avanceCompleto;
	}
}