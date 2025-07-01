package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.RequisitoDTO;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Requisito;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.RequisitoFase;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.RequisitoFaseRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.RequisitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequisitoService {

	private final RequisitoRepository requisitoRepository;
	private final FuncionalidadRepository funcionalidadRepository;
	private final RequisitoFaseRepository requisitoFaseRepository;
	private final SimpMessagingTemplate messagingTemplate;

	private static final List<String> FASES = List.of("analisis", "planificacion", "modelado", "implementacion",
			"revision", "pruebas");

	@Autowired
	public RequisitoService(RequisitoRepository requisitoRepository,
			FuncionalidadRepository funcionalidadRepository,
			RequisitoFaseRepository requisitoFaseRepository,
			SimpMessagingTemplate messagingTemplate) {
		this.requisitoRepository = requisitoRepository;
		this.funcionalidadRepository = funcionalidadRepository;
		this.requisitoFaseRepository = requisitoFaseRepository;
		this.messagingTemplate = messagingTemplate;
	}

	public RequisitoDTO crearRequisito(Long funcionalidadId, String nombre, String descripcion) {
		Funcionalidad funcionalidad = funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));
		Requisito requisito = new Requisito();
		requisito.setFuncionalidad(funcionalidad);
		requisito.setNombre(nombre);
		requisito.setDescripcion(descripcion);
		requisito.setEstado("PENDIENTE");
		Requisito savedRequisito = requisitoRepository.save(requisito);
		RequisitoDTO dto = toDTO(savedRequisito);
		messagingTemplate.convertAndSend("/topic/requisitos/creados", dto);
		return dto;
	}

	public RequisitoDTO obtenerRequisito(Long requisitoId) {
		Requisito requisito = requisitoRepository.findById(requisitoId)
				.orElseThrow(() -> new IllegalArgumentException("Requisito no encontrado con ID: " + requisitoId));
		return toDTO(requisito);
	}

	public List<RequisitoDTO> obtenerRequisitosPorFuncionalidad(Long funcionalidadId) {
		// Validar que la funcionalidad existe
		funcionalidadRepository.findById(funcionalidadId)
				.orElseThrow(() -> new IllegalArgumentException("Funcionalidad no encontrada con ID: " + funcionalidadId));

		// Obtener todos los requisitos asociados a la funcionalidad
		List<Requisito> requisitos = requisitoRepository.findAll().stream()
				.filter(r -> r.getFuncionalidad().getId().equals(funcionalidadId))
				.collect(Collectors.toList());

		return requisitos.stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	public RequisitoDTO actualizarRequisito(Long requisitoId, String nombre, String descripcion) {
		Requisito requisito = requisitoRepository.findById(requisitoId)
				.orElseThrow(() -> new IllegalArgumentException("Requisito no encontrado con ID: " + requisitoId));
		requisito.setNombre(nombre);
		requisito.setDescripcion(descripcion);
		Requisito updatedRequisito = requisitoRepository.save(requisito);
		RequisitoDTO dto = toDTO(updatedRequisito);
		messagingTemplate.convertAndSend("/topic/requisitos/actualizados", dto);
		return dto;
	}

	public void eliminarRequisito(Long requisitoId) {
		Requisito requisito = requisitoRepository.findById(requisitoId)
				.orElseThrow(() -> new IllegalArgumentException("Requisito no encontrado con ID: " + requisitoId));
		requisitoRepository.delete(requisito);
		messagingTemplate.convertAndSend("/topic/requisitos/eliminados", requisitoId);
	}

	public RequisitoDTO avanzarFaseRequisito(Long requisitoId, String faseActual, String nuevoEstado) {
		Requisito requisito = requisitoRepository.findById(requisitoId)
				.orElseThrow(() -> new IllegalArgumentException("Requisito no encontrado con ID: " + requisitoId));
		List<RequisitoFase> fases = requisitoFaseRepository.findByRequisitoId(requisitoId);

		RequisitoFase fase = fases.stream()
				.filter(rf -> rf.getFaseProyecto().getNombreFase().equalsIgnoreCase(faseActual))
				.findFirst()
				.orElseThrow(() -> new IllegalArgumentException("Fase " + faseActual + " no encontrada para el requisito"));

		if (nuevoEstado.equals("COMPLETADO")) {
			int indiceActual = FASES.indexOf(faseActual.toLowerCase());
			if (indiceActual > 0) {
				RequisitoFase faseAnterior = fases.stream()
						.filter(rf -> rf.getFaseProyecto().getNombreFase().equalsIgnoreCase(FASES.get(indiceActual - 1)))
						.findFirst()
						.orElse(null);
				if (faseAnterior != null && !faseAnterior.getEstado().equals("COMPLETADO")) {
					throw new IllegalStateException("La fase anterior debe estar completada antes de avanzar.");
				}
			}
		}

		fase.setEstado(nuevoEstado);
		requisitoFaseRepository.save(fase);

		boolean todasCompletadas = fases.stream().allMatch(rf -> rf.getEstado().equals("COMPLETADO"));
		if (todasCompletadas) {
			requisito.setEstado("ENTREGADO");
		} else {
			requisito.setEstado("EN_PROGRESO");
		}
		Requisito updatedRequisito = requisitoRepository.save(requisito);
		RequisitoDTO dto = toDTO(updatedRequisito);
		messagingTemplate.convertAndSend("/topic/requisitos/estados", dto);
		return dto;
	}

	private RequisitoDTO toDTO(Requisito requisito) {
		RequisitoDTO dto = new RequisitoDTO();
		dto.setId(requisito.getId());
		dto.setFuncionalidadId(requisito.getFuncionalidad().getId());
		dto.setNombre(requisito.getNombre());
		dto.setDescripcion(requisito.getDescripcion());
		dto.setEstado(requisito.getEstado());
		return dto;
	}
}