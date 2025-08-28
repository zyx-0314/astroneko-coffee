# Backend Setup & Implementation Guide

**Purpose**: Detailed implementation guidance and code examples for Spring Boot backend
**Owner**: Backend Team  
**Last-updated**: 2025-08-29

> **Note**: This document contains detailed setup instructions and code samples. For architectural decisions and API contracts, see `spring.md`.

## Environment Setup

### Required Tools
- Java 21 LTS
- Maven 3.9+
- Docker & Docker Compose
- PostgreSQL (via Docker)
- Redis (via Docker)

### Port Configuration
- Backend: **8083**
- PostgreSQL: **5435** 
- Redis: **6382**
- Redis Commander: **8082**

## Database Configuration

### Docker Compose Setup
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: astroneko_postgres
    restart: no
    env_file:
      - .env
    ports:
      - "5435:5432"
    volumes:
      - astroneko_postgres:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: astroneko_redis
    restart: no
    ports:
      - "6382:6379"
    volumes:
      - astroneko_redis:/data

volumes:
  astroneko_postgres:
  astroneko_redis:
```

### Environment Variables (.env)
```env
POSTGRES_USER=astro
POSTGRES_PASSWORD=astro123
POSTGRES_DB=astroneko
```

### Application Properties
```properties
# Server Configuration
server.port=8083
spring.profiles.active=dev

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5435/astroneko
spring.datasource.username=astro
spring.datasource.password=astro123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Redis Configuration
spring.data.redis.host=localhost
spring.data.redis.port=6382

# Security Configuration
spring.security.user.name=admin
spring.security.user.password=admin123

# Swagger Configuration
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.enabled=true

# Logging Configuration
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.root=ERROR
server.error.include-stacktrace=always
server.error.include-message=always
```

## Code Examples

### CORS Configuration
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/v1/secure/**")
                        .allowedOrigins("http://localhost:3003")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);

                registry.addMapping("/api/v1/expose/**")
                        .allowedOrigins("http://localhost:3003")
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false);

                registry.addMapping("/swagger-ui/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
```

### Security Configuration
```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/expose/**").permitAll()
                .requestMatchers("/api/v1/secure/**").permitAll() // Temporarily for testing
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.defaultSuccessUrl("/home", true));
        return http.build();
    }
}
```

### Sample Controller Implementation
```java
@Tag(name = "Menu Management", description = "Secure API for managing coffee shop menu items")
@RestController
@RequestMapping("/api/v1/secure/menu")
public class MenuManagementController {

    private final MenuItemService menuItemService;

    @Autowired
    public MenuManagementController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @Operation(summary = "Create new menu item", description = "Creates a new menu item with name and price")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Menu item created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@Valid @RequestBody CreateMenuItemRequest request) {
        MenuItem createdMenuItem = menuItemService.createMenuItem(request);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }
}
```

### DTO Examples
```java
public class CreateMenuItemRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private Double price;

    // Constructors, getters, and setters
}
```

### Service Layer Implementation
```java
@Service
@Transactional
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Autowired
    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem createMenuItem(CreateMenuItemRequest request) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setPrice(request.getPrice());
        return menuItemRepository.save(menuItem);
    }
}
```

## Testing Setup

### Test Dependencies (pom.xml)
```xml
<!-- Testing Dependencies -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <scope>test</scope>
</dependency>
```

### Test Configuration (application-test.properties)
```properties
# Test database configuration
spring.datasource.url=jdbc:h2:mem:testdb;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
spring.security.user.name=test
spring.security.user.password=test
```

## Verification Commands

### Start Database
```bash
docker compose up -d postgres redis
```

### Run Backend
```bash
cd backend
mvn spring-boot:run
```

### Verify Endpoints
- Health check: http://localhost:8083/actuator/health
- Swagger UI: http://localhost:8083/swagger-ui.html
- Menu API: http://localhost:8083/api/v1/expose/menu

### Run Tests
```bash
mvn test -Dtest="*Test"           # Unit tests only
mvn test -Dtest="*IntegrationTest" # Integration tests only
```

---

**Note**: Before running these commands, confirm that the following files exist in your project:
- `backend/pom.xml` with required dependencies
- `compose.yml` in project root
- `.env` file with database credentials
