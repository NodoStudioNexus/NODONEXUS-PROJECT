package org.nodonexus.Backend_nodoNexus.common.utils;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.nodonexus.Backend_nodoNexus.common.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import io.jsonwebtoken.security.Keys;
import lombok.Data;

@Component
@Data
public class JwtUtils {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration}")
  private Long expiration;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(secret.getBytes());
  }

  public static String generateSecureKey() {
    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    return new String(Base64.getEncoder().encode(key.getEncoded()));
  }

  public String generateToken(Long userId, String email, String role) {
    return Jwts.builder()
        .setSubject(email)
        .claim("id", userId)
        .claim("role", "ROLE_" + role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
        .serializeToJsonWith(new JacksonSerializer<>())
        .compact();
  }

  public String getEmailFromToken(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  public String getRoleFromToken(String token) {
    String roleWithPrefix = Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .get("role", String.class);
    return roleWithPrefix.replace("ROLE_", "");
  }

  public String getIdFromToken(String token) {
    Integer id = Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .get("id", Integer.class);
    return id.toString();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public String generateResetToken(String email) {
    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 3600000))
        .signWith(getSigningKey(), SignatureAlgorithm.HS512) // Corregido a HS512 para consistencia
        .compact();
  }

  public String getEmailFromResetToken(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(token)
          .getBody()
          .getSubject();
    } catch (Exception e) {
      throw new InvalidTokenException("Token inválido o expirado.");
    }
  }
}