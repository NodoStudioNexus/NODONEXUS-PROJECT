package org.nodonexus.Backend_nodoNexus.interfaces.rest.users;

import java.util.List;

import org.nodonexus.Backend_nodoNexus.application.users.dto.CreateUsersRequest;
import org.nodonexus.Backend_nodoNexus.application.users.dto.UpdateUserManagementRequest;
import org.nodonexus.Backend_nodoNexus.application.users.dto.UserResponse;
import org.nodonexus.Backend_nodoNexus.application.users.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/management")
public class UserManagementController {

	private final UserManagementService userManagementService;

	@Autowired
	public UserManagementController(UserManagementService userManagementService) {
		this.userManagementService = userManagementService;
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public ResponseEntity<UserResponse> crearUsuario(@RequestBody CreateUsersRequest request) {
		UserResponse response = userManagementService.crearUsuario(request);
		return ResponseEntity.ok(response);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<List<UserResponse>> listarUsuarios() {
		List<UserResponse> usuarios = userManagementService.listarUsuarios();
		return ResponseEntity.ok(usuarios);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<UserResponse> actualizarUsuario(@PathVariable Long id,
			@RequestBody UpdateUserManagementRequest request) {
		UserResponse response = userManagementService.UpdateUser(id, request);
		return ResponseEntity.ok(response);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
		userManagementService.deleteUser(id);
		return ResponseEntity.ok("Usuario eliminado satisfactoriamente");
	}

}