package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import coffee.astroneko.backend.entity.MenuItem.PromoType;
import coffee.astroneko.backend.service.MenuItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Menu", description = "API for managing coffee shop menu")
@RestController
@RequestMapping("/api/v1/expose/menu")
public class MenuController {

  private final MenuItemService menuItemService;

  @Autowired
  public MenuController(MenuItemService menuItemService) {
    this.menuItemService = menuItemService;
  }

  @Operation(
    summary = "Get all menu items",
    description = "Returns a list of all menu items with optional filtering"
  )
  @GetMapping
  public List<MenuItem> getMenu(
    @Parameter(description = "Filter by item type") @RequestParam(
      required = false
    ) ItemType type,
    @Parameter(description = "Filter by promotional type") @RequestParam(
      required = false
    ) PromoType promoType,
    @Parameter(description = "Filter by stock availability") @RequestParam(
      required = false
    ) Boolean inStock,
    @Parameter(description = "Filter by sale status") @RequestParam(
      required = false
    ) Boolean onSale,
    @Parameter(description = "Filter by combo status") @RequestParam(
      required = false
    ) Boolean isCombo
  ) {
    return menuItemService.getMenuItems(
      type,
      promoType,
      inStock,
      onSale,
      isCombo
    );
  }

  @Operation(
    summary = "Get menu items by type",
    description = "Returns menu items filtered by item type"
  )
  @GetMapping("/by-type")
  public List<MenuItem> getMenuItemsByType(
    @Parameter(
      description = "Item type to filter by",
      required = true
    ) @RequestParam ItemType type
  ) {
    return menuItemService.getMenuItemsByType(type);
  }

  @Operation(
    summary = "Get promotional items",
    description = "Returns menu items that are part of promotions"
  )
  @GetMapping("/promotions")
  public List<MenuItem> getPromotionalItems(
    @Parameter(description = "Specific promo type to filter by") @RequestParam(
      required = false
    ) PromoType promoType
  ) {
    return menuItemService.getPromotionalItems(promoType);
  }

  @Operation(
    summary = "Get items on sale",
    description = "Returns menu items that are currently on sale"
  )
  @GetMapping("/on-sale")
  public List<MenuItem> getItemsOnSale() {
    return menuItemService.getItemsOnSale();
  }

  @Operation(
    summary = "Get combo deals",
    description = "Returns menu items that are combo deals"
  )
  @GetMapping("/combos")
  public List<MenuItem> getCombos() {
    return menuItemService.getCombos();
  }
}
