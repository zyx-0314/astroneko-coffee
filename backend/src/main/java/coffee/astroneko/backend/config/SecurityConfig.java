package coffee.astroneko.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http)
    throws Exception {
    http
      .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity during development
      .authorizeHttpRequests(
        auth ->
          auth
            .requestMatchers("/api/v1/expose/**")
            .permitAll() // Allow public access to /menu and auth endpoints
            .requestMatchers("/api/v1/secure/**")
            .permitAll() // Temporarily allow secure endpoints for testing
            .requestMatchers(
              "/swagger-ui/**",
              "/v3/api-docs/**",
              "/swagger-ui.html"
            )
            .permitAll() // Allow Swagger UI and API docs
            .anyRequest()
            .authenticated() // Require authentication for other endpoints
      )
      .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      ) // Stateless for JWT
      .httpBasic(httpBasic -> httpBasic.disable()) // Disable HTTP Basic auth
      .formLogin(form -> form.disable()); // Disable form login for API-only

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
