package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.List;
import java.util.stream.Collectors;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.FuncionalidadDTO;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Proyecto;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class FuncionalidadService {

	private final FuncionalidadRepository funcionalidadRepository;
	private final ProyectoRepository proyectoRepository;
	private final SimpMessagingTemplate messagingTemplate;

	@Autowired
	public FuncionalidadService(FuncionalidadRepository funcionalidadRepository, ProyectoRepository proyectoRepository,
			SimpMessagingTemplate messagingTemplate) {
		this.funcionalidadRepository = funcionalidadRepository;
		this.proyectoRepository = proyectoRepository;
		this.messagingTemplate = messagingTemplate;
	}

	public List<FuncionalidadDTO> getFuncionalidadesPorProyecto(Long proyectoId) {
		List<Funcionalidad> funcionalidades = funcionalidadRepository.findByProyectoId(proyectoId);
		return funcionalidades.stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	public FuncionalidadDTO crearFuncionalidad(Long proyectoId, String nombre, String descripcion) {
		Proyecto proyecto = proyectoRepository.findById(proyectoId)
				.orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado con ID: " + proyectoId));
		Funcionalidad funcionalidad = new Funcionalidad();
		funcionalidad.setProyecto(proyecto);
		funcionalidad.setNombre(nombre);
		funcionalidad.setDescripcion(descripcion);
		funcionalidad.setEstado("PENDIENTE");
		Funcionalidad savedFuncionalidad = funcionalidadRepository.save(funcionalidad);
		FuncionalidadDTO dto = toDTO(savedFuncionalidad);
		messagingTemplate.convertAndSend("/topic/funcionalidades/creadas", dto);
		return dto;
	}

	public FuncionalidadDTO obtenerFuncionalidad(Long funcionalidadId) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		return toDTO(funcionalidad);
	}

	public FuncionalidadDTO actualizarFuncionalidad(Long funcionalidadId, String nombre, String descripcion) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		funcionalidad.setNombre(nombre);
		funcionalidad.setDescripcion(descripcion);
		Funcionalidad updatedFuncionalidad = funcionalidadRepository.save(funcionalidad);
		FuncionalidadDTO dto = toDTO(updatedFuncionalidad);
		messagingTemplate.convertAndSend("/topic/funcionalidades/actualizadas", dto);
		return dto;
	}

	public void eliminarFuncionalidad(Long funcionalidadId) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		funcionalidadRepository.delete(funcionalidad);
		messagingTemplate.convertAndSend("/topic/funcionalidades/eliminadas", funcionalidadId);
	}

	private FuncionalidadDTO toDTO(Funcionalidad funcionalidad) {
		FuncionalidadDTO dto = new FuncionalidadDTO();
		dto.setId(funcionalidad.getId());
		dto.setNombre(funcionalidad.getNombre());
		dto.setDescripcion(funcionalidad.getDescripcion());
		dto.setEstado(funcionalidad.getEstado());
		dto.setPorcentajeAvance(funcionalidad.getPorcentajeAvance());
		dto.setProyectoId(funcionalidad.getProyecto().getId());
		return dto;
	}
}