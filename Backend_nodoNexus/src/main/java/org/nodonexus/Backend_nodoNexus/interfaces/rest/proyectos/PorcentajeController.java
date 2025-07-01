package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import java.util.Map;

import org.nodonexus.Backend_nodoNexus.application.proyectos.service.ServiciosPorcentajesProyectos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/porcentajes")
public class PorcentajeController {

	private final ServiciosPorcentajesProyectos serviciosPorcentajesProyectos;

	@Autowired
	public PorcentajeController(ServiciosPorcentajesProyectos serviciosPorcentajesProyectos) {
		this.serviciosPorcentajesProyectos = serviciosPorcentajesProyectos;
	}

	@GetMapping("/proyectos/{proyectoId}/avance")
	public ResponseEntity<Double> getPorcentajeAvance(@PathVariable Long proyectoId) {
		Double porcentaje = serviciosPorcentajesProyectos.calcularPorcentajeAvance(proyectoId);
		return ResponseEntity.ok(porcentaje);
	}

	@GetMapping("/funcionalidades/{funcionalidadId}/avance")
	public ResponseEntity<Double> getPorcentajeAvanceFuncionalidad(@PathVariable Long funcionalidadId) {
		Double porcentaje = serviciosPorcentajesProyectos.calcularPorcentajeFuncionalidad(funcionalidadId);
		return ResponseEntity.ok(porcentaje);
	}

	@GetMapping("/fases/{faseId}/avance")
	public ResponseEntity<Double> getPorcentajeAvanceFase(@PathVariable Long faseId) {
		Double porcentaje = serviciosPorcentajesProyectos.calcularPorcentajeFase(faseId);
		return ResponseEntity.ok(porcentaje);
	}

	@GetMapping("/proyectos/{proyectoId}/avance-completo")
	public ResponseEntity<Map<String, Object>> getAvanceCompletoProyecto(@PathVariable Long proyectoId) {
		Map<String, Object> avanceCompleto = serviciosPorcentajesProyectos.getAvanceCompletoProyecto(proyectoId);
		return ResponseEntity.ok(avanceCompleto);
	}
}