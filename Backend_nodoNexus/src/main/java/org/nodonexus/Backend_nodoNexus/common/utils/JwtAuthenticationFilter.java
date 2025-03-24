package org.nodonexus.Backend_nodoNexus.common.utils;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;

  public JwtAuthenticationFilter(JwtUtils jwtUtils) {
    this.jwtUtils = jwtUtils;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    System.out.println("Filtering request: " + request.getRequestURI());

    String header = request.getHeader("Authorization");

    // Si no hay token en la cabecera, deja pasar la solicitud sin autenticar
    if (header == null || !header.startsWith("Bearer ")) {
      chain.doFilter(request, response);
      return;
    }

    String token = header.substring(7);
    if (!jwtUtils.validateToken(token)) {
      System.out.println("Se ha detectado un token invalido");
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "el token es invalido o expiró");
      return;
    }

    String email = jwtUtils.getEmailFromToken(token);
    String role = jwtUtils.getRoleFromToken(token);

    // 🔹 Verifica si el token ya contiene "ROLE_" antes de agregarlo
    String rolePrefix = role.startsWith("ROLE_") ? role : "ROLE_" + role;

    User user = new User(email, "", Collections.singleton(new SimpleGrantedAuthority(rolePrefix)));

    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
        user, null, user.getAuthorities());
    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

    SecurityContextHolder.getContext().setAuthentication(auth);

    chain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getRequestURI();
    return path.startsWith("/api/auth/") || path.startsWith("/swagger-ui/") || path.startsWith("/v3/api-docs/");
  }
}
