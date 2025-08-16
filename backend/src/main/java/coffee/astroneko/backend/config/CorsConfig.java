package coffee.astroneko.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(@NonNull CorsRegistry registry) {
        // Apply CORS to specific endpoints
        registry
          .addMapping("/api/v1/secure/**")
          .allowedOrigins("http://localhost:3000") // Allow frontend origin
          .allowedOrigins("http://localhost:3003") // Allow frontend origin
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
          .allowedHeaders("*")
          .allowCredentials(true);

        // Exempt other APIs from CORS
        registry
          .addMapping("/api/v1/expose/**")
          .allowedOrigins("http://localhost:3000") // Allow frontend origin
          .allowedOrigins("http://localhost:3003") // Allow frontend origin
          .allowedMethods("GET", "POST")
          .allowedHeaders("*")
          .allowCredentials(false); // No credentials for admin APIs
      }
    };
  }
}
