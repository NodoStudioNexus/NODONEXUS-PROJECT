package org.nodonexus.Backend_nodoNexus.domain.ports;

import java.util.List;
import java.util.Optional;

import org.nodonexus.Backend_nodoNexus.common.constants.RoleEnum;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  List<User> findByRoleIn(List<RoleEnum> roles);

  Optional<User> findById(Long creadorId);

  @SuppressWarnings("unchecked")
  User save(User user);
}
