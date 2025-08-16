package coffee.astroneko.backend.integration;

import static org.junit.jupiter.api.Assertions.*;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.repository.MenuItemRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
class SimpleIntegrationTest {

  @Container
  @SuppressWarnings("resource")
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

  @Autowired
  private MenuItemRepository menuItemRepository;

  @BeforeEach
  void setUp() {
    menuItemRepository.deleteAll();
  }

  @Test
  @Transactional
  void testDatabaseConnection() {
    assertTrue(postgres.isRunning());
    assertTrue(postgres.isCreated());
  }

  @Test
  @Transactional
  void testRepositoryOperations() {
    // Create
    MenuItem menuItem = new MenuItem();
    menuItem.setName("Test Espresso");
    menuItem.setPrice(2.50);

    MenuItem saved = menuItemRepository.save(menuItem);
    assertNotNull(saved.getId());
    assertEquals("Test Espresso", saved.getName());
    assertEquals(2.50, saved.getPrice());

    // Read
    List<MenuItem> all = menuItemRepository.findAll();
    assertEquals(1, all.size());

    // Update
    saved.setPrice(3.00);
    MenuItem updated = menuItemRepository.save(saved);
    assertEquals(3.00, updated.getPrice());

    // Delete
    menuItemRepository.delete(saved);
    List<MenuItem> empty = menuItemRepository.findAll();
    assertEquals(0, empty.size());
  }
}
