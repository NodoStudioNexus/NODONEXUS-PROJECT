package org.nodonexus.Backend_nodoNexus.domain.model.vistas;

import java.time.LocalDateTime;

import org.hibernate.annotations.Immutable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Immutable
@Table(name = "vista_solicitudes_usuario")
public class VistaSolicitudUsuario {

    @Id
    @Column(name = "solicitud_id")
    private Long solicitudId;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "nombre_proyecto")
    private String nombreProyecto;

    private String descripcion;
    private String estado;

    @Column(name = "fecha_solicitud")
    private LocalDateTime fechaSolicitud;

    @Column(name = "cliente_email")
    private String clienteEmail;

    @Column(name = "cliente_nombre")
    private String clienteNombre;

    @Column(name = "cliente_apellido")
    private String clienteApellido;

    @Column(name = "cliente_numero_identidad")
    private String clienteNumeroIdentidad;

}