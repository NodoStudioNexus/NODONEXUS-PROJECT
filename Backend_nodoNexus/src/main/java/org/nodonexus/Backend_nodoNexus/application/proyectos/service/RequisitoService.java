package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Requisito;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.RequisitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequisitoService {

	private final RequisitoRepository requisitoRepository;
	private final FuncionalidadRepository funcionalidadRepository;

	@Autowired
	public RequisitoService(RequisitoRepository requisitoRepository, FuncionalidadRepository funcionalidadRepository) {
		this.requisitoRepository = requisitoRepository;
		this.funcionalidadRepository = funcionalidadRepository;
	}

	public Requisito crearRequisito(Long funcionalidadId, String descripcion) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		Requisito requisito = new Requisito();
		requisito.setFuncionalidad(funcionalidad);
		requisito.setDescripcion(descripcion);
		requisito.setEstado("PENDIENTE");
		return requisitoRepository.save(requisito);
	}
}