package coffee.astroneko.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import coffee.astroneko.backend.dto.CreateMenuItemRequest;
import coffee.astroneko.backend.dto.UpdateMenuItemRequest;
import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.repository.MenuItemRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MenuItemServiceTest {

  @Mock
  private MenuItemRepository menuItemRepository;

  @InjectMocks
  private MenuItemService menuItemService;

  private MenuItem menuItem1;
  private MenuItem menuItem2;
  private CreateMenuItemRequest createRequest;
  private UpdateMenuItemRequest updateRequest;

  @BeforeEach
  void setUp() {
    menuItem1 = new MenuItem();
    menuItem1.setId(1L);
    menuItem1.setName("Espresso");
    menuItem1.setPrice(2.50);

    menuItem2 = new MenuItem();
    menuItem2.setId(2L);
    menuItem2.setName("Cappuccino");
    menuItem2.setPrice(3.75);

    createRequest = new CreateMenuItemRequest(
      "Latte",
      "Creamy coffee with steamed milk",
      4.25,
      MenuItem.ItemType.COFFEE,
      "/placeholder/latte.jpg"
    );
    updateRequest = new UpdateMenuItemRequest(
      "Updated Espresso",
      "Strong concentrated coffee",
      2.75,
      MenuItem.ItemType.COFFEE,
      "/placeholder/espresso.jpg"
    );
  }

  @Test
  void testGetAllMenuItems() {
    // Given
    List<MenuItem> expectedMenuItems = Arrays.asList(menuItem1, menuItem2);
    when(menuItemRepository.findAll()).thenReturn(expectedMenuItems);

    // When
    List<MenuItem> actualMenuItems = menuItemService.getAllMenuItems();

    // Then
    assertEquals(2, actualMenuItems.size());
    assertEquals(expectedMenuItems, actualMenuItems);
    verify(menuItemRepository, times(1)).findAll();
  }

  @Test
  void testGetMenuItemById_Found() {
    // Given
    when(menuItemRepository.findById(1L)).thenReturn(Optional.of(menuItem1));

    // When
    Optional<MenuItem> result = menuItemService.getMenuItemById(1L);

    // Then
    assertTrue(result.isPresent());
    assertEquals(menuItem1, result.get());
    verify(menuItemRepository, times(1)).findById(1L);
  }

  @Test
  void testGetMenuItemById_NotFound() {
    // Given
    when(menuItemRepository.findById(999L)).thenReturn(Optional.empty());

    // When
    Optional<MenuItem> result = menuItemService.getMenuItemById(999L);

    // Then
    assertFalse(result.isPresent());
    verify(menuItemRepository, times(1)).findById(999L);
  }

  @Test
  void testCreateMenuItem() {
    // Given
    MenuItem savedMenuItem = new MenuItem();
    savedMenuItem.setId(3L);
    savedMenuItem.setName("Latte");
    savedMenuItem.setPrice(4.25);

    when(menuItemRepository.save(any(MenuItem.class))).thenReturn(
      savedMenuItem
    );

    // When
    MenuItem result = menuItemService.createMenuItem(createRequest);

    // Then
    assertNotNull(result);
    assertEquals(3L, result.getId());
    assertEquals("Latte", result.getName());
    assertEquals(4.25, result.getPrice());
    verify(menuItemRepository, times(1)).save(any(MenuItem.class));
  }

  @Test
  void testUpdateMenuItem_Found() {
    // Given
    MenuItem updatedMenuItem = new MenuItem();
    updatedMenuItem.setId(1L);
    updatedMenuItem.setName("Updated Espresso");
    updatedMenuItem.setPrice(2.75);

    when(menuItemRepository.findById(1L)).thenReturn(Optional.of(menuItem1));
    when(menuItemRepository.save(any(MenuItem.class))).thenReturn(
      updatedMenuItem
    );

    // When
    Optional<MenuItem> result = menuItemService.updateMenuItem(
      1L,
      updateRequest
    );

    // Then
    assertTrue(result.isPresent());
    assertEquals("Updated Espresso", result.get().getName());
    assertEquals(2.75, result.get().getPrice());
    verify(menuItemRepository, times(1)).findById(1L);
    verify(menuItemRepository, times(1)).save(any(MenuItem.class));
  }

  @Test
  void testUpdateMenuItem_NotFound() {
    // Given
    when(menuItemRepository.findById(999L)).thenReturn(Optional.empty());

    // When
    Optional<MenuItem> result = menuItemService.updateMenuItem(
      999L,
      updateRequest
    );

    // Then
    assertFalse(result.isPresent());
    verify(menuItemRepository, times(1)).findById(999L);
    verify(menuItemRepository, never()).save(any(MenuItem.class));
  }

  @Test
  void testDeleteMenuItem_Found() {
    // Given
    when(menuItemRepository.existsById(1L)).thenReturn(true);

    // When
    boolean result = menuItemService.deleteMenuItem(1L);

    // Then
    assertTrue(result);
    verify(menuItemRepository, times(1)).existsById(1L);
    verify(menuItemRepository, times(1)).deleteById(1L);
  }

  @Test
  void testDeleteMenuItem_NotFound() {
    // Given
    when(menuItemRepository.existsById(999L)).thenReturn(false);

    // When
    boolean result = menuItemService.deleteMenuItem(999L);

    // Then
    assertFalse(result);
    verify(menuItemRepository, times(1)).existsById(999L);
    verify(menuItemRepository, never()).deleteById(any());
  }

  @Test
  void testCreateMenuItemWithNullRequest() {
    // Given
    CreateMenuItemRequest nullRequest = null;

    // When & Then
    assertThrows(NullPointerException.class, () -> {
      menuItemService.createMenuItem(nullRequest);
    });
  }
}
