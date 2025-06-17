package org.nodonexus.Backend_nodoNexus.interfaces.rest.solicitudProyecto;

import org.nodonexus.Backend_nodoNexus.application.solicitudProyecto.dto.CrearSolicitudRequest;
import org.nodonexus.Backend_nodoNexus.application.solicitudProyecto.service.SolicitudProyectoService;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudProyectoController {

	private final SolicitudProyectoService service;

	@Autowired
	public SolicitudProyectoController(SolicitudProyectoService service) {
		this.service = service;
	}

	@PostMapping("/nuevoProyecto")
	public ResponseEntity<SolicitudProyecto> crearSolicitud(@RequestBody CrearSolicitudRequest request) {
		System.out.println("Request completo: " + request);
		System.out.println("Email recibido: " + request.getEmail());
		SolicitudProyecto nuevaSolicitud = service.crearSolicitud(request);
		return ResponseEntity.ok(nuevaSolicitud);
	}

}