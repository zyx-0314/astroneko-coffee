package coffee.astroneko.backend.repository;

import static org.junit.jupiter.api.Assertions.*;

import coffee.astroneko.backend.entity.MenuItem;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;

@DataJpaTest
@TestPropertySource(
  properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.jpa.hibernate.ddl-auto=create-drop",
  }
)
class MenuItemRepositoryTest {

  @Autowired
  private TestEntityManager entityManager;

  @Autowired
  private MenuItemRepository menuItemRepository;

  private MenuItem menuItem1;
  private MenuItem menuItem2;

  @BeforeEach
  void setUp() {
    menuItem1 = new MenuItem();
    menuItem1.setName("Espresso");
    menuItem1.setPrice(2.50);

    menuItem2 = new MenuItem();
    menuItem2.setName("Cappuccino");
    menuItem2.setPrice(3.75);
  }

  @Test
  void testSaveMenuItem() {
    // When
    MenuItem savedMenuItem = menuItemRepository.save(menuItem1);

    // Then
    assertNotNull(savedMenuItem.getId());
    assertEquals("Espresso", savedMenuItem.getName());
    assertEquals(2.50, savedMenuItem.getPrice());
  }

  @Test
  void testFindById() {
    // Given
    MenuItem savedMenuItem = entityManager.persistAndFlush(menuItem1);

    // When
    Optional<MenuItem> foundMenuItem = menuItemRepository.findById(
      savedMenuItem.getId()
    );

    // Then
    assertTrue(foundMenuItem.isPresent());
    assertEquals("Espresso", foundMenuItem.get().getName());
    assertEquals(2.50, foundMenuItem.get().getPrice());
  }

  @Test
  void testFindAll() {
    // Given
    entityManager.persistAndFlush(menuItem1);
    entityManager.persistAndFlush(menuItem2);

    // When
    List<MenuItem> allMenuItems = menuItemRepository.findAll();

    // Then
    assertEquals(2, allMenuItems.size());
    assertTrue(
      allMenuItems.stream().anyMatch(item -> "Espresso".equals(item.getName()))
    );
    assertTrue(
      allMenuItems
        .stream()
        .anyMatch(item -> "Cappuccino".equals(item.getName()))
    );
  }

  @Test
  void testDeleteMenuItem() {
    // Given
    MenuItem savedMenuItem = entityManager.persistAndFlush(menuItem1);
    Long menuItemId = savedMenuItem.getId();

    // When
    menuItemRepository.deleteById(menuItemId);

    // Then
    Optional<MenuItem> deletedMenuItem = menuItemRepository.findById(
      menuItemId
    );
    assertFalse(deletedMenuItem.isPresent());
  }

  @Test
  void testExistsById() {
    // Given
    MenuItem savedMenuItem = entityManager.persistAndFlush(menuItem1);

    // When & Then
    assertTrue(menuItemRepository.existsById(savedMenuItem.getId()));
    assertFalse(menuItemRepository.existsById(999L));
  }

  @Test
  void testUpdateMenuItem() {
    // Given
    MenuItem savedMenuItem = entityManager.persistAndFlush(menuItem1);

    // When
    savedMenuItem.setName("Updated Espresso");
    savedMenuItem.setPrice(3.00);
    MenuItem updatedMenuItem = menuItemRepository.save(savedMenuItem);

    // Then
    assertEquals("Updated Espresso", updatedMenuItem.getName());
    assertEquals(3.00, updatedMenuItem.getPrice());
  }
}
