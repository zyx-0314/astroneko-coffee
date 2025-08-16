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