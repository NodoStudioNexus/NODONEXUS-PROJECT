package org.nodonexus.Backend_nodoNexus.domain.service;

import org.nodonexus.Backend_nodoNexus.domain.model.User;

public interface UserService {
  User findByEmail(String email);

  User save(User user);

  User save(User user, boolean notify);

  boolean hasRecentResetRequest(String email);
}
