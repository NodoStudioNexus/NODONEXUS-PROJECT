package org.nodonexus.Backend_nodoNexus.application.auth.service;

import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginRequest;
import org.nodonexus.Backend_nodoNexus.application.auth.dto.LoginResponse;
import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;
import org.nodonexus.Backend_nodoNexus.common.event.LoginEvent;
import org.nodonexus.Backend_nodoNexus.common.exception.AuthenticationException;
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
    User user = userService.findByEmail(request.getEmail());
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new AuthenticationException("Credenciales Invalidas");
    }

    String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());
    eventPublisher.publishEvent(new LoginEvent(user.getEmail(), user.getRole()));

    LoginResponse response = new LoginResponse();
    response.setToken(token);
    response.setRole(user.getRole());
    return response;
  }

  // Método para registrar usuarios (para pruebas)
  public void register(String email, String password, RoleEnum role) {
    User user = new User();
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole(role);
    userService.save(user);
  }
}
