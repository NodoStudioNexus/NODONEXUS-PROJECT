package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import java.util.List;
import java.util.Map;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.ActualizarEstadoRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.VistaProyectoCompleto;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.ProyectoService;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.ServiciosPorcentajesProyectos;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudUsuario;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesEnProgreso;
import org.nodonexus.Backend_nodoNexus.domain.model.vistas.VistaSolicitudesPendientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/solicitudes")
public class ProyectoController {

	private final ProyectoService proyectoService;
	private final ServiciosPorcentajesProyectos serviciosPorcentajesProyectos;

	@Autowired
	public ProyectoController(ProyectoService proyectoService,
			ServiciosPorcentajesProyectos serviciosPorcentajesProyectos) {
		this.proyectoService = proyectoService;
		this.serviciosPorcentajesProyectos = serviciosPorcentajesProyectos;
	}

	@GetMapping("/pendientes")
	public ResponseEntity<List<VistaSolicitudesPendientes>> getSolicitudesPendientes() {
		List<VistaSolicitudesPendientes> solicitudes = proyectoService.getSolicitudesPendientes();
		return ResponseEntity.ok(solicitudes);
	}

	@GetMapping("/enProgreso")
	public ResponseEntity<List<VistaSolicitudesEnProgreso>> getSolicitudesEnProgreso() {
		List<VistaSolicitudesEnProgreso> solicitudes = proyectoService.getSolicitudesEnProgresos();
		return ResponseEntity.ok(solicitudes);
	}

	@GetMapping("/usuario/{usuarioId}")
	public ResponseEntity<List<VistaSolicitudUsuario>> getSolicitudesByUsuarioId(@PathVariable Long usuarioId) {
		List<VistaSolicitudUsuario> solicitudes = proyectoService.getSolicitudesByUsuarioId(usuarioId);
		if (solicitudes.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
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

	@PutMapping("/funcionalidad-fase/{id}/estado")
	public ResponseEntity<Void> actualizarEstadoFuncionalidadFase(
			@PathVariable Long id, @RequestBody ActualizarEstadoRequest request) {
		proyectoService.actualizarEstadoFuncionalidadFase(id, request.getNuevoEstado());
		Long proyectoId = proyectoService.getProyectoIdPorFuncionalidadFase(id);
		serviciosPorcentajesProyectos.calcularPorcentajeAvance(proyectoId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/requisito-fase/{id}/estado")
	public ResponseEntity<Void> actualizarEstadoRequisitoFase(
			@PathVariable Long id, @RequestBody ActualizarEstadoRequest request) {
		proyectoService.actualizarEstadoRequisitoFase(id, request.getNuevoEstado());
		Long proyectoId = proyectoService.getProyectoIdPorRequisitoFase(id);
		serviciosPorcentajesProyectos.calcularPorcentajeAvance(proyectoId);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/proyectos")
	public ResponseEntity<List<VistaProyectoCompleto>> crearProyectoDesdeSolicitud(
			@RequestBody SolicitudProyecto solicitud) {
		Long proyectoId = proyectoService.getProyectoIdPorSolicitud(solicitud.getId());
		List<VistaProyectoCompleto> proyectoCompleto = serviciosPorcentajesProyectos.getProyectoCompleto(proyectoId);
		return ResponseEntity.ok(proyectoCompleto);
	}

	@GetMapping("/proyectos/{proyectoId}/completo")
	public ResponseEntity<List<VistaProyectoCompleto>> getProyectoCompleto(@PathVariable Long proyectoId) {
		List<VistaProyectoCompleto> proyectoCompleto = serviciosPorcentajesProyectos.getProyectoCompleto(proyectoId);
		if (proyectoCompleto.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(proyectoCompleto);
	}

	@GetMapping("/proyectos/vista")
	public ResponseEntity<List<Map<String, Object>>> getProyectosVista() {
		List<Map<String, Object>> proyectos = proyectoService.getProyectosVista();
		return ResponseEntity.ok(proyectos);
	}
}