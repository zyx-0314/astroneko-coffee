package coffee.astroneko.backend.service;

import coffee.astroneko.backend.dto.request.CreateMenuItemRequest;
import coffee.astroneko.backend.dto.request.UpdateMenuItemRequest;
import coffee.astroneko.backend.dto.response.MenuItemResponse;
import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import coffee.astroneko.backend.repository.MenuItemRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MenuItemService {

  @Autowired
  private MenuItemRepository menuItemRepository;

  /**
   * Get all menu items with pagination and filtering
   */
  public Page<MenuItemResponse> getMenuItems(
    ItemType type,
    Boolean inStock,
    Boolean isOnSale,
    Boolean isCombo,
    int page,
    int size,
    String sortBy,
    String sortDir
  ) {
    Sort.Direction direction = sortDir.equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;
    Sort sort = Sort.by(direction, sortBy);
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<MenuItem> menuItems = menuItemRepository.findMenuItemsWithFilters(
      type,
      inStock,
      isOnSale,
      isCombo,
      pageable
    );

    return menuItems.map(MenuItemResponse::from);
  }

  /**
   * Get all menu items (for public menu)
   */
  public Page<MenuItemResponse> getPublicMenuItems(
    ItemType type,
    int page,
    int size,
    String sortBy,
    String sortDir
  ) {
    Sort.Direction direction = sortDir.equalsIgnoreCase("desc")
      ? Sort.Direction.DESC
      : Sort.Direction.ASC;
    Sort sort = Sort.by(direction, sortBy);
    Pageable pageable = PageRequest.of(page, size, sort);

    // Only show in-stock items for public menu
    Page<MenuItem> menuItems = menuItemRepository.findMenuItemsWithFilters(
      type,
      true,
      null,
      null,
      pageable
    );

    return menuItems.map(MenuItemResponse::from);
  }

  /**
   * Get menu item by ID
   */
  public Optional<MenuItemResponse> getMenuItemById(Long id) {
    return menuItemRepository.findById(id).map(MenuItemResponse::from);
  }

  /**
   * Create new menu item (Manager only)
   */
  @PreAuthorize("hasRole('MANAGER') or hasRole('OWNER')")
  @Transactional
  public MenuItemResponse createMenuItem(CreateMenuItemRequest request) {
    MenuItem menuItem = new MenuItem();
    menuItem.setName(request.getName());
    menuItem.setDescription(request.getDescription());
    menuItem.setPrice(request.getPrice());
    menuItem.setOriginalPrice(request.getOriginalPrice());
    menuItem.setType(request.getType());
    menuItem.setImage(request.getImage());
    menuItem.setTags(request.getTags());
    menuItem.setInStock(
      request.getInStock() != null ? request.getInStock() : true
    );
    menuItem.setIsOnSale(
      request.getIsOnSale() != null ? request.getIsOnSale() : false
    );
    menuItem.setIsCombo(
      request.getIsCombo() != null ? request.getIsCombo() : false
    );

    MenuItem savedMenuItem = menuItemRepository.save(menuItem);
    return MenuItemResponse.from(savedMenuItem);
  }

  /**
   * Update menu item (Manager only)
   */
  @PreAuthorize("hasRole('MANAGER') or hasRole('OWNER')")
  @Transactional
  public Optional<MenuItemResponse> updateMenuItem(
    Long id,
    UpdateMenuItemRequest request
  ) {
    return menuItemRepository
      .findById(id)
      .map(menuItem -> {
        if (request.getName() != null) {
          menuItem.setName(request.getName());
        }
        if (request.getDescription() != null) {
          menuItem.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
          menuItem.setPrice(request.getPrice());
        }
        if (request.getOriginalPrice() != null) {
          menuItem.setOriginalPrice(request.getOriginalPrice());
        }
        if (request.getType() != null) {
          menuItem.setType(request.getType());
        }
        if (request.getImage() != null) {
          menuItem.setImage(request.getImage());
        }
        if (request.getTags() != null) {
          menuItem.setTags(request.getTags());
        }
        if (request.getInStock() != null) {
          menuItem.setInStock(request.getInStock());
        }
        if (request.getIsOnSale() != null) {
          menuItem.setIsOnSale(request.getIsOnSale());
        }
        if (request.getIsCombo() != null) {
          menuItem.setIsCombo(request.getIsCombo());
        }

        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);
        return MenuItemResponse.from(updatedMenuItem);
      });
  }

  /**
   * Update stock status (Kitchen staff can use this)
   */
  @PreAuthorize(
    "hasRole('MANAGER') or hasRole('OWNER') or hasRole('COOK') or hasRole('BARISTA')"
  )
  @Transactional
  public Optional<MenuItemResponse> updateStockStatus(
    Long id,
    Boolean inStock
  ) {
    return menuItemRepository
      .findById(id)
      .map(menuItem -> {
        menuItem.setInStock(inStock);
        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);
        return MenuItemResponse.from(updatedMenuItem);
      });
  }

  /**
   * Discontinue menu item (soft delete by setting inStock to false)
   */
  @PreAuthorize("hasRole('MANAGER') or hasRole('OWNER')")
  @Transactional
  public boolean discontinueMenuItem(Long id) {
    return menuItemRepository
      .findById(id)
      .map(menuItem -> {
        menuItem.setInStock(false);
        menuItemRepository.save(menuItem);
        return true;
      })
      .orElse(false);
  }

  /**
   * Delete menu item permanently (Manager only)
   */
  @PreAuthorize("hasRole('MANAGER') or hasRole('OWNER')")
  @Transactional
  public boolean deleteMenuItem(Long id) {
    if (menuItemRepository.existsById(id)) {
      menuItemRepository.deleteById(id);
      return true;
    }
    return false;
  }

  /**
   * Get top bought items for recommendations
   */
  public List<MenuItemResponse> getTopBoughtItems(int limit) {
    Pageable pageable = PageRequest.of(0, limit);
    List<MenuItem> items = menuItemRepository.findTopBoughtItems(pageable);
    return items
      .stream()
      .map(MenuItemResponse::from)
      .collect(Collectors.toList());
  }

  /**
   * Get top rated items for favorites
   */
  public List<MenuItemResponse> getTopRatedItems(int limit) {
    Pageable pageable = PageRequest.of(0, limit);
    List<MenuItem> items = menuItemRepository.findTopRatedItems(pageable);
    return items
      .stream()
      .map(MenuItemResponse::from)
      .collect(Collectors.toList());
  }

  /**
   * Get promotional items
   */
  public List<MenuItemResponse> getPromotionalItems(int limit) {
    Pageable pageable = PageRequest.of(0, limit);
    List<MenuItem> items = menuItemRepository.findPromotionalItems(pageable);
    return items
      .stream()
      .map(MenuItemResponse::from)
      .collect(Collectors.toList());
  }

  /**
   * Get items by type
   */
  public List<MenuItemResponse> getItemsByType(ItemType type) {
    List<MenuItem> items = menuItemRepository.findByType(type);
    return items
      .stream()
      .map(MenuItemResponse::from)
      .collect(Collectors.toList());
  }
}
