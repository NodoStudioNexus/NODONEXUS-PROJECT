package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.CrearFuncionalidadRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.FuncionalidadDTO;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.FuncionalidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/funcionalidades")
public class FuncionalidadController {

	private final FuncionalidadService funcionalidadService;

	@Autowired
	public FuncionalidadController(FuncionalidadService funcionalidadService) {
		this.funcionalidadService = funcionalidadService;
	}

	@GetMapping("/{funcionalidadId}")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<FuncionalidadDTO> obtenerFuncionalidad(@PathVariable Long funcionalidadId) {
		FuncionalidadDTO funcionalidad = funcionalidadService.obtenerFuncionalidad(funcionalidadId);
		return ResponseEntity.ok(funcionalidad);
	}

	@GetMapping("/proyectos/{proyectoId}/funcionalidades")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<List<FuncionalidadDTO>> getFuncionalidadesPorProyecto(@PathVariable Long proyectoId) {
		List<FuncionalidadDTO> funcionalidades = funcionalidadService.getFuncionalidadesPorProyecto(proyectoId);
		if (funcionalidades.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(funcionalidades);
	}

	@PostMapping("/proyectos/{proyectoId}")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<FuncionalidadDTO> crearFuncionalidad(
			@PathVariable Long proyectoId,
			@RequestBody CrearFuncionalidadRequest request) {
		FuncionalidadDTO funcionalidad = funcionalidadService.crearFuncionalidad(proyectoId, request.getNombre(),
				request.getDescripcion());
		return ResponseEntity.ok(funcionalidad);
	}

	@PutMapping("/{funcionalidadId}")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<FuncionalidadDTO> actualizarFuncionalidad(
			@PathVariable Long funcionalidadId,
			@RequestBody CrearFuncionalidadRequest request) {
		FuncionalidadDTO funcionalidad = funcionalidadService.actualizarFuncionalidad(funcionalidadId, request.getNombre(),
				request.getDescripcion());
		return ResponseEntity.ok(funcionalidad);
	}

	@DeleteMapping("/{funcionalidadId}")
	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	public ResponseEntity<Void> eliminarFuncionalidad(@PathVariable Long funcionalidadId) {
		funcionalidadService.eliminarFuncionalidad(funcionalidadId);
		return ResponseEntity.ok().build();
	}
}