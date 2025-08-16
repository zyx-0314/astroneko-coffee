package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.service.MenuItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    summary = "Get menu items",
    description = "Returns a list of available menu items"
  )
  @GetMapping
  public List<MenuItem> getMenu() {
    return menuItemService.getAllMenuItems();
  }
}
