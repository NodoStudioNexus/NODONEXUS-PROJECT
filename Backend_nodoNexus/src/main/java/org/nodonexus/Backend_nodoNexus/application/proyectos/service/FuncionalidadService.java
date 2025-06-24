package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Proyecto;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncionalidadService {

	private final FuncionalidadRepository funcionalidadRepository;
	private final ProyectoRepository proyectoRepository;

	@Autowired
	public FuncionalidadService(FuncionalidadRepository funcionalidadRepository, ProyectoRepository proyectoRepository) {
		this.funcionalidadRepository = funcionalidadRepository;
		this.proyectoRepository = proyectoRepository;
	}

	public Funcionalidad crearFuncionalidad(Long proyectoId, String nombre, String descripcion) {
		Proyecto proyecto = proyectoRepository.findById(proyectoId)
				.orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado con ID: " + proyectoId));
		Funcionalidad funcionalidad = new Funcionalidad();
		funcionalidad.setProyecto(proyecto);
		funcionalidad.setNombre(nombre);
		funcionalidad.setDescripcion(descripcion);
		funcionalidad.setEstado("PENDIENTE");
		return funcionalidadRepository.save(funcionalidad);
	}
}