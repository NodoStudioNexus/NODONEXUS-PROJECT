package org.nodonexus.Backend_nodoNexus.application.users.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.nodonexus.Backend_nodoNexus.application.users.dto.CreateUsersRequest;
import org.nodonexus.Backend_nodoNexus.application.users.dto.UpdateUserManagementRequest;
import org.nodonexus.Backend_nodoNexus.application.users.dto.UserResponse;
import org.nodonexus.Backend_nodoNexus.domain.model.User;
import org.nodonexus.Backend_nodoNexus.domain.ports.UserRepository;
import org.nodonexus.Backend_nodoNexus.infrastructure.notification.EmailNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserManagementService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailNotificationService emailService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public UserManagementService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            EmailNotificationService emailService, SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.messagingTemplate = messagingTemplate;
    }

    public UserResponse crearUsuario(CreateUsersRequest request) {
        // Validar si el email ya existe
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        // Crear el usuario
        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPrimerNombre(request.getPrimerNombre());
        newUser.setPrimerApellido(request.getPrimerApellido());
        newUser.setTipoIdentidad(request.getTipoIdentidad());
        newUser.setNumeroIdentidad(request.getNumeroIdentidad());
        newUser.setTelefono(request.getTelefono());
        newUser.setRole(request.getRole());
        newUser.setActivo(true);
        newUser.setFechaRegistro(Instant.now());
        // Contraseña temporal (usamos el número de identidad como ejemplo)
        String tempPassword = request.getNumeroIdentidad();
        newUser.setPassword(passwordEncoder.encode(tempPassword));
        newUser.setMustChangePassword(true);

        User savedUser = userRepository.save(newUser);

        messagingTemplate.convertAndSend("/topic/users", mapToResponse(savedUser));

        // Enviar notificación por correo
        String mensaje = "Hola " + savedUser.getPrimerNombre() + ",\n\n" +
                "Tu cuenta ha sido creada. Tus credenciales son:\n" +
                "Email: " + savedUser.getEmail() + "\n" +
                "Contraseña: " + tempPassword + "\n" +
                "Por favor, cambia tu contraseña al iniciar sesión.\n\n" +
                "Saludos,\nEquipo Nodo Studio";
        emailService.sendEmail(savedUser.getEmail(), "Cuenta Creada - Nodo Studio", mensaje);

        // (Futuro) Notificación por WhatsApp
        // whatsAppService.sendWhatsAppMessage(savedUser.getTelefono(), "Cuenta creada:
        // " + savedUser.getEmail());

        return mapToResponse(savedUser);
    }

    public List<UserResponse> listarUsuarios() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // **** */

    public UserResponse UpdateUser(Long id, UpdateUserManagementRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));

        // Actualizar solo los campos proporcionados
        if (request.getActivo() != null) {
            user.setActivo(request.getActivo());
        }
        if (request.getPrimerNombre() != null) {
            user.setPrimerNombre(request.getPrimerNombre());
        }
        if (request.getPrimerApellido() != null) {
            user.setPrimerApellido(request.getPrimerApellido());
        }
        if (request.getTelefono() != null) {
            user.setTelefono(request.getTelefono());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        User updatedUser = userRepository.save(user);
        return mapToResponse(updatedUser);
    }

    /** ELIMINAR USUARIO */

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
        user.setActivo(false);
        userRepository.save(user);
    }

    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setPrimerNombre(user.getPrimerNombre());
        response.setPrimerApellido(user.getPrimerApellido());
        response.setTipoIdentidad(user.getTipoIdentidad());
        response.setNumeroIdentidad(user.getNumeroIdentidad());
        response.setTelefono(user.getTelefono());
        response.setRole(user.getRole());
        response.setFechaRegistro(user.getFechaRegistro());
        response.setActivo(user.isActivo());
        return response;
    }
}