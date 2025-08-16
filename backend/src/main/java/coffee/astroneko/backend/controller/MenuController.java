package coffee.astroneko.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Tag(name = "Menu", description = "API for managing coffee shop menu")
@RestController
@RequestMapping("/api/v1/expose/menu")
public class MenuController {

    @Operation(summary = "Get menu items", description = "Returns a list of available menu items")
    @GetMapping
    public List<Map<String, String>> getMenu() {
        return List.of(
                Map.of("id", "1", "name", "Espresso", "price", "3.00"),
                Map.of("id", "2", "name", "Latte", "price", "4.50"),
                Map.of("id", "3", "name", "Cappuccino", "price", "4.00"));
    }
}