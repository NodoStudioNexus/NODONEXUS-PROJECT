package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;
import jakarta.persistence.*;
import lombok.Data;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

@Entity
@Data
@Table(name = "users")
public class User {
  @Id
  private String email;

  private String password;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoleEnum role;

  private String resetToken;

  private Instant lastResetRequest;

  @Column(nullable = false, length = 100)
  private String nombre;

  @Column(nullable = false, length = 100)
  private String apellido;

  @Column(length = 20)
  private String telefono;

  @Column(name = "fecha_registro", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  private Instant fechaRegistro;

  @Column(name = "ultimo_acceso")
  private Instant ultimoAcceso;

  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
  private boolean activo;

  @Column(name = "profile_image")
  private String profileImage;
}