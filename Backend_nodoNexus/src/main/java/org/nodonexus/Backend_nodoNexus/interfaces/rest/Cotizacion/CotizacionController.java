package org.nodonexus.Backend_nodoNexus.interfaces.rest.Cotizacion;

import org.nodonexus.Backend_nodoNexus.application.cotizacion.dto.CrearCotizacionRequest;
import org.nodonexus.Backend_nodoNexus.application.cotizacion.service.CotizacionService;
import org.nodonexus.Backend_nodoNexus.domain.model.Cotizacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cotizaciones")
public class CotizacionController {

	private final CotizacionService cotizacionService;

	@Autowired
	public CotizacionController(CotizacionService cotizacionService) {
		this.cotizacionService = cotizacionService;
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
	@PostMapping
	public ResponseEntity<String> crearCotizacion(@RequestBody CrearCotizacionRequest request) {
		Cotizacion cotizacion = cotizacionService.crearCotizacion(request);
		return ResponseEntity.ok("Cotización creada y enviada al cliente. ID: " + cotizacion.getId());
	}
}