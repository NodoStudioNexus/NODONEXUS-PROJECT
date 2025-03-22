package org.nodonexus.Backend_nodoNexus.domain.model;

import java.time.Instant;

import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;

import jakarta.persistence.*;
import lombok.Data;

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
}
