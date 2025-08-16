package coffee.astroneko.backend.entity;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MenuItemTest {

  private MenuItem menuItem;

  @BeforeEach
  void setUp() {
    menuItem = new MenuItem();
  }

  @Test
  void testMenuItemSettersAndGetters() {
    // Given
    Long expectedId = 1L;
    String expectedName = "Espresso";
    Double expectedPrice = 2.50;

    // When
    menuItem.setId(expectedId);
    menuItem.setName(expectedName);
    menuItem.setPrice(expectedPrice);

    // Then
    assertEquals(expectedId, menuItem.getId());
    assertEquals(expectedName, menuItem.getName());
    assertEquals(expectedPrice, menuItem.getPrice());
  }

  @Test
  void testMenuItemInitialState() {
    // Given a new MenuItem
    MenuItem newMenuItem = new MenuItem();

    // Then all fields should be null initially
    assertNull(newMenuItem.getId());
    assertNull(newMenuItem.getName());
    assertNull(newMenuItem.getPrice());
  }

  @Test
  void testMenuItemWithValidData() {
    // Given valid menu item data
    String name = "Cappuccino";
    Double price = 3.75;

    // When setting valid data
    menuItem.setName(name);
    menuItem.setPrice(price);

    // Then the data should be set correctly
    assertEquals(name, menuItem.getName());
    assertEquals(price, menuItem.getPrice());
    assertTrue(price > 0);
    assertNotNull(name);
    assertFalse(name.trim().isEmpty());
  }
}
