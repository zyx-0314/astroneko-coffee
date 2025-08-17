package coffee.astroneko.backend.integration;

import static org.junit.jupiter.api.Assertions.*;

import coffee.astroneko.backend.dto.CreateMenuItemRequest;
import coffee.astroneko.backend.dto.UpdateMenuItemRequest;
import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.repository.MenuItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureWebMvc
class MenuManagementIntegrationTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
    "postgres:16-alpine"
  )
    .withDatabaseName("testdb")
    .withUsername("test")
    .withPassword("test");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @LocalServerPort
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private MenuItemRepository menuItemRepository;

  private String baseUrl;

  @BeforeEach
  void setUp() {
    baseUrl = "http://localhost:" + port;
    menuItemRepository.deleteAll();
  }

  @Test
  @Transactional
  void testFullCrudWorkflow() {
    // 1. Test GET empty menu
    ResponseEntity<MenuItem[]> emptyResponse = restTemplate.getForEntity(
      baseUrl + "/api/v1/expose/menu",
      MenuItem[].class
    );
    assertEquals(HttpStatus.OK, emptyResponse.getStatusCode());
    assertNotNull(emptyResponse.getBody());
    assertEquals(0, emptyResponse.getBody().length);

    // 2. Test CREATE menu item
    CreateMenuItemRequest createRequest = new CreateMenuItemRequest(
      "Espresso",
      "Strong concentrated coffee",
      2.50,
      coffee.astroneko.backend.entity.MenuItem.ItemType.COFFEE,
      "/placeholder/espresso.jpg"
    );
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<CreateMenuItemRequest> createEntity = new HttpEntity<>(
      createRequest,
      headers
    );

    ResponseEntity<MenuItem> createResponse = restTemplate.postForEntity(
      baseUrl + "/api/v1/secure/menu",
      createEntity,
      MenuItem.class
    );
    assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
    assertNotNull(createResponse.getBody());
    assertEquals("Espresso", createResponse.getBody().getName());
    assertEquals(2.50, createResponse.getBody().getPrice());
    Long createdId = createResponse.getBody().getId();

    // 3. Test GET menu with item
    ResponseEntity<MenuItem[]> menuResponse = restTemplate.getForEntity(
      baseUrl + "/api/v1/expose/menu",
      MenuItem[].class
    );
    assertEquals(HttpStatus.OK, menuResponse.getStatusCode());
    assertEquals(1, menuResponse.getBody().length);
    assertEquals("Espresso", menuResponse.getBody()[0].getName());

    // 4. Test GET by ID
    ResponseEntity<MenuItem> getByIdResponse = restTemplate.getForEntity(
      baseUrl + "/api/v1/secure/menu/" + createdId,
      MenuItem.class
    );
    assertEquals(HttpStatus.OK, getByIdResponse.getStatusCode());
    assertEquals("Espresso", getByIdResponse.getBody().getName());

    // 5. Test UPDATE
    UpdateMenuItemRequest updateRequest = new UpdateMenuItemRequest(
      "Double Espresso",
      "Extra strong concentrated coffee",
      3.00,
      coffee.astroneko.backend.entity.MenuItem.ItemType.COFFEE,
      "/placeholder/double-espresso.jpg"
    );
    HttpEntity<UpdateMenuItemRequest> updateEntity = new HttpEntity<>(
      updateRequest,
      headers
    );

    ResponseEntity<MenuItem> updateResponse = restTemplate.exchange(
      baseUrl + "/api/v1/secure/menu/" + createdId,
      HttpMethod.PUT,
      updateEntity,
      MenuItem.class
    );
    assertEquals(HttpStatus.OK, updateResponse.getStatusCode());
    assertEquals("Double Espresso", updateResponse.getBody().getName());
    assertEquals(3.00, updateResponse.getBody().getPrice());

    // 6. Test DELETE
    ResponseEntity<Void> deleteResponse = restTemplate.exchange(
      baseUrl + "/api/v1/secure/menu/" + createdId,
      HttpMethod.DELETE,
      null,
      Void.class
    );
    assertEquals(HttpStatus.NO_CONTENT, deleteResponse.getStatusCode());

    // 7. Verify deletion - GET by ID should return 404
    ResponseEntity<MenuItem> notFoundResponse = restTemplate.getForEntity(
      baseUrl + "/api/v1/secure/menu/" + createdId,
      MenuItem.class
    );
    assertEquals(HttpStatus.NOT_FOUND, notFoundResponse.getStatusCode());

    // 8. Verify menu is empty again
    ResponseEntity<MenuItem[]> finalMenuResponse = restTemplate.getForEntity(
      baseUrl + "/api/v1/expose/menu",
      MenuItem[].class
    );
    assertEquals(HttpStatus.OK, finalMenuResponse.getStatusCode());
    assertEquals(0, finalMenuResponse.getBody().length);
  }

  @Test
  void testValidationErrors() {
    // Test with invalid data (empty name, negative price)
    CreateMenuItemRequest invalidRequest = new CreateMenuItemRequest(
      "",
      "",
      -1.0,
      coffee.astroneko.backend.entity.MenuItem.ItemType.COFFEE,
      ""
    );
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<CreateMenuItemRequest> entity = new HttpEntity<>(
      invalidRequest,
      headers
    );

    ResponseEntity<String> response = restTemplate.postForEntity(
      baseUrl + "/api/v1/secure/menu",
      entity,
      String.class
    );
    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
  }

  @Test
  void testNotFoundScenarios() {
    // Test GET by non-existent ID
    ResponseEntity<MenuItem> getResponse = restTemplate.getForEntity(
      baseUrl + "/api/v1/secure/menu/999",
      MenuItem.class
    );
    assertEquals(HttpStatus.NOT_FOUND, getResponse.getStatusCode());

    // Test UPDATE non-existent item
    UpdateMenuItemRequest updateRequest = new UpdateMenuItemRequest(
      "Test",
      "Test description",
      1.0,
      coffee.astroneko.backend.entity.MenuItem.ItemType.COFFEE,
      "/placeholder/test.jpg"
    );
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<UpdateMenuItemRequest> updateEntity = new HttpEntity<>(
      updateRequest,
      headers
    );

    ResponseEntity<MenuItem> updateResponse = restTemplate.exchange(
      baseUrl + "/api/v1/secure/menu/999",
      HttpMethod.PUT,
      updateEntity,
      MenuItem.class
    );
    assertEquals(HttpStatus.NOT_FOUND, updateResponse.getStatusCode());

    // Test DELETE non-existent item
    ResponseEntity<Void> deleteResponse = restTemplate.exchange(
      baseUrl + "/api/v1/secure/menu/999",
      HttpMethod.DELETE,
      null,
      Void.class
    );
    assertEquals(HttpStatus.NOT_FOUND, deleteResponse.getStatusCode());
  }
}
