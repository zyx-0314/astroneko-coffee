package coffee.astroneko.backend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  @Value("${app.jwt.secret:mySecretKey}")
  private String jwtSecret;

  @Value("${app.jwt.expiration:86400000}") // 24 hours
  private int jwtExpirationMs;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes());
  }

  public String generateJwtToken(String email, String role, Long userId) {
    return Jwts.builder()
      .subject(email)
      .claim("role", role)
      .claim("userId", userId)
      .issuedAt(new Date())
      .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
      .signWith(getSigningKey())
      .compact();
  }

  public String getEmailFromJwtToken(String token) {
    return Jwts.parser()
      .verifyWith(getSigningKey())
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .getSubject();
  }

  public String getRoleFromJwtToken(String token) {
    return Jwts.parser()
      .verifyWith(getSigningKey())
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .get("role", String.class);
  }

  public Long getUserIdFromJwtToken(String token) {
    return Jwts.parser()
      .verifyWith(getSigningKey())
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .get("userId", Long.class);
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(authToken);
      return true;
    } catch (MalformedJwtException e) {
      System.err.println("Invalid JWT token: " + e.getMessage());
    } catch (ExpiredJwtException e) {
      System.err.println("JWT token is expired: " + e.getMessage());
    } catch (UnsupportedJwtException e) {
      System.err.println("JWT token is unsupported: " + e.getMessage());
    } catch (IllegalArgumentException e) {
      System.err.println("JWT claims string is empty: " + e.getMessage());
    }
    return false;
  }
}
