package org.nodonexus.Backend_nodoNexus.application.auth.service;

import java.time.Instant;

import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginRequest;
import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginResponse;
import org.nodonexus.Backend_nodoNexus.common.constants.IdentityType;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;
import org.nodonexus.Backend_nodoNexus.common.event.LoginEvent;
import org.nodonexus.Backend_nodoNexus.common.exception.EmailAlreadyExistsException;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidEmailException;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidPasswordException;
import org.nodonexus.Backend_nodoNexus.common.exception.InvalidRoleException;
import org.nodonexus.Backend_nodoNexus.common.exception.UserNotFoundException;
import org.nodonexus.Backend_nodoNexus.common.utils.JwtUtils;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.service.UserService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserService userService;
  private final JwtUtils jwtUtils;
  private final PasswordEncoder passwordEncoder;
  private final ApplicationEventPublisher eventPublisher;

  public AuthService(UserService userService, JwtUtils jwtUtils, PasswordEncoder passwordEncoder,
      ApplicationEventPublisher eventPublisher) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
    this.passwordEncoder = passwordEncoder;
    this.eventPublisher = eventPublisher;
  }

  public LoginResponse login(LoginRequest request) {
    User user = null;
    try {
      user = userService.findByEmail(request.getEmail());
    } catch (Exception e) {
      throw new InvalidEmailException("El correo no está registrado");
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new InvalidPasswordException("La contraseña es incorrecta");
    }

    user.setUltimoAcceso(Instant.now());
    userService.save(user);

    String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());
    eventPublisher.publishEvent(new LoginEvent(user.getEmail(), user.getRole().name()));

    LoginResponse response = new LoginResponse();
    response.setToken(token);
    response.setRole(user.getRole());
    response.setPrimerNombre(user.getPrimerNombre());
    response.setSegundoNombre(user.getSegundoNombre());
    response.setPrimerApellido(user.getPrimerApellido());
    response.setSegundoApellido(user.getSegundoApellido());
    response.setTipoIdentidad(user.getTipoIdentidad());
    response.setNumeroIdentidad(user.getNumeroIdentidad());
    response.setTelefono(user.getTelefono());
    response.setFechaRegistro(user.getFechaRegistro());
    response.setUltimoAcceso(user.getUltimoAcceso());
    response.setActivo(user.isActivo());
    response.setProfileImage(user.getProfileImage());
    response.setBannerProfileImage(user.getBannerProfileImage());
    response.setInitial(user.getProfileImage() == null || user.getProfileImage().isEmpty()
        ? user.getPrimerNombre().substring(0, 1).toUpperCase()
        : null);
    return response;
  }

  public void register(String email, String password, String role, String primerNombre,
      String primerApellido, String tipoIdentidad, String numeroIdentidad) {
    // Validar si el correo ya existe
    try {
      userService.findByEmail(email);
      throw new EmailAlreadyExistsException("Lo sentimos, el correo ya existe");
    } catch (UserNotFoundException e) {
      // El correo no existe, continuamos
    }

    // Validar el rol
    RoleEnum roleEnum;
    try {
      roleEnum = RoleEnum.valueOf(role.toUpperCase());
    } catch (IllegalArgumentException e) {
      throw new InvalidRoleException("El rol no existe");
    }

    // Validar campos obligatorios
    if (primerNombre == null || primerNombre.isEmpty()) {
      throw new IllegalArgumentException("El primer nombre es obligatorio");
    }
    if (primerApellido == null || primerApellido.isEmpty()) {
      throw new IllegalArgumentException("El primer apellido es obligatorio");
    }
    if (tipoIdentidad == null || tipoIdentidad.isEmpty()) {
      throw new IllegalArgumentException("El tipo de identidad es obligatorio");
    }
    if (numeroIdentidad == null || numeroIdentidad.isEmpty()) {
      throw new IllegalArgumentException("El número de identidad es obligatorio");
    }

    User user = new User();
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole(roleEnum);
    user.setPrimerNombre(primerNombre);
    user.setPrimerApellido(primerApellido);
    try {
      user.setTipoIdentidad(Enum.valueOf(IdentityType.class, tipoIdentidad.toUpperCase()));
    } catch (IllegalArgumentException e) {
      throw new IllegalArgumentException("Tipo de identidad inválido");
    }
    user.setNumeroIdentidad(numeroIdentidad);
    user.setActivo(true);
    user.setFechaRegistro(Instant.now());

    userService.save(user);
  }
}