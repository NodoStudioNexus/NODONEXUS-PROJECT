package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudUsuario;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesEnProgreso;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesPendientes;
import org.nodonexus.Backend_nodoNexus.domain.ports.SolicitudProyectoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.vistas.VistaSolicitudUsuarioRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.vistas.VistaSolicitudesEnProgresoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.vistas.VistaSolicitudesPendientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {

	private final VistaSolicitudesPendientesRepository vistaSolicitudesPendientesRepository;
	private final VistaSolicitudesEnProgresoRepository VistaSolicitudesEnProgresoRepository;
	private final SolicitudProyectoRepository solicitudProyectoRepository;
	private final VistaSolicitudUsuarioRepository vistaSolicitudUsuarioRepository;

	@Autowired
	public ProyectoService(VistaSolicitudesPendientesRepository vistaSolicitudesPendientesRepository,
			SolicitudProyectoRepository solicitudProyectoRepository,
			VistaSolicitudesEnProgresoRepository VistaSolicitudesEnProgresoRepository,
			VistaSolicitudUsuarioRepository vistaSolicitudUsuarioRepository) {
		this.vistaSolicitudesPendientesRepository = vistaSolicitudesPendientesRepository;
		this.solicitudProyectoRepository = solicitudProyectoRepository;
		this.VistaSolicitudesEnProgresoRepository = VistaSolicitudesEnProgresoRepository;
		this.vistaSolicitudUsuarioRepository = vistaSolicitudUsuarioRepository;
	}

	public List<VistaSolicitudesPendientes> getSolicitudesPendientes() {
		return vistaSolicitudesPendientesRepository.findAll();
	}

	public List<VistaSolicitudesEnProgreso> getSolicitudesEnProgresos() {
		return VistaSolicitudesEnProgresoRepository.findAll();
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
}