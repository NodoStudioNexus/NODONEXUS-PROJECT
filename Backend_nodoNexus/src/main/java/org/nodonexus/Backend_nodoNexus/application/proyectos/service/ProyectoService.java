package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

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
			JdbcTemplate jdbcTemplate) {
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
	}

	/**
	 * Obtiene todas las solicitudes pendientes.
	 */
	public List<VistaSolicitudesPendientes> getSolicitudesPendientes() {
		return vistaSolicitudesPendientesRepository.findAll();
	}

	/**
	 * Obtiene todas las solicitudes en progreso.
	 */
	public List<VistaSolicitudesEnProgreso> getSolicitudesEnProgresos() {
		return vistaSolicitudesEnProgresoRepository.findAll();
	}

	/**
	 * Obtiene los detalles de una solicitud por su ID.
	 */
	public SolicitudProyecto getSolicitudDetalles(Long id) {
		return solicitudProyectoRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada con ID: " + id));
	}

	/**
	 * Obtiene todas las solicitudes.
	 */
	public List<SolicitudProyecto> getAllSolicitudes() {
		return solicitudProyectoRepository.findAll();
	}

	/**
	 * Obtiene las solicitudes de un usuario específico.
	 */
	public List<VistaSolicitudUsuario> getSolicitudesByUsuarioId(Long usuarioId) {
		return vistaSolicitudUsuarioRepository.findByUsuarioId(usuarioId);
	}

	/**
	 * Calcula el porcentaje de avance de un proyecto.
	 */
	public Double calcularPorcentajeAvance(Long proyectoId) {
		return jdbcTemplate.queryForObject(
				"SELECT calcular_porcentaje_avance(?)",
				new Object[] { proyectoId },
				Double.class);
	}

	/**
	 * Actualiza el estado de una FuncionalidadFase.
	 */
	public void actualizarEstadoFuncionalidadFase(Long id, String nuevoEstado) {
		FuncionalidadFase ff = funcionalidadFaseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("FuncionalidadFase no encontrada con ID: " + id));
		jdbcTemplate.update("SELECT validar_avance_fase('funcionalidad_fase', ?, ?, ?)",
				ff.getFuncionalidad().getId(), ff.getFaseProyecto().getId(), nuevoEstado);
		ff.setEstado(nuevoEstado);
		funcionalidadFaseRepository.save(ff);
	}

	/**
	 * Actualiza el estado de una RequisitoFase.
	 */
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
		} else {
			throw new IllegalStateException("No se puede actualizar el estado debido a la validación de avance.");
		}
	}

	/**
	 * Crea un nuevo requisito para una funcionalidad.
	 */
	public Requisito crearRequisito(Long funcionalidadId, String descripcion) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		Requisito requisito = new Requisito();
		requisito.setFuncionalidad(funcionalidad);
		requisito.setDescripcion(descripcion);
		requisito.setEstado("PENDIENTE");
		return requisitoRepository.save(requisito);
	}

	/**
	 * Crea una nueva funcionalidad para un proyecto.
	 */
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

	/**
	 * Obtiene la vista completa de un proyecto.
	 */
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

	/**
	 * Obtiene el ID del proyecto asociado a un requisito_fase dado.
	 */
	public Long getProyectoIdPorRequisitoFase(Long requisitoFaseId) {
		RequisitoFase rf = requisitoFaseRepository.findById(requisitoFaseId)
				.orElseThrow(() -> new IllegalArgumentException("RequisitoFase no encontrado con ID: " + requisitoFaseId));
		Requisito requisito = rf.getRequisito();
		Funcionalidad funcionalidad = requisito.getFuncionalidad();
		Proyecto proyecto = funcionalidad.getProyecto();
		return proyecto.getId();
	}

	/**
	 * Actualiza el estado de una solicitud_proyecto a "COMPLETADA".
	 */
	public SolicitudProyecto actualizarEstadoSolicitudACompletada(Long solicitudId) {
		SolicitudProyecto solicitud = solicitudProyectoRepository.findById(solicitudId)
				.orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada con ID: " + solicitudId));
		solicitud.setEstado(EstadoSolicitud.COMPLETADA); // Usando el enum EstadoSolicitud
		return solicitudProyectoRepository.save(solicitud);
	}

	/**
	 * Obtiene el ID del proyecto asociado a una solicitud_proyecto.
	 */
	public Long getProyectoIdPorSolicitud(Long solicitudId) {
		Proyecto proyecto = proyectoRepository.findBySolicitudId(solicitudId)
				.orElseThrow(
						() -> new IllegalArgumentException("Proyecto no encontrado para la solicitud con ID: " + solicitudId));
		return proyecto.getId();
	}

	/**
	 * Obtiene el ID del proyecto asociado a una funcionalidad_fase dada.
	 */
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
}