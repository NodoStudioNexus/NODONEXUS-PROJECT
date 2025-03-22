package org.nodonexus.Backend_nodoNexus.application.auth.service;

import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginRequest;
import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginResponse;
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
  private PasswordEncoder passwordEncoder;
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

    String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());
    eventPublisher.publishEvent(new LoginEvent(user.getEmail(), user.getRole().name()));

    LoginResponse response = new LoginResponse();
    response.setToken(token);
    response.setRole(user.getRole());
    return response;
  }

  public void register(String email, String password, String role) {
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

    User user = new User();
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole(roleEnum);
    userService.save(user);
  }

}
