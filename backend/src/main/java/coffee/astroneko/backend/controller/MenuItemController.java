package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.dto.request.CreateMenuItemRequest;
import coffee.astroneko.backend.dto.request.UpdateMenuItemRequest;
import coffee.astroneko.backend.dto.response.MenuItemResponse;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import coffee.astroneko.backend.entity.MenuItem.PromoType;
import coffee.astroneko.backend.service.MenuItemService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3001")
public class MenuItemController {

  @Autowired
  private MenuItemService menuItemService;

  /**
   * PUBLIC ENDPOINTS - For customer menu display
   */

  @GetMapping("/expose/menu")
  public ResponseEntity<Page<MenuItemResponse>> getPublicMenu(
    @RequestParam(required = false) ItemType type,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "name") String sortBy,
    @RequestParam(defaultValue = "asc") String sortDir
  ) {
    Page<MenuItemResponse> menuItems = menuItemService.getPublicMenuItems(
      type,
      page,
      size,
      sortBy,
      sortDir
    );

    return ResponseEntity.ok(menuItems);
  }

  @GetMapping("/expose/menu/{id}")
  public ResponseEntity<MenuItemResponse> getPublicMenuItem(
    @PathVariable Long id
  ) {
    Optional<MenuItemResponse> menuItem = menuItemService.getMenuItemById(id);

    return menuItem
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/expose/menu/recommendations")
  public ResponseEntity<List<MenuItemResponse>> getRecommendations(
    @RequestParam(defaultValue = "6") int limit
  ) {
    List<MenuItemResponse> recommendations = menuItemService.getTopBoughtItems(
      limit
    );
    return ResponseEntity.ok(recommendations);
  }

  @GetMapping("/expose/menu/favorites")
  public ResponseEntity<List<MenuItemResponse>> getFavorites(
    @RequestParam(defaultValue = "3") int limit
  ) {
    List<MenuItemResponse> favorites = menuItemService.getTopRatedItems(limit);
    return ResponseEntity.ok(favorites);
  }

  @GetMapping("/expose/menu/promotions")
  public ResponseEntity<List<MenuItemResponse>> getPromotions(
    @RequestParam(defaultValue = "3") int limit
  ) {
    List<MenuItemResponse> promotions = menuItemService.getPromotionalItems(
      limit
    );
    return ResponseEntity.ok(promotions);
  }

  /**
   * SECURE ENDPOINTS - For staff management
   */

  @GetMapping("/secure/menu")
  public ResponseEntity<Page<MenuItemResponse>> getAllMenuItems(
    @RequestParam(required = false) ItemType type,
    @RequestParam(required = false) PromoType promoType,
    @RequestParam(required = false) Boolean inStock,
    @RequestParam(required = false) Boolean isOnSale,
    @RequestParam(required = false) Boolean isCombo,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "name") String sortBy,
    @RequestParam(defaultValue = "asc") String sortDir
  ) {
    Page<MenuItemResponse> menuItems = menuItemService.getMenuItems(
      type,
      promoType,
      inStock,
      isOnSale,
      isCombo,
      page,
      size,
      sortBy,
      sortDir
    );

    return ResponseEntity.ok(menuItems);
  }

  @GetMapping("/secure/menu/{id}")
  public ResponseEntity<MenuItemResponse> getMenuItem(@PathVariable Long id) {
    Optional<MenuItemResponse> menuItem = menuItemService.getMenuItemById(id);

    return menuItem
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/secure/menu")
  public ResponseEntity<MenuItemResponse> createMenuItem(
    @Valid @RequestBody CreateMenuItemRequest request
  ) {
    try {
      MenuItemResponse createdItem = menuItemService.createMenuItem(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @PutMapping("/secure/menu/{id}")
  public ResponseEntity<MenuItemResponse> updateMenuItem(
    @PathVariable Long id,
    @Valid @RequestBody UpdateMenuItemRequest request
  ) {
    Optional<MenuItemResponse> updatedItem = menuItemService.updateMenuItem(
      id,
      request
    );

    return updatedItem
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PatchMapping("/secure/menu/{id}/stock")
  public ResponseEntity<MenuItemResponse> updateStockStatus(
    @PathVariable Long id,
    @RequestBody Map<String, Boolean> request
  ) {
    Boolean inStock = request.get("inStock");
    if (inStock == null) {
      return ResponseEntity.badRequest().build();
    }

    Optional<MenuItemResponse> updatedItem = menuItemService.updateStockStatus(
      id,
      inStock
    );

    return updatedItem
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PatchMapping("/secure/menu/{id}/discontinue")
  public ResponseEntity<Void> discontinueMenuItem(@PathVariable Long id) {
    boolean discontinued = menuItemService.discontinueMenuItem(id);

    if (discontinued) {
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/secure/menu/{id}")
  public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
    boolean deleted = menuItemService.deleteMenuItem(id);

    if (deleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  /**
   * UTILITY ENDPOINTS
   */

  @GetMapping("/secure/menu/by-type/{type}")
  public ResponseEntity<List<MenuItemResponse>> getMenuItemsByType(
    @PathVariable ItemType type
  ) {
    List<MenuItemResponse> items = menuItemService.getItemsByType(type);
    return ResponseEntity.ok(items);
  }

  @GetMapping("/secure/menu/analytics/top-bought")
  public ResponseEntity<List<MenuItemResponse>> getTopBoughtItems(
    @RequestParam(defaultValue = "10") int limit
  ) {
    List<MenuItemResponse> items = menuItemService.getTopBoughtItems(limit);
    return ResponseEntity.ok(items);
  }

  @GetMapping("/secure/menu/analytics/top-rated")
  public ResponseEntity<List<MenuItemResponse>> getTopRatedItems(
    @RequestParam(defaultValue = "10") int limit
  ) {
    List<MenuItemResponse> items = menuItemService.getTopRatedItems(limit);
    return ResponseEntity.ok(items);
  }
}
