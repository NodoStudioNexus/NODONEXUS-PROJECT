package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.VistaSolicitudesEnProgreso;
import org.nodonexus.Backend_nodoNexus.domain.model.VistaSolicitudesPendientes;
import org.nodonexus.Backend_nodoNexus.domain.ports.SolicitudProyectoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.VistaSolicitudesEnProgresoRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.VistaSolicitudesPendientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {

	private final VistaSolicitudesPendientesRepository vistaSolicitudesPendientesRepository;
	private final VistaSolicitudesEnProgresoRepository VistaSolicitudesEnProgresoRepository;
	private final SolicitudProyectoRepository solicitudProyectoRepository;

	@Autowired
	public ProyectoService(VistaSolicitudesPendientesRepository vistaSolicitudesPendientesRepository,
			SolicitudProyectoRepository solicitudProyectoRepository,
			VistaSolicitudesEnProgresoRepository VistaSolicitudesEnProgresoRepository) {
		this.vistaSolicitudesPendientesRepository = vistaSolicitudesPendientesRepository;
		this.solicitudProyectoRepository = solicitudProyectoRepository;
		this.VistaSolicitudesEnProgresoRepository = VistaSolicitudesEnProgresoRepository;
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
}