package org.nodonexus.Backend_nodoNexus.config;

import org.nodonexus.Backend_nodoNexus.common.utils.JwtAuthenticationFilter;
import org.nodonexus.Backend_nodoNexus.common.utils.JwtEntryPoint;
import org.nodonexus.Backend_nodoNexus.common.utils.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  private final JwtUtils jwtUtils;
  private final JwtEntryPoint jwtEntryPoint;

  public SecurityConfig(JwtUtils jwtUtils, JwtEntryPoint jwtEntryPoint) {
    this.jwtUtils = jwtUtils;
    this.jwtEntryPoint = jwtEntryPoint;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS habilitado
        .csrf(csrf -> csrf.disable()) // Desactiva CSRF
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sin estado
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll() // Tus endpoints públicos
            .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll() // Swagger público
            .anyRequest().authenticated()) // Todo lo demás requiere autenticación
        .exceptionHandling(exc -> exc.authenticationEntryPoint(jwtEntryPoint))
        .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class) // JWT
        .httpBasic(httpBasic -> httpBasic.disable()) // Desactiva autenticación básica
        .formLogin(formLogin -> formLogin.disable()); // Desactiva formulario de login

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173")); // puerto del fromd
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}