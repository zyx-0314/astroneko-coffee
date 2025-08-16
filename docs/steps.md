1. **Create Backend**
   - On the website, configure the backend with the following:
     ```
     Project: Maven
     Language: Java
     Spring Boot: 3.5.4
     Group: coffee.astroneko
     Artifact: backend
     Packaging: Jar
     Java: 21

     Dependencies:
        Spring Web
        Spring Security
        Spring Data JPA
        PostgreSQL Driver
        Validation
        Actuator
     ```
   - Use Spring Boot to initialize the project.

2. **Add Swagger**
   - Add the Swagger dependency to `pom.xml`:
     ```xml
     <dependency>
         <groupId>org.springdoc</groupId>
         <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
         <version>2.1.0</version>
     </dependency>
     ```
   - Access Swagger UI at: [http://localhost:8083/swagger-ui.html](http://localhost:8083/swagger-ui.html)

3. **Configure Application Properties**
   - Update `application.properties` with the following:
     ```properties
     server.port=8083
     spring.profiles.active=dev
     springdoc.swagger-ui.path=/swagger-ui.html
     spring.security.user.name=admin
     spring.security.user.password=admin123
     ```

4. **Test the Backend**
   - Run the backend:
     ```bash
     mvn -q spring-boot:run
     ```
   - Verify:
     - Health check: [http://localhost:8083/actuator/health](http://localhost:8083/actuator/health)
     - Swagger UI: [http://localhost:8083/swagger-ui.html](http://localhost:8083/swagger-ui.html)

5. **Install Frontend**
   - Initialize the frontend project:
     ```bash
     npx create-next-app@latest .
     ```
   - Add ShadCN components:
     ```bash
     npx shadcn@latest init
     npx shadcn@latest add
     npm i axios zod
     ```

6. **Connect Frontend to Backend**
   - **Backend**:
     1. **Add CORS Configuration**:
        - Create a `CorsConfig` class in the backend's `config` package.
        - Add the following code to allow cross-origin requests from the frontend:
          ```java
          @Configuration
          public class CorsConfig {
              @Bean
              public WebMvcConfigurer corsConfigurer() {
                  return new WebMvcConfigurer() {
                      @Override
                      public void addCorsMappings(@NonNull CorsRegistry registry) {
                          // Apply CORS to specific endpoints
                          registry.addMapping("/api/v1/secure/**")
                                  .allowedOrigins("http://localhost:3000")  // Allow frontend origin
                                  .allowedMethods("GET", "POST", "PUT", "DELETE")
                                  .allowedHeaders("*")
                                  .allowCredentials(true);

                          // Exempt other APIs from CORS
                          registry.addMapping("/api/v1/expose/**")
                                  .allowedOrigins("*") // Allow all origins for admin APIs
                                  .allowedMethods("GET", "POST")
                                  .allowedHeaders("*")
                                  .allowCredentials(false); // No credentials for admin APIs
                      }
                  };
              }
          }
          ```
        - This ensures the frontend can communicate with the backend during development.

     2. **Add Security Configuration**:
        - Create a `SecurityConfig` class in the backend's `config` package.
        - Add the following code to configure security settings:
          ```java
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
          ```
        - This allows public access to the `/api/v1/expose/menu` endpoint while securing other endpoints.

     3. **Add Sample Menu Controller**:
        - Create a `MenuController` class in the backend's `controller` package.
        - Add the following code to serve static menu data:
          ```java
          // This will be used as descriptor for Swagger
          @Tag(name = "Menu", description = "API for managing coffee shop menu")
          @RestController
          @RequestMapping("/api/v1/expose/menu")
          public class MenuController {
              @GetMapping
              public List<Map<String, String>> getMenu() {
                  return List.of(
                      Map.of("id", "1", "name", "Espresso", "price", "3.00"),
                      Map.of("id", "2", "name", "Latte", "price", "4.50"),
                      Map.of("id", "3", "name", "Cappuccino", "price", "4.00")
                  );
              }
          }
          ```
        - This provides a static list of menu items for testing purposes.

   - **Frontend**:
     1. **Create Environment Variables**:
        - In the frontend directory, create a `.env` file and add the following:
          ```env
          NEXT_PUBLIC_API_URL=http://localhost:8083/api/v1
          NEXT_PUBLIC_API_VERSION=v1
          ```
        - These variables define the backend API URL and version for the frontend.

     2. **Create a Test Page**:
        - Create a `test/connection/page.tsx` file in the `app` directory.
        - Add the following code to test the connection:
          ```tsx
          import { ConnectionCheckerMenu } from "@/components/Menu/ConnectionChecker";

          const Home = () => {
              return (
                  <div>
                      <h1>Welcome to Astroneko Coffee</h1>
                      <ConnectionCheckerMenu />
                  </div>
              );
          };

          export default Home;
          ```
        - This page displays the menu fetched from the backend.

     3. **Create Required Components**:
        - Create a `ConnectionChecker` component in the `components/Menu` directory.
        - Add the following code to fetch and display the menu:
          ```tsx
          "use client";

          import { ConnectionCheckerMenuHook } from "./ConnectionChecker.hook";

          export function ConnectionCheckerMenu() {
              const { menu } = ConnectionCheckerMenuHook();

              return (
                  <div>
                      <h1>Menu</h1>
                      <ul>
                          {menu.length > 0 && menu.map((item) => (
                              <li key={item.id}>
                                  {item.name} - ${item.price}
                              </li>
                          ))}
                      </ul>
                  </div>
              );
          };
          ```

     5. **Create a Schema for TypeScript**:
        - Create a `menuItem.schema.tsx` file in the `schema` directory.
        - Add the following code to define the menu item type:
          ```tsx
          export interface MenuItem {
              id: string;
              name: string;
              price: string;
          }
          ```
        - This ensures type safety when working with menu data.

7. **Test the Frontend**
   - Start the frontend:
     ```bash
     npm run dev
     ```
   - Verify:
     - Navigate to [http://localhost:3000/test/connection](http://localhost:3000/test/connection).
     - Ensure the page displays the menu fetched from the backend.
     - Check that the menu items are listed with their names and prices.
     - Confirm that the API endpoint `/api/v1/expose/menu` is being called successfully.

8. **Setup Docker Database**
   - Create a `compose.yml` file in the project root:
     ```yml
        services:
        postgres:
            image: postgres:16-alpine
            container_name: astroneko_postgres
            restart: no # Only start when explicitly called
            env_file:
            - .env # Environment variables for credentials (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB)
            ports:
            - "5435:5432" # Updated port based on documentation
            volumes:
            - astroneko_postgres:/var/lib/postgresql/data

        volumes:
        astroneko_postgres:
     ```

   - Create a `.env` file in the project root for database credentials:
     ```env
     POSTGRES_USER=astro
     POSTGRES_PASSWORD=astro123
     POSTGRES_DB=astroneko
     ```

   - Start the PostgreSQL database:
     ```bash
     docker compose up -d
     ```

   - Verify the database is running:
     ```bash
     docker ps
     ```

9. **Connect Backend to Database and Create Tables**
   - **Update Application Properties**:
     - Update `backend/src/main/resources/application.properties`:
     ```properties
     server.port=8083
     spring.profiles.active=dev
     management.endpoints.web.exposure.include=health,info

     springdoc.swagger-ui.path=/swagger-ui.html
     spring.security.user.name=admin
     spring.security.user.password=admin123

     spring.datasource.url=jdbc:postgresql://localhost:5435/astroneko
     spring.datasource.username=astro
     spring.datasource.password=astro123
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.format_sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
     ```

   - **Create Entity Class**:
     - Create `MenuItem.java` in `backend/src/main/java/coffee/astroneko/backend/entity/`:
     ```java
     package coffee.astroneko.backend.entity;

     import jakarta.persistence.Entity;
     import jakarta.persistence.GeneratedValue;
     import jakarta.persistence.GenerationType;
     import jakarta.persistence.Id;

     @Entity
     public class MenuItem {

       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;

       private String name;
       private Double price;

       // Getters and Setters
       public Long getId() {
         return id;
       }

       public void setId(Long id) {
         this.id = id;
       }

       public String getName() {
         return name;
       }

       public void setName(String name) {
         this.name = name;
       }

       public Double getPrice() {
         return price;
       }

       public void setPrice(Double price) {
         this.price = price;
       }
     }
     ```

   - **Create Repository Interface**:
     - Create `MenuItemRepository.java` in `backend/src/main/java/coffee/astroneko/backend/repository/`:
     ```java
     package coffee.astroneko.backend.repository;

     import coffee.astroneko.backend.entity.MenuItem;
     import org.springframework.data.jpa.repository.JpaRepository;
     import org.springframework.stereotype.Repository;

     @Repository
     public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {}
     ```

   - **Update Menu Controller**:
     - Update `MenuController.java` to use the database:
     ```java
     @Tag(name = "Menu", description = "API for managing coffee shop menu")
     @RestController
     @RequestMapping("/api/v1/expose/menu")
     public class MenuController {

       private final MenuItemRepository menuItemRepository;

       @Autowired
       public MenuController(MenuItemRepository menuItemRepository) {
         this.menuItemRepository = menuItemRepository;
       }

       @Operation(
         summary = "Get menu items",
         description = "Returns a list of available menu items"
       )
       @GetMapping
       public List<MenuItem> getMenu() {
         return menuItemRepository.findAll();
       }
     }
     ```

   - **Update BackendApplication**:
     - Add necessary annotations to `BackendApplication.java`:
     ```java
     package coffee.astroneko.backend;

     import org.springframework.boot.SpringApplication;
     import org.springframework.boot.autoconfigure.SpringBootApplication;
     import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

     @EnableJpaRepositories(basePackages = "coffee.astroneko.backend.repository")
     @SpringBootApplication(scanBasePackages = "coffee.astroneko.backend")
     public class BackendApplication {

       public static void main(String[] args) {
         SpringApplication.run(BackendApplication.class, args);
       }
     }
     ```

   - **Create JPA Configuration**:
     - Create `JpaConfig.java` in `backend/src/main/java/coffee/astroneko/backend/config/`:
     ```java
     package coffee.astroneko.backend.config;

     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.context.annotation.Bean;
     import org.springframework.context.annotation.Configuration;
     import org.springframework.orm.jpa.JpaTransactionManager;
     import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
     import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
     import org.springframework.transaction.PlatformTransactionManager;

     import javax.sql.DataSource;
     import java.util.Properties;

     @Configuration
     public class JpaConfig {

       @Autowired
       private DataSource dataSource;

       @Bean
       public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
         LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
         factoryBean.setDataSource(dataSource);
         factoryBean.setPackagesToScan("coffee.astroneko.backend.entity");
         factoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
         
         Properties jpaProperties = new Properties();
         jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
         jpaProperties.put("hibernate.hbm2ddl.auto", "update");
         jpaProperties.put("hibernate.show_sql", "true");
         factoryBean.setJpaProperties(jpaProperties);
         
         return factoryBean;
       }

       @Bean
       public PlatformTransactionManager transactionManager() {
         JpaTransactionManager transactionManager = new JpaTransactionManager();
         transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
         return transactionManager;
       }
     }
     ```

   - **Test the Database Connection**:
     - Start the backend:
     ```bash
     cd backend
     mvn spring-boot:run
     ```
     - Verify:
       - Check that the `menu_item` table is created automatically in PostgreSQL.
       - Access the menu endpoint: [http://localhost:8083/api/v1/expose/menu](http://localhost:8083/api/v1/expose/menu)
       - Initially, it will return an empty array `[]` since no data has been inserted yet.
       - Use a database client (like Navicat, pgAdmin, or DBeaver) to connect to the database and verify the table structure.

10. **Preparing CORS, Security, Global Exception and Update Swagger**
    - **Update SpringDoc OpenAPI Version**:
      - Update `pom.xml` to use a compatible version:
      ```xml
      <dependency>
          <groupId>org.springdoc</groupId>
          <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
          <version>2.6.0</version>
      </dependency>
      ```

    - **Enhanced CORS Configuration**:
      - Update `CorsConfig.java` to support multiple frontend ports and Swagger:
      ```java
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
                .allowedOrigins(
                  "http://localhost:3000",
                  "http://localhost:3001",
                  "http://localhost:3003"
                ) // Allow frontend origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

              // Exempt other APIs from CORS
              registry
                .addMapping("/api/v1/expose/**")
                .allowedOrigins(
                  "http://localhost:3000",
                  "http://localhost:3001",
                  "http://localhost:3003"
                ) // Allow frontend origins
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false); // No credentials for admin APIs

              // Allow Swagger UI endpoints
              registry
                .addMapping("/swagger-ui/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*");

              registry
                .addMapping("/v3/api-docs/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*");
            }
          };
        }
      }
      ```

    - **Enhanced Security Configuration**:
      - Update `SecurityConfig.java` to include Swagger endpoints:
      ```java
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
                  .permitAll() // Allow public access to /menu
                  .requestMatchers("/api/v1/secure/**")
                  .permitAll() // Temporarily allow secure endpoints for testing
                  .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html")
                  .permitAll() // Allow Swagger UI and API docs
                  .anyRequest()
                  .authenticated() // Require authentication for other endpoints
            )
            .formLogin(form -> form.defaultSuccessUrl("/home", true)); // Updated form login configuration

          return http.build();
        }
      }
      ```

    - **Create Global Exception Handler** (Note: Temporarily disabled due to compatibility issues):
      - Create `GlobalExceptionHandler.java` in `backend/src/main/java/coffee/astroneko/backend/exception/`:
      ```java
      package coffee.astroneko.backend.exception;

      import java.time.LocalDateTime;
      import java.util.HashMap;
      import java.util.Map;
      import org.springframework.http.HttpStatus;
      import org.springframework.http.ResponseEntity;
      import org.springframework.validation.FieldError;
      import org.springframework.web.bind.MethodArgumentNotValidException;
      import org.springframework.web.bind.annotation.ExceptionHandler;
      // @RestControllerAdvice // Temporarily disabled due to SpringDoc compatibility issues

      public class GlobalExceptionHandler {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, Object>> handleValidationExceptions(
          MethodArgumentNotValidException ex
        ) {
          Map<String, Object> response = new HashMap<>();
          Map<String, String> errors = new HashMap<>();

          ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
          });

          response.put("error", "Validation Failed");
          response.put("message", "Invalid input data");
          response.put("details", errors);
          response.put("timestamp", LocalDateTime.now());

          return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
          Map<String, Object> response = new HashMap<>();
          response.put("error", "Internal Server Error");
          response.put("message", "An unexpected error occurred");
          response.put("timestamp", LocalDateTime.now());

          return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      ```

    - **Create Swagger Configuration**:
      - Create `SwaggerConfig.java` in `backend/src/main/java/coffee/astroneko/backend/config/`:
      ```java
      package coffee.astroneko.backend.config;

      import io.swagger.v3.oas.models.OpenAPI;
      import io.swagger.v3.oas.models.info.Info;
      import org.springframework.context.annotation.Bean;
      import org.springframework.context.annotation.Configuration;

      @Configuration
      public class SwaggerConfig {

        @Bean
        public OpenAPI customOpenAPI() {
          return new OpenAPI()
              .info(new Info()
                  .title("Astroneko Coffee API")
                  .version("1.0.0")
                  .description("API documentation for the Astroneko Coffee management system"));
        }
      }
      ```

    - **Update Application Properties**:
      - Add Swagger and logging configurations to `application.properties`:
      ```properties
      server.port=8083
      spring.profiles.active=dev
      management.endpoints.web.exposure.include=health,info

      springdoc.swagger-ui.path=/swagger-ui.html
      springdoc.api-docs.path=/v3/api-docs
      springdoc.swagger-ui.enabled=true
      logging.level.org.springdoc=DEBUG
      logging.level.org.springframework.security=DEBUG
      logging.level.org.springframework.web=DEBUG
      logging.level.root=ERROR
      server.error.include-stacktrace=always
      server.error.include-message=always
      spring.security.user.name=admin
      spring.security.user.password=admin123

      spring.datasource.url=jdbc:postgresql://localhost:5435/astroneko
      spring.datasource.username=astro
      spring.datasource.password=astro123
      spring.jpa.hibernate.ddl-auto=update
      spring.jpa.show-sql=true
      spring.jpa.properties.hibernate.format_sql=true
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
      ```

    - **Test Swagger Documentation**:
      - Start the backend:
      ```bash
      cd backend
      mvn spring-boot:run
      ```
      - Verify:
        - Swagger UI: [http://localhost:8083/swagger-ui/index.html](http://localhost:8083/swagger-ui/index.html)
        - API Docs JSON: Test using `curl.exe http://localhost:8083/v3/api-docs` (if curl is not working use curl.exe)
        - All endpoints should be properly documented with descriptions and schemas

11. **Add New API - All APIs are Now Exposed**
    - **Create Service Layer**:
      - Create `MenuItemService.java` in `backend/src/main/java/coffee/astroneko/backend/service/`:
      ```java
      package coffee.astroneko.backend.service;

      import coffee.astroneko.backend.dto.CreateMenuItemRequest;
      import coffee.astroneko.backend.dto.UpdateMenuItemRequest;
      import coffee.astroneko.backend.entity.MenuItem;
      import coffee.astroneko.backend.repository.MenuItemRepository;
      import java.util.List;
      import java.util.Optional;
      import org.springframework.beans.factory.annotation.Autowired;
      import org.springframework.stereotype.Service;
      import org.springframework.transaction.annotation.Transactional;

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

        public Optional<MenuItem> getMenuItemById(Long id) {
          return menuItemRepository.findById(id);
        }

        public MenuItem createMenuItem(CreateMenuItemRequest request) {
          MenuItem menuItem = new MenuItem();
          menuItem.setName(request.getName());
          menuItem.setPrice(request.getPrice());
          return menuItemRepository.save(menuItem);
        }

        public Optional<MenuItem> updateMenuItem(Long id, UpdateMenuItemRequest request) {
          return menuItemRepository.findById(id).map(menuItem -> {
            menuItem.setName(request.getName());
            menuItem.setPrice(request.getPrice());
            return menuItemRepository.save(menuItem);
          });
        }

        public boolean deleteMenuItem(Long id) {
          if (menuItemRepository.existsById(id)) {
            menuItemRepository.deleteById(id);
            return true;
          }
          return false;
        }
      }
      ```

    - **Create DTO Classes**:
      - Create `CreateMenuItemRequest.java` in `backend/src/main/java/coffee/astroneko/backend/dto/`:
      ```java
      package coffee.astroneko.backend.dto;

      import jakarta.validation.constraints.DecimalMin;
      import jakarta.validation.constraints.NotBlank;
      import jakarta.validation.constraints.NotNull;
      import jakarta.validation.constraints.Size;

      public class CreateMenuItemRequest {

        @NotBlank(message = "Name is required")
        @Size(
          min = 2,
          max = 100,
          message = "Name must be between 2 and 100 characters"
        )
        private String name;

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.01", message = "Price must be greater than 0")
        private Double price;

        // Constructors
        public CreateMenuItemRequest() {}

        public CreateMenuItemRequest(String name, Double price) {
          this.name = name;
          this.price = price;
        }

        // Getters and Setters
        public String getName() {
          return name;
        }

        public void setName(String name) {
          this.name = name;
        }

        public Double getPrice() {
          return price;
        }

        public void setPrice(Double price) {
          this.price = price;
        }
      }
      ```

      - Create `UpdateMenuItemRequest.java` in `backend/src/main/java/coffee/astroneko/backend/dto/`:
      ```java
      package coffee.astroneko.backend.dto;

      import jakarta.validation.constraints.DecimalMin;
      import jakarta.validation.constraints.NotBlank;
      import jakarta.validation.constraints.NotNull;
      import jakarta.validation.constraints.Size;

      public class UpdateMenuItemRequest {

        @NotBlank(message = "Name is required")
        @Size(
          min = 2,
          max = 100,
          message = "Name must be between 2 and 100 characters"
        )
        private String name;

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.01", message = "Price must be greater than 0")
        private Double price;

        // Constructors
        public UpdateMenuItemRequest() {}

        public UpdateMenuItemRequest(String name, Double price) {
          this.name = name;
          this.price = price;
        }

        // Getters and Setters
        public String getName() {
          return name;
        }

        public void setName(String name) {
          this.name = name;
        }

        public Double getPrice() {
          return price;
        }

        public void setPrice(Double price) {
          this.price = price;
        }
      }
      ```

    - **Create Secure CRUD Controller**:
      - Create `MenuManagementController.java` in `backend/src/main/java/coffee/astroneko/backend/controller/`:
      ```java
      package coffee.astroneko.backend.controller;

      import coffee.astroneko.backend.dto.CreateMenuItemRequest;
      import coffee.astroneko.backend.dto.UpdateMenuItemRequest;
      import coffee.astroneko.backend.entity.MenuItem;
      import coffee.astroneko.backend.service.MenuItemService;
      import io.swagger.v3.oas.annotations.Operation;
      import io.swagger.v3.oas.annotations.responses.ApiResponse;
      import io.swagger.v3.oas.annotations.responses.ApiResponses;
      import io.swagger.v3.oas.annotations.tags.Tag;
      import jakarta.validation.Valid;
      import java.util.Optional;
      import org.springframework.beans.factory.annotation.Autowired;
      import org.springframework.http.HttpStatus;
      import org.springframework.http.ResponseEntity;
      import org.springframework.web.bind.annotation.*;

      @Tag(
        name = "Menu Management",
        description = "Secure API for managing coffee shop menu items"
      )
      @RestController
      @RequestMapping("/api/v1/secure/menu")
      public class MenuManagementController {

        private final MenuItemService menuItemService;

        @Autowired
        public MenuManagementController(MenuItemService menuItemService) {
          this.menuItemService = menuItemService;
        }

        @Operation(
          summary = "Create new menu item",
          description = "Creates a new menu item with name and price"
        )
        @ApiResponses(value = {
          @ApiResponse(responseCode = "201", description = "Menu item created successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid input data"),
          @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @PostMapping
        public ResponseEntity<MenuItem> createMenuItem(
          @Valid @RequestBody CreateMenuItemRequest request
        ) {
          MenuItem createdMenuItem = menuItemService.createMenuItem(request);
          return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
        }

        @Operation(
          summary = "Get menu item by ID",
          description = "Retrieves a specific menu item by ID"
        )
        @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Menu item found"),
          @ApiResponse(responseCode = "404", description = "Menu item not found"),
          @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @GetMapping("/{id}")
        public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
          Optional<MenuItem> menuItem = menuItemService.getMenuItemById(id);
          return menuItem.map(item -> ResponseEntity.ok().body(item))
                        .orElse(ResponseEntity.notFound().build());
        }

        @Operation(
          summary = "Update menu item",
          description = "Updates an existing menu item by ID"
        )
        @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Menu item updated successfully"),
          @ApiResponse(responseCode = "404", description = "Menu item not found"),
          @ApiResponse(responseCode = "400", description = "Invalid input data"),
          @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @PutMapping("/{id}")
        public ResponseEntity<MenuItem> updateMenuItem(
          @PathVariable Long id,
          @Valid @RequestBody UpdateMenuItemRequest request
        ) {
          Optional<MenuItem> updatedMenuItem = menuItemService.updateMenuItem(id, request);
          return updatedMenuItem.map(item -> ResponseEntity.ok().body(item))
                               .orElse(ResponseEntity.notFound().build());
        }

        @Operation(
          summary = "Delete menu item",
          description = "Deletes a menu item by ID"
        )
        @ApiResponses(value = {
          @ApiResponse(responseCode = "204", description = "Menu item deleted successfully"),
          @ApiResponse(responseCode = "404", description = "Menu item not found"),
          @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
          boolean deleted = menuItemService.deleteMenuItem(id);
          return deleted ? ResponseEntity.noContent().build() 
                        : ResponseEntity.notFound().build();
        }
      }
      ```

    - **Update MenuController to use Service**:
      - Update `MenuController.java` to use the service layer:
      ```java
      @Tag(name = "Menu", description = "API for managing coffee shop menu")
      @RestController
      @RequestMapping("/api/v1/expose/menu")
      public class MenuController {

        private final MenuItemService menuItemService;

        @Autowired
        public MenuController(MenuItemService menuItemService) {
          this.menuItemService = menuItemService;
        }

        @Operation(
          summary = "Get menu items",
          description = "Returns a list of available menu items"
        )
        @GetMapping
        public List<MenuItem> getMenu() {
          return menuItemService.getAllMenuItems();
        }
      }
      ```

    - **Test the New APIs**:
      - Start the backend:
      ```bash
      cd backend
      mvn spring-boot:run
      ```
      - Test endpoints using curl.exe or Swagger UI:
        - GET all items: `curl.exe http://localhost:8083/api/v1/expose/menu`
        - GET by ID: `curl.exe http://localhost:8083/api/v1/secure/menu/1`
        - POST create: Use Swagger UI to test creation with JSON body
        - PUT update: Use Swagger UI to test updates with JSON body  
        - DELETE: Use Swagger UI to test deletion

12. **Add Frontend CRUD Interface**
    - **Update Frontend Schema**:
      - Update `schema/menuItem.schema.tsx` to use proper types:
      ```tsx
      export interface MenuItem {
        id: number;
        name: string;
        price: number;
      }

      export interface CreateMenuItemRequest {
        name: string;
        price: number;
      }

      export interface UpdateMenuItemRequest {
        name: string;
        price: number;
      }
      ```

    - **Create Validation Schema**:
      - Create `schema/menuItemValidation.schema.ts`:
      ```tsx
      import { z } from "zod";

      export const createMenuItemSchema = z.object({
        name: z.string()
          .min(2, "Name must be at least 2 characters")
          .max(100, "Name must be less than 100 characters"),
        price: z.number()
          .min(0.01, "Price must be greater than 0")
          .max(999.99, "Price must be less than $1000")
      });

      export const updateMenuItemSchema = z.object({
        name: z.string()
          .min(2, "Name must be at least 2 characters")
          .max(100, "Name must be less than 100 characters"),
        price: z.number()
          .min(0.01, "Price must be greater than 0")
          .max(999.99, "Price must be less than $1000")
      });

      export type CreateMenuItemForm = z.infer<typeof createMenuItemSchema>;
      export type UpdateMenuItemForm = z.infer<typeof updateMenuItemSchema>;
      ```

    - **Create CRUD Page**:
      - Create `app/test/crud-expose/page.tsx`:
      ```tsx
      import { MenuCrudTable } from "./menuCrudTable";

      export default function CrudExposePage() {
        return (
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
            <p className="text-gray-600 mb-8">
              Manage your coffee shop menu items with full CRUD operations.
            </p>
            <MenuCrudTable />
          </div>
        );
      }
      ```

    - **Create CRUD Components**:
      - Create the main table component and hook following the NextJS documentation patterns
      - Include create, read, update, and delete functionality
      - Add proper form validation using Zod schemas
      - Implement error handling and loading states
      - Use shadcn/ui components for consistent styling

    - **Test the Frontend CRUD**:
      - Start both backend and frontend:
      ```bash
      # Terminal 1 - Backend
      cd backend
      mvn spring-boot:run

      # Terminal 2 - Frontend  
      cd frontend
      npm run dev
      ```
      - Navigate to: [http://localhost:3001/test/crud-expose](http://localhost:3001/test/crud-expose) (port may vary)
      - Test all CRUD operations:
        - View existing menu items in table format
        - Create new menu items using the form
        - Edit existing items inline or via modal
        - Delete items with confirmation
        - Verify form validation works correctly
        - Confirm API communication is working properly

13. **Implement Automated Testing Framework**
    - **Add Testing Dependencies to Backend**:
      - Update `pom.xml` to include testing libraries:
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

    - **Create Backend Test Structure**:
      - Create comprehensive test suite covering all layers:
        - `MenuItemTest.java`: Entity unit tests
        - `MenuItemServiceTest.java`: Service layer tests with mocks
        - `MenuItemRepositoryTest.java`: JPA repository tests
        - `MenuControllerTest.java`: Public API controller tests
        - `MenuManagementControllerTest.java`: Secure API controller tests
        - `SimpleIntegrationTest.java`: Database integration tests

    - **Configure Test Environment**:
      - Update `application-test.properties`:
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

    - **Add Frontend Testing Setup**:
      - Update `package.json` with testing dependencies and scripts:
      ```json
      {
        "scripts": {
          "test": "jest",
          "test:watch": "jest --watch", 
          "test:ci": "jest --ci --coverage --watchAll=false"
        },
        "devDependencies": {
          "@testing-library/jest-dom": "^6.6.3",
          "@testing-library/react": "^16.1.0",
          "@testing-library/user-event": "^14.5.2",
          "@types/jest": "^29.5.14",
          "jest": "^29.7.0",
          "jest-environment-jsdom": "^29.7.0"
        }
      }
      ```

      - Create `jest.config.js` and `jest.setup.js` for test configuration
      - Create component tests for critical UI components

    - **Set Up CI/CD Pipeline**:
      - Create `.github/workflows/ci-cd.yml` with comprehensive testing pipeline:
        - Backend tests with PostgreSQL service
        - Frontend tests with Node.js setup
        - Integration tests with Docker Compose
        - Test coverage reporting
        - Automated deployment on successful tests

    - **Create Test Runner Scripts**:
      - `scripts/run-tests.bat` for Windows
      - `scripts/run-tests.sh` for Unix/Linux/macOS
      - Automated test execution with colored output and summary reports

    - **Run and Verify Tests**:
      - Test backend unit tests:
      ```bash
      cd backend
      mvn test -Dtest="MenuItemTest,MenuItemServiceTest"
      ```
      - Expected: All 12 unit tests should pass ✅
      - Install frontend dependencies and run tests:
      ```bash
      cd frontend
      npm install
      npm test
      ```
      - Verify CI/CD pipeline triggers on code changes
      - Check test coverage reports and ensure quality thresholds are met

    - **Documentation**:
      - Comprehensive testing guide created in `docs/TESTING.md`
      - Includes test structure, running instructions, CI/CD setup, and best practices
      - Debugging guides for common test failures
      - Integration with development workflow recommendations

14. **Docker Containerization**

    **Objective**: Containerize the complete Astroneko Coffee application stack for production deployment and environment consistency.

    - **Create Docker Configuration Files**:

      - **Backend Dockerfile** (`backend/Dockerfile`):
        ```dockerfile
        # Multi-stage build for Spring Boot application
        FROM eclipse-temurin:21-jdk-alpine AS builder
        WORKDIR /app
        COPY mvnw .
        COPY .mvn .mvn
        COPY pom.xml .
        RUN chmod +x ./mvnw
        RUN ./mvnw dependency:go-offline -B
        COPY src src
        RUN ./mvnw clean package -DskipTests

        FROM eclipse-temurin:21-jre-alpine AS runtime  
        RUN apk add --no-cache curl
        RUN addgroup -g 1001 -S spring && \
            adduser -u 1001 -S spring -G spring
        WORKDIR /app
        COPY --from=builder /app/target/*.jar app.jar
        RUN chown -R spring:spring /app
        USER spring
        EXPOSE 8080
        ENTRYPOINT ["java", "-jar", "/app/app.jar"]
        ```

      - **Frontend Dockerfile** (`frontend/Dockerfile`):
        ```dockerfile
        # Multi-stage build for Next.js application
        FROM node:18-alpine AS base

        FROM base AS deps
        RUN apk add --no-cache libc6-compat
        WORKDIR /app
        COPY package.json package-lock.json* ./
        RUN npm ci

        FROM base AS builder
        WORKDIR /app
        COPY --from=deps /app/node_modules ./node_modules
        COPY . .
        RUN npm run build -- --no-lint

        FROM base AS runner
        WORKDIR /app
        RUN addgroup --system --gid 1001 nodejs
        RUN adduser --system --uid 1001 nextjs
        COPY --from=builder /app/public ./public
        RUN mkdir .next
        RUN chown nextjs:nodejs .next
        COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
        COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
        USER nextjs
        EXPOSE 3000
        ENV PORT 3000
        ENV HOSTNAME "0.0.0.0"
        CMD ["node", "server.js"]
        ```

      - **Docker Compose Configuration** (`compose.yml`):
        ```yaml
        services:
          postgres:
            image: postgres:16-alpine
            container_name: astroneko_postgres
            restart: unless-stopped
            environment:
              POSTGRES_DB: astroneko
              POSTGRES_USER: astro
              POSTGRES_PASSWORD: astro123
            ports:
              - "5435:5432"
            volumes:
              - astroneko_postgres:/var/lib/postgresql/data
            healthcheck:
              test: ["CMD-SHELL", "pg_isready -U astro -d astroneko"]
              interval: 30s
              timeout: 10s
              retries: 3
              start_period: 30s
            networks:
              - astroneko_network

          backend:
            build:
              context: ./backend
              dockerfile: Dockerfile
            container_name: astroneko_backend
            restart: unless-stopped
            environment:
              SPRING_PROFILES_ACTIVE: prod
              SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/astroneko
              SPRING_DATASOURCE_USERNAME: astro
              SPRING_DATASOURCE_PASSWORD: astro123
              SERVER_PORT: 8080
            ports:
              - "8083:8080"
            depends_on:
              postgres:
                condition: service_healthy
            healthcheck:
              test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
              interval: 30s
              timeout: 10s
              retries: 3
              start_period: 60s
            networks:
              - astroneko_network

          frontend:
            build:
              context: ./frontend
              dockerfile: Dockerfile
            container_name: astroneko_frontend
            restart: unless-stopped
            environment:
              NODE_ENV: production
              NEXT_PUBLIC_API_URL: http://localhost:8083
            ports:
              - "3003:3000"
            depends_on:
              backend:
                condition: service_healthy
            healthcheck:
              test: [
                "CMD",
                "wget",
                "--no-verbose",
                "--tries=1",
                "--spider",
                "http://localhost:3000/",
              ]
              interval: 30s
              timeout: 10s
              retries: 3
              start_period: 30s
            networks:
              - astroneko_network

        volumes:
          astroneko_postgres:

        networks:
          astroneko_network:
            driver: bridge
        ```

    - **Create Frontend Homepage**:
      - **Homepage Component** (`frontend/app/page.tsx`):
        ```tsx
        import React from 'react';

        export default function HomePage() {
          return (
            <main className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  ☕ Astroneko Coffee
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Welcome to our cosmic coffee experience!
                </p>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">☕ Menu</h2>
                    <p className="text-gray-600">Explore our stellar coffee selection</p>
                    <a 
                      href="/menu" 
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View Menu
                    </a>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🚀 About</h2>
                    <p className="text-gray-600">Discover our cosmic mission</p>
                    <a 
                      href="/test/crud-expose" 
                      className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Learn More
                    </a>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">📡 API</h2>
                    <p className="text-gray-600">Explore our backend services</p>
                    <a 
                      href="http://localhost:8083/swagger-ui.html" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      API Docs
                    </a>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">🐾 System Status</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔧</div>
                      <div className="text-sm text-gray-600">Backend API</div>
                      <div className="text-green-600 font-semibold">✅ Running</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🌐</div>
                      <div className="text-sm text-gray-600">Frontend</div>
                      <div className="text-green-600 font-semibold">✅ Running</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🗄️</div>
                      <div className="text-sm text-gray-600">Database</div>
                      <div className="text-green-600 font-semibold">✅ Connected</div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          );
        }
        ```

    - **Create Deployment Scripts**:

      - **Windows Deployment Script** (`scripts/deploy-docker.bat`):
        ```batch
        @echo off
        echo 🚀 Starting Astroneko Coffee Docker Deployment...
        echo.

        echo 📦 Building and starting containers...
        docker compose up --build -d

        echo.
        echo 🔍 Checking container status...
        docker compose ps

        echo.
        echo 📊 Container logs (last 10 lines each):
        echo.
        echo === Backend Logs ===
        docker compose logs backend --tail 10
        echo.
        echo === Frontend Logs ===  
        docker compose logs frontend --tail 10
        echo.
        echo === Database Logs ===
        docker compose logs postgres --tail 10

        echo.
        echo ✅ Deployment complete!
        echo.
        echo 🌐 Access Points:
        echo   - Frontend:  http://localhost:3003
        echo   - Backend:   http://localhost:8083/swagger-ui.html
        echo   - Database:  localhost:5435 (astro/astro123)
        echo.
        echo 📝 Useful commands:
        echo   - Stop:     docker compose down
        echo   - Logs:     docker compose logs [service]
        echo   - Restart:  docker compose restart [service]
        pause
        ```

      - **Unix/Linux/macOS Deployment Script** (`scripts/deploy-docker.sh`):
        ```bash
        #!/bin/bash
        set -e

        echo "🚀 Starting Astroneko Coffee Docker Deployment..."
        echo

        echo "📦 Building and starting containers..."
        docker compose up --build -d

        echo
        echo "🔍 Checking container status..."
        docker compose ps

        echo
        echo "📊 Container logs (last 10 lines each):"
        echo
        echo "=== Backend Logs ==="
        docker compose logs backend --tail 10
        echo
        echo "=== Frontend Logs ==="
        docker compose logs frontend --tail 10
        echo
        echo "=== Database Logs ==="
        docker compose logs postgres --tail 10

        echo
        echo "✅ Deployment complete!"
        echo
        echo "🌐 Access Points:"
        echo "  - Frontend:  http://localhost:3003"
        echo "  - Backend:   http://localhost:8083/swagger-ui.html"  
        echo "  - Database:  localhost:5435 (astro/astro123)"
        echo
        echo "📝 Useful commands:"
        echo "  - Stop:     docker compose down"
        echo "  - Logs:     docker compose logs [service]"
        echo "  - Restart:  docker compose restart [service]"
        ```

    - **Build and Deploy Docker Stack**:
      ```bash
      # Build and start all services
      docker compose up --build -d

      # Check container status
      docker compose ps

      # View logs for troubleshooting
      docker compose logs backend
      docker compose logs frontend
      docker compose logs postgres
      ```

    - **Service Configuration**:
      - **Database**: PostgreSQL 16 with persistent volumes on port 5435
      - **Backend**: Spring Boot API with health checks on port 8083  
      - **Frontend**: Next.js application with homepage on port 3003
      - **Networking**: Custom Docker network for inter-service communication
      - **Health Checks**: Automated monitoring for all services
      - **Security**: Non-root users in containers, proper secret management

    - **Verify Deployment**:
      - **Frontend Homepage**: http://localhost:3003 ✅
      - **Backend Swagger UI**: http://localhost:8083/swagger-ui.html ✅ 
      - **Database Connection**: PostgreSQL ready for connections ✅
      - **Service Health**: All containers healthy and communicating ✅

    - **Troubleshooting Common Issues**:
      - **Frontend 404 Error**: Ensure `page.tsx` exists in `app/` directory
      - **Backend Connection Failed**: Check database health and environment variables
      - **Port Conflicts**: Verify ports 3003, 8083, and 5435 are available
      - **Build Failures**: Clear Docker cache with `docker system prune`

    - **Production Considerations**:
      - Multi-stage builds for optimized image sizes
      - Health checks for container orchestration
      - Persistent volumes for data retention
      - Environment-specific configurations
      - Container resource limits and monitoring
      - Automated deployment with CI/CD integration

