package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.application.proyectos.service.ProyectoService;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.VistaSolicitudesPendientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/solicitudes")
public class ProyectoController {

	private final ProyectoService proyectoService;

	@Autowired
	public ProyectoController(ProyectoService proyectoService) {
		this.proyectoService = proyectoService;
	}

	@GetMapping("/pendientes")
	public ResponseEntity<List<VistaSolicitudesPendientes>> getSolicitudesPendientes() {
		List<VistaSolicitudesPendientes> solicitudes = proyectoService.getSolicitudesPendientes();
		return ResponseEntity.ok(solicitudes);
	}

	@GetMapping("/{id}")
	public ResponseEntity<SolicitudProyecto> getSolicitudDetalles(@PathVariable Long id) {
		SolicitudProyecto solicitud = proyectoService.getSolicitudDetalles(id);
		return ResponseEntity.ok(solicitud);
	}

	@GetMapping
	public ResponseEntity<List<SolicitudProyecto>> getAllSolicitudes() {
		List<SolicitudProyecto> solicitudes = proyectoService.getAllSolicitudes();
		return ResponseEntity.ok(solicitudes);
	}
}