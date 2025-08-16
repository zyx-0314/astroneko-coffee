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

  /**
   * Get all menu items
   */
  @Transactional(readOnly = true)
  public List<MenuItem> getAllMenuItems() {
    return menuItemRepository.findAll();
  }

  /**
   * Get menu item by ID
   */
  @Transactional(readOnly = true)
  public Optional<MenuItem> getMenuItemById(Long id) {
    return menuItemRepository.findById(id);
  }

  /**
   * Create a new menu item
   */
  public MenuItem createMenuItem(CreateMenuItemRequest request) {
    MenuItem menuItem = new MenuItem();
    menuItem.setName(request.getName());
    menuItem.setPrice(request.getPrice());

    return menuItemRepository.save(menuItem);
  }

  /**
   * Update an existing menu item
   */
  public Optional<MenuItem> updateMenuItem(
    Long id,
    UpdateMenuItemRequest request
  ) {
    Optional<MenuItem> optionalMenuItem = menuItemRepository.findById(id);

    if (optionalMenuItem.isEmpty()) {
      return Optional.empty();
    }

    MenuItem menuItem = optionalMenuItem.get();
    menuItem.setName(request.getName());
    menuItem.setPrice(request.getPrice());

    MenuItem updatedItem = menuItemRepository.save(menuItem);
    return Optional.of(updatedItem);
  }

  /**
   * Delete a menu item
   */
  public boolean deleteMenuItem(Long id) {
    if (!menuItemRepository.existsById(id)) {
      return false;
    }

    menuItemRepository.deleteById(id);
    return true;
  }

  /**
   * Check if menu item exists
   */
  @Transactional(readOnly = true)
  public boolean existsById(Long id) {
    return menuItemRepository.existsById(id);
  }
}
