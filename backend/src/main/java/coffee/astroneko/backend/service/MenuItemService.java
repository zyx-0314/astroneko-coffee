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
    menuItem.setDescription(request.getDescription());
    menuItem.setPrice(request.getPrice());
    menuItem.setOriginalPrice(request.getOriginalPrice());
    menuItem.setType(request.getType());
    menuItem.setImage(request.getImage());
    menuItem.setRating(request.getRating());
    menuItem.setReviewsCount(request.getReviewsCount());
    menuItem.setWeeklyReviews(request.getWeeklyReviews());
    menuItem.setMonthlyReviews(request.getMonthlyReviews());
    menuItem.setWeeklyBuys(request.getWeeklyBuys());
    menuItem.setMonthlyBuys(request.getMonthlyBuys());
    menuItem.setPositiveReviewsWeekly(request.getPositiveReviewsWeekly());
    menuItem.setPositiveReviewsMonthly(request.getPositiveReviewsMonthly());
    menuItem.setTags(request.getTags());
    menuItem.setInStock(request.getInStock());
    menuItem.setIsOnSale(request.getIsOnSale());
    menuItem.setIsCombo(request.getIsCombo());
    menuItem.setPromoType(request.getPromoType());

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
    menuItem.setDescription(request.getDescription());
    menuItem.setPrice(request.getPrice());
    menuItem.setOriginalPrice(request.getOriginalPrice());
    menuItem.setType(request.getType());
    menuItem.setImage(request.getImage());

    if (request.getRating() != null) {
      menuItem.setRating(request.getRating());
    }
    if (request.getReviewsCount() != null) {
      menuItem.setReviewsCount(request.getReviewsCount());
    }
    if (request.getWeeklyReviews() != null) {
      menuItem.setWeeklyReviews(request.getWeeklyReviews());
    }
    if (request.getMonthlyReviews() != null) {
      menuItem.setMonthlyReviews(request.getMonthlyReviews());
    }
    if (request.getWeeklyBuys() != null) {
      menuItem.setWeeklyBuys(request.getWeeklyBuys());
    }
    if (request.getMonthlyBuys() != null) {
      menuItem.setMonthlyBuys(request.getMonthlyBuys());
    }
    if (request.getPositiveReviewsWeekly() != null) {
      menuItem.setPositiveReviewsWeekly(request.getPositiveReviewsWeekly());
    }
    if (request.getPositiveReviewsMonthly() != null) {
      menuItem.setPositiveReviewsMonthly(request.getPositiveReviewsMonthly());
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
    if (request.getPromoType() != null) {
      menuItem.setPromoType(request.getPromoType());
    }

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

  /**
   * Get menu items with optional filtering
   */
  @Transactional(readOnly = true)
  public List<MenuItem> getMenuItems(
    MenuItem.ItemType type,
    MenuItem.PromoType promoType,
    Boolean inStock,
    Boolean onSale,
    Boolean isCombo
  ) {
    if (
      type == null &&
      promoType == null &&
      inStock == null &&
      onSale == null &&
      isCombo == null
    ) {
      return getAllMenuItems();
    }

    return menuItemRepository.findMenuItemsWithFilters(
      type,
      promoType,
      inStock,
      onSale,
      isCombo
    );
  }

  /**
   * Get menu items by type
   */
  @Transactional(readOnly = true)
  public List<MenuItem> getMenuItemsByType(MenuItem.ItemType type) {
    return menuItemRepository.findByType(type);
  }

  /**
   * Get promotional items
   */
  @Transactional(readOnly = true)
  public List<MenuItem> getPromotionalItems(MenuItem.PromoType promoType) {
    if (promoType == null) {
      return menuItemRepository.findByPromoTypeIsNotNull();
    }
    return menuItemRepository.findByPromoType(promoType);
  }

  /**
   * Get items on sale
   */
  @Transactional(readOnly = true)
  public List<MenuItem> getItemsOnSale() {
    return menuItemRepository.findByIsOnSale(true);
  }

  /**
   * Get combo deals
   */
  @Transactional(readOnly = true)
  public List<MenuItem> getCombos() {
    return menuItemRepository.findByIsCombo(true);
  }
}
