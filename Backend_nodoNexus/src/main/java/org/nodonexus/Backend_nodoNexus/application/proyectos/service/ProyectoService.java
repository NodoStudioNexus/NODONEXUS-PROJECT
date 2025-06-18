package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.List;

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
		return jdbcTemplate.queryForObject(
				"SELECT calcular_porcentaje_avance(?)",
				new Object[] { proyectoId },
				Double.class);
	}

	public void actualizarEstadoFuncionalidadFase(Long id, String nuevoEstado) {
		FuncionalidadFase ff = funcionalidadFaseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("FuncionalidadFase no encontrada con ID: " + id));
		jdbcTemplate.update("SELECT validar_avance_fase('funcionalidad_fase', ?, ?, ?)",
				ff.getFuncionalidad().getId(), ff.getFaseProyecto().getId(), nuevoEstado);
		ff.setEstado(nuevoEstado);
		funcionalidadFaseRepository.save(ff);
	}

	public void actualizarEstadoRequisitoFase(Long id, String nuevoEstado) {
		RequisitoFase rf = requisitoFaseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("RequisitoFase no encontrada con ID: " + id));

		// Llamar a la función y obtener el resultado booleano
		boolean validacionExitosa = jdbcTemplate.queryForObject(
				"SELECT validar_avance_fase('requisito_fase', ?, ?, ?)",
				new Object[] { rf.getRequisito().getId(), rf.getFaseProyecto().getId(), nuevoEstado },
				Boolean.class);

		// Si la validación es exitosa, actualizar el estado
		if (validacionExitosa) {
			rf.setEstado(nuevoEstado);
			requisitoFaseRepository.save(rf);
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
}