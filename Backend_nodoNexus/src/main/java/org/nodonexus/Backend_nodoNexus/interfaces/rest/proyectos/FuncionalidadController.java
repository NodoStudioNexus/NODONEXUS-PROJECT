package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.CrearFuncionalidadRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.FuncionalidadService;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/funcionalidades")
public class FuncionalidadController {

	private final FuncionalidadService funcionalidadService;

	@Autowired
	public FuncionalidadController(FuncionalidadService funcionalidadService) {
		this.funcionalidadService = funcionalidadService;
	}

	@PostMapping("/proyectos/{proyectoId}/funcionalidades")
	public ResponseEntity<Funcionalidad> crearFuncionalidad(
			@PathVariable Long proyectoId,
			@RequestBody CrearFuncionalidadRequest request) {
		Funcionalidad funcionalidad = funcionalidadService.crearFuncionalidad(proyectoId, request.getNombre(),
				request.getDescripcion());
		return ResponseEntity.ok(funcionalidad);
	}
}