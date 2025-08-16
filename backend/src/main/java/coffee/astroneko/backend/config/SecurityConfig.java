package coffee.astroneko.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .disable()) // Disable CSRF for simplicity during development
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/v1/expose/**").permitAll() // Allow public access to /menu
                    .anyRequest().authenticated() // Require authentication for other endpoints
                )
                .formLogin(form -> form.defaultSuccessUrl("/home", true)); // Updated form login configuration

        return http.build();
    }
}