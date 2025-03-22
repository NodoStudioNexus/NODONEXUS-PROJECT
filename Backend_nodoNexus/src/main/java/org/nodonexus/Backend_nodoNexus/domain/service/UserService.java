package org.nodonexus.Backend_nodoNexus.domain.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.nodonexus.Backend_nodoNexus.common.exception.UserNotFoundException;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.ports.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new UserNotFoundException("Usuario no Encontrado con correo electronico : " + email));
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public boolean hasRecentResetRequest(String email) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
    return user.getLastResetRequest() != null &&
        user.getLastResetRequest().isAfter(Instant.now().minus(1, ChronoUnit.HOURS));
  }
}
