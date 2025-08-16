package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.dto.CreateMenuItemRequest;
import coffee.astroneko.backend.dto.UpdateMenuItemRequest;
import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.service.MenuItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
  name = "Menu Management",
  description = "Secure API for managing coffee shop menu items"
)
@RestController
@RequestMapping("/api/v1/secure/menu")
public class MenuManagementController {

  private final MenuItemService menuItemService;

  @Autowired
  public MenuManagementController(MenuItemService menuItemService) {
    this.menuItemService = menuItemService;
  }

  @Operation(
    summary = "Create new menu item",
    description = "Creates a new menu item with name and price"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "201",
        description = "Menu item created successfully"
      ),
      @ApiResponse(responseCode = "400", description = "Invalid input data"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
    }
  )
  @PostMapping
  public ResponseEntity<MenuItem> createMenuItem(
    @Valid @RequestBody CreateMenuItemRequest request
  ) {
    MenuItem savedItem = menuItemService.createMenuItem(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
  }

  @Operation(
    summary = "Update menu item",
    description = "Updates an existing menu item by ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Menu item updated successfully"
      ),
      @ApiResponse(responseCode = "400", description = "Invalid input data"),
      @ApiResponse(responseCode = "404", description = "Menu item not found"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
    }
  )
  @PutMapping("/{id}")
  public ResponseEntity<MenuItem> updateMenuItem(
    @PathVariable Long id,
    @Valid @RequestBody UpdateMenuItemRequest request
  ) {
    Optional<MenuItem> updatedItem = menuItemService.updateMenuItem(
      id,
      request
    );

    if (updatedItem.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(updatedItem.get());
  }

  @Operation(
    summary = "Delete menu item",
    description = "Deletes a menu item by ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "204",
        description = "Menu item deleted successfully"
      ),
      @ApiResponse(responseCode = "404", description = "Menu item not found"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
    }
  )
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
    boolean deleted = menuItemService.deleteMenuItem(id);

    if (!deleted) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.noContent().build();
  }

  @Operation(
    summary = "Get menu item by ID",
    description = "Retrieves a specific menu item by ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(responseCode = "200", description = "Menu item found"),
      @ApiResponse(responseCode = "404", description = "Menu item not found"),
      @ApiResponse(responseCode = "401", description = "Unauthorized"),
    }
  )
  @GetMapping("/{id}")
  public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
    Optional<MenuItem> optionalMenuItem = menuItemService.getMenuItemById(id);

    if (optionalMenuItem.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(optionalMenuItem.get());
  }
}
