package org.nodonexus.Backend_nodoNexus.application.cotizacion.service;

import java.time.Instant;

import org.nodonexus.Backend_nodoNexus.application.cotizacion.dto.CotizacionResponse;
import org.nodonexus.Backend_nodoNexus.application.cotizacion.dto.CrearCotizacionRequest;
import org.nodonexus.Backend_nodoNexus.domain.model.Cotizacion;
import org.nodonexus.Backend_nodoNexus.domain.model.SolicitudProyecto;
import org.nodonexus.Backend_nodoNexus.domain.ports.CotizacionRepository;
import org.nodonexus.Backend_nodoNexus.domain.ports.SolicitudProyectoRepository;
import org.nodonexus.Backend_nodoNexus.infrastructure.notification.EmailNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CotizacionService {

	private final CotizacionRepository cotizacionRepository;
	private final SolicitudProyectoRepository solicitudRepository;
	private final EmailNotificationService emailService;

	@Autowired
	public CotizacionService(CotizacionRepository cotizacionRepository,
			SolicitudProyectoRepository solicitudRepository,
			EmailNotificationService emailService) {
		this.cotizacionRepository = cotizacionRepository;
		this.solicitudRepository = solicitudRepository;
		this.emailService = emailService;
	}

	public Cotizacion crearCotizacion(CrearCotizacionRequest request) {
		if (request.getSolicitudId() == null) {
			throw new IllegalArgumentException("El ID de la solicitud no puede ser null");
		}

		SolicitudProyecto solicitud = solicitudRepository.findById(request.getSolicitudId())
				.orElseThrow(() -> new IllegalArgumentException("Solicitud no encontrada con ID: " + request.getSolicitudId()));

		Cotizacion cotizacion = new Cotizacion();
		cotizacion.setSolicitud(solicitud);
		cotizacion.setCostoTotal(request.getCostoTotal());
		cotizacion.setDesgloseCostos(request.getDesgloseCostos());
		cotizacion.setTiemposEstimados(request.getTiemposEstimados());
		cotizacion.setAlcance(request.getAlcance());
		cotizacion.setFechaGeneracion(Instant.now());
		cotizacion.setExpiracion(request.getExpiracion());
		cotizacion.setArchivoUrl(request.getArchivoUrl());

		Cotizacion savedCotizacion = cotizacionRepository.save(cotizacion);

		String email = solicitud.getUsuario().getEmail();
		String numeroIdentidad = solicitud.getUsuario().getNumeroIdentidad();
		String mensaje = "Hola " + solicitud.getUsuario().getPrimerNombre() + ",\n\n" +
				"Tu cotización para la solicitud '" + solicitud.getNombreProyecto() + "' ha sido creada.\n" +
				"Puedes ingresar al sistema con las siguientes credenciales:\n" +
				"Email: " + email + "\n" +
				"Contraseña: " + numeroIdentidad + "\n" +
				"Por favor, cambia tu contraseña después de iniciar sesión.\n\n" +
				"Para acceder, haz clic aquí: http://localhost:5173/login\n\n" +
				"Saludos,\nEquipo Nodo Studio";
		emailService.sendEmail(email, "Cotización Creada - Nodo Studio", mensaje);

		return savedCotizacion;
	}

	public CotizacionResponse obtenerCotizacion(Long id) {
		Cotizacion cotizacion = cotizacionRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Cotización no encontrada con ID: " + id));

		CotizacionResponse response = new CotizacionResponse();
		response.setId(cotizacion.getId());
		response.setSolicitudId(cotizacion.getSolicitud().getId());
		response.setCostoTotal(cotizacion.getCostoTotal());
		response.setDesgloseCostos(cotizacion.getDesgloseCostos());
		response.setTiemposEstimados(cotizacion.getTiemposEstimados());
		response.setAlcance(cotizacion.getAlcance());
		response.setFechaGeneracion(cotizacion.getFechaGeneracion());
		response.setExpiracion(cotizacion.getExpiracion());
		response.setArchivoUrl(cotizacion.getArchivoUrl());

		return response;
	}

	public void actualizarEstadoCotizacion(Long id, String nuevoEstado) {
		Cotizacion cotizacion = cotizacionRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Cotización no encontrada con ID: " + id));

		cotizacion.setEstado(nuevoEstado);
		cotizacionRepository.save(cotizacion);

		String email = cotizacion.getSolicitud().getUsuario().getEmail();
		String mensaje = "Hola " + cotizacion.getSolicitud().getUsuario().getPrimerNombre() + ",\n\n" +
				"El estado de tu cotización para la solicitud '" + cotizacion.getSolicitud().getNombreProyecto()
				+ "' ha sido actualizado a " + nuevoEstado + ".\n\n" +
				"Saludos,\nEquipo Nodo Studio";
		emailService.sendEmail(email, "Actualización de Estado de Cotización - Nodo Studio", mensaje);
	}

}