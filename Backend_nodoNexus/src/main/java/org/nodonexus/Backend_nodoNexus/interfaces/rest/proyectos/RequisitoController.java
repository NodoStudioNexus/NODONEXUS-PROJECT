package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.CrearRequisitoRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.RequisitoDTO;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.RequisitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requisitos")
public class RequisitoController {

	private final RequisitoService requisitoService;

	@Autowired
	public RequisitoController(RequisitoService requisitoService) {
		this.requisitoService = requisitoService;
	}

	@PostMapping("/funcionalidades/{funcionalidadId}/requisitos")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<RequisitoDTO> crearRequisito(
			@PathVariable Long funcionalidadId,
			@RequestBody CrearRequisitoRequest request) {
		RequisitoDTO requisito = requisitoService.crearRequisito(funcionalidadId, request.getNombre(),
				request.getDescripcion());
		return ResponseEntity.ok(requisito);
	}

	@GetMapping("/{requisitoId}")
	public ResponseEntity<RequisitoDTO> obtenerRequisito(@PathVariable Long requisitoId) {
		RequisitoDTO requisito = requisitoService.obtenerRequisito(requisitoId);
		return ResponseEntity.ok(requisito);
	}

	@GetMapping("/funcionalidades/{funcionalidadId}/requisitos")
	public ResponseEntity<List<RequisitoDTO>> obtenerRequisitosPorFuncionalidad(@PathVariable Long funcionalidadId) {
		List<RequisitoDTO> requisitos = requisitoService.obtenerRequisitosPorFuncionalidad(funcionalidadId);
		if (requisitos.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(requisitos);
	}

	@PutMapping("/{requisitoId}")
	public ResponseEntity<RequisitoDTO> actualizarRequisito(
			@PathVariable Long requisitoId,
			@RequestBody CrearRequisitoRequest request) {
		RequisitoDTO requisito = requisitoService.actualizarRequisito(requisitoId, request.getNombre(),
				request.getDescripcion());
		return ResponseEntity.ok(requisito);
	}

	@DeleteMapping("/{requisitoId}")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<Void> eliminarRequisito(@PathVariable Long requisitoId) {
		requisitoService.eliminarRequisito(requisitoId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/{requisitoId}/fase/{faseActual}/estado")
	public ResponseEntity<RequisitoDTO> avanzarFaseRequisito(
			@PathVariable Long requisitoId,
			@PathVariable String faseActual,
			@RequestBody String nuevoEstado) {
		RequisitoDTO requisito = requisitoService.avanzarFaseRequisito(requisitoId, faseActual, nuevoEstado);
		return ResponseEntity.ok(requisito);
	}
}