package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import org.hibernate.annotations.CreationTimestamp;
import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

@Entity
@Getter
@Data
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  private String password;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoleEnum role;

  private String resetToken;

  private Instant lastResetRequest;

  @Column(nullable = false, length = 50)
  private String primerNombre;

  @Column(length = 50)
  private String segundoNombre;

  @Column(nullable = false, length = 50)
  private String primerApellido;

  @Column(length = 50)
  private String segundoApellido;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private IdentityType tipoIdentidad;

  @Column(nullable = false, length = 20)
  private String numeroIdentidad;

  @Column(length = 20)
  private String telefono;

  @Column(name = "fecha_registro", nullable = false, updatable = false)
  @CreationTimestamp
  private Instant fechaRegistro;

  @Column(name = "ultimo_acceso")
  private Instant ultimoAcceso;

  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
  private boolean activo;

  @Column(name = "profile_image")
  private String profileImage;

  @Column(name = "banner_profile_image")
  private String bannerProfileImage;

}