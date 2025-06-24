package org.nodonexus.Backend_nodoNexus.application.proyectos.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nodonexus.Backend_nodoNexus.application.proyectos.dto.VistaProyectoCompleto;
import org.nodonexus.Backend_nodoNexus.domain.model.proyecto.Funcionalidad;
import org.nodonexus.Backend_nodoNexus.domain.ports.proyecto.FuncionalidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ServiciosPorcentajesProyectos {

    private final JdbcTemplate jdbcTemplate;
    private final SimpMessagingTemplate messagingTemplate;
    private final FuncionalidadRepository funcionalidadRepository;

    @Autowired
    public ServiciosPorcentajesProyectos(JdbcTemplate jdbcTemplate, SimpMessagingTemplate messagingTemplate,
            FuncionalidadRepository funcionalidadRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.messagingTemplate = messagingTemplate;
        this.funcionalidadRepository = funcionalidadRepository;
    }

    public Double calcularPorcentajeAvance(Long proyectoId) {
        Double porcentaje = jdbcTemplate.queryForObject(
                "SELECT calcular_porcentaje_avance(?)",
                new Object[] { proyectoId },
                Double.class);
        messagingTemplate.convertAndSend("/topic/proyectos/" + proyectoId + "/avance", porcentaje);
        return porcentaje;
    }

    public Double calcularPorcentajeFuncionalidad(Long funcionalidadId) {
        Double porcentaje = jdbcTemplate.queryForObject(
                "SELECT calcular_porcentaje_funcionalidad(?)",
                new Object[] { funcionalidadId },
                Double.class);
        messagingTemplate.convertAndSend("/topic/funcionalidades/" + funcionalidadId + "/avance", porcentaje);
        return porcentaje;
    }

    public Double calcularPorcentajeFase(Long faseId) {
        Double porcentaje = jdbcTemplate.queryForObject(
                "SELECT calcular_porcentaje_fase(?)",
                new Object[] { faseId },
                Double.class);
        messagingTemplate.convertAndSend("/topic/fases/" + faseId + "/avance", porcentaje);
        return porcentaje;
    }

    public Map<String, Object> getAvanceCompletoProyecto(Long proyectoId) {
        Map<String, Object> avanceCompleto = new HashMap<>();

        // Porcentaje total del proyecto
        Double porcentajeProyecto = calcularPorcentajeAvance(proyectoId);
        avanceCompleto.put("porcentajeProyecto", porcentajeProyecto);

        // Funcionalidades con ID, nombre y porcentaje
        List<Funcionalidad> funcionalidades = funcionalidadRepository.findAll().stream()
                .filter(f -> f.getProyecto().getId().equals(proyectoId))
                .toList();
        List<Map<String, Object>> funcionalidadesConPorcentaje = new ArrayList<>();
        for (Funcionalidad f : funcionalidades) {
            Double porcentaje = calcularPorcentajeFuncionalidad(f.getId());
            Map<String, Object> funcionalidadData = new HashMap<>();
            funcionalidadData.put("id", f.getId());
            funcionalidadData.put("nombre", f.getNombre());
            funcionalidadData.put("porcentaje", porcentaje);
            funcionalidadesConPorcentaje.add(funcionalidadData);
        }
        avanceCompleto.put("funcionalidades", funcionalidadesConPorcentaje);

        // Fases con ID, nombre y porcentaje
        List<VistaProyectoCompleto> proyectoCompleto = getProyectoCompleto(proyectoId);
        Map<Long, Map<String, Object>> fasesConPorcentaje = new HashMap<>();
        for (VistaProyectoCompleto vista : proyectoCompleto) {
            if (!fasesConPorcentaje.containsKey(vista.getFaseId())) {
                Double porcentaje = calcularPorcentajeFase(vista.getFaseId());
                Map<String, Object> faseData = new HashMap<>();
                faseData.put("id", vista.getFaseId());
                faseData.put("nombre", vista.getNombreFase());
                faseData.put("porcentaje", porcentaje);
                fasesConPorcentaje.put(vista.getFaseId(), faseData);
            }
        }
        avanceCompleto.put("fases", new ArrayList<>(fasesConPorcentaje.values()));

        // Enviar actualización por WebSocket (si aplica)
        messagingTemplate.convertAndSend("/topic/proyectos/" + proyectoId + "/avance-completo", avanceCompleto);
        return avanceCompleto;
    }

    public List<VistaProyectoCompleto> getProyectoCompleto(Long proyectoId) {
        return jdbcTemplate.query(
                "SELECT * FROM vista_proyecto_completo WHERE proyecto_id = ?",
                new Object[] { proyectoId },
                (rs, rowNum) -> {
                    VistaProyectoCompleto vista = new VistaProyectoCompleto();
                    vista.setProyectoId(rs.getLong("proyecto_id"));
                    vista.setNombreProyecto(rs.getString("nombre_proyecto"));
                    vista.setDescripcion(rs.getString("descripcion"));
                    vista.setProyectoEstado(rs.getString("proyecto_estado"));
                    vista.setFechaInicio(rs.getTimestamp("fecha_inicio").toInstant());
                    vista.setPorcentajeProyecto(rs.getDouble("porcentaje_proyecto"));
                    vista.setFaseId(rs.getLong("fase_id"));
                    vista.setNombreFase(rs.getString("nombre_fase"));
                    vista.setFaseDescripcion(rs.getString("fase_descripcion"));
                    vista.setOrden(rs.getInt("orden"));
                    vista.setFaseEstado(rs.getString("fase_estado"));
                    vista.setFaseFechaCreacion(rs.getTimestamp("fase_fecha_creacion").toInstant());
                    vista.setPorcentajeFase(rs.getDouble("porcentaje_fase"));
                    return vista;
                });
    }
}