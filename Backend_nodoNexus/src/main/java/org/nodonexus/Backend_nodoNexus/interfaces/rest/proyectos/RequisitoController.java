package org.nodonexus.Backend_nodoNexus.interfaces.rest.proyectos;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.CrearRequisitoRequest;
import org.nodonexus.Backend_nodoNexus.application.proyectos.service.RequisitoService;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Requisito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/requisitos")
public class RequisitoController {

	private final RequisitoService requisitoService;

	@Autowired
	public RequisitoController(RequisitoService requisitoService) {
		this.requisitoService = requisitoService;
	}

	@PostMapping("/funcionalidades/{funcionalidadId}/requisitos")
	public ResponseEntity<Requisito> crearRequisito(
			@PathVariable Long funcionalidadId,
			@RequestBody CrearRequisitoRequest request) {
		Requisito requisito = requisitoService.crearRequisito(funcionalidadId, request.getDescripcion());
		return ResponseEntity.ok(requisito);
	}
}