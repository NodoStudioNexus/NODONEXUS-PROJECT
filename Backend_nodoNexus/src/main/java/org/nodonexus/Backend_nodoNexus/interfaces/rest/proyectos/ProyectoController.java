package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import java.util.List;
import java.util.Map;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.ActualizarEstadoRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.CrearFuncionalidadRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.CrearRequisitoRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.VistaProyectoCompleto;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.ProyectoService;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Requisito;
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

	@Autowired
	public ProyectoController(ProyectoService proyectoService) {
		this.proyectoService = proyectoService;
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

	@GetMapping("/proyectos/{proyectoId}/avance")
	public ResponseEntity<Double> getPorcentajeAvance(@PathVariable Long proyectoId) {
		Double porcentaje = proyectoService.calcularPorcentajeAvance(proyectoId);
		return ResponseEntity.ok(porcentaje);
	}

	@PutMapping("/funcionalidad-fase/{id}/estado")
	public ResponseEntity<Void> actualizarEstadoFuncionalidadFase(
			@PathVariable Long id, @RequestBody ActualizarEstadoRequest request) {
		proyectoService.actualizarEstadoFuncionalidadFase(id, request.getNuevoEstado());
		Long proyectoId = proyectoService.getProyectoIdPorFuncionalidadFase(id);
		proyectoService.calcularPorcentajeAvance(proyectoId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/requisito-fase/{id}/estado")
	public ResponseEntity<Void> actualizarEstadoRequisitoFase(
			@PathVariable Long id, @RequestBody ActualizarEstadoRequest request) {
		proyectoService.actualizarEstadoRequisitoFase(id, request.getNuevoEstado());
		Long proyectoId = proyectoService.getProyectoIdPorRequisitoFase(id);
		proyectoService.calcularPorcentajeAvance(proyectoId);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/proyectos/{proyectoId}/funcionalidades")
	public ResponseEntity<Funcionalidad> crearFuncionalidad(
			@PathVariable Long proyectoId,
			@RequestBody CrearFuncionalidadRequest request) {
		Funcionalidad funcionalidad = proyectoService.crearFuncionalidad(proyectoId, request.getNombre(),
				request.getDescripcion());
		return ResponseEntity.ok(funcionalidad);
	}

	@PostMapping("/funcionalidades/{funcionalidadId}/requisitos")
	public ResponseEntity<Requisito> crearRequisito(
			@PathVariable Long funcionalidadId,
			@RequestBody CrearRequisitoRequest request) {
		Requisito requisito = proyectoService.crearRequisito(funcionalidadId, request.getDescripcion());
		return ResponseEntity.ok(requisito);
	}

	@PostMapping("/proyectos")
	public ResponseEntity<List<VistaProyectoCompleto>> crearProyectoDesdeSolicitud(
			@RequestBody SolicitudProyecto solicitud) {
		Long proyectoId = proyectoService.getProyectoIdPorSolicitud(solicitud.getId());
		List<VistaProyectoCompleto> proyectoCompleto = proyectoService.getProyectoCompleto(proyectoId);
		return ResponseEntity.ok(proyectoCompleto);
	}

	@GetMapping("/proyectos/{proyectoId}/completo")
	public ResponseEntity<List<VistaProyectoCompleto>> getProyectoCompleto(@PathVariable Long proyectoId) {
		List<VistaProyectoCompleto> proyectoCompleto = proyectoService.getProyectoCompleto(proyectoId);
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

	@GetMapping("/funcionalidades/{funcionalidadId}/avance")
	public ResponseEntity<Double> getPorcentajeAvanceFuncionalidad(@PathVariable Long funcionalidadId) {
		Double porcentaje = proyectoService.calcularPorcentajeFuncionalidad(funcionalidadId);
		return ResponseEntity.ok(porcentaje);
	}

	@GetMapping("/fases/{faseId}/avance")
	public ResponseEntity<Double> getPorcentajeAvanceFase(@PathVariable Long faseId) {
		Double porcentaje = proyectoService.calcularPorcentajeFase(faseId);
		return ResponseEntity.ok(porcentaje);
	}

	@GetMapping("/proyectos/{proyectoId}/avance-completo")
	public ResponseEntity<Map<String, Object>> getAvanceCompletoProyecto(@PathVariable Long proyectoId) {
		Map<String, Object> avanceCompleto = proyectoService.getAvanceCompletoProyecto(proyectoId);
		return ResponseEntity.ok(avanceCompleto);
	}
}