package org.nodonexus.Backend_nodoNexus.domain.ports;

import org.nodonexus.Backend_nodoNexus.domain.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}