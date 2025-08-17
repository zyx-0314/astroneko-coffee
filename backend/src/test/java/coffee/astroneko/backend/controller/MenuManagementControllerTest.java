package coffee.astroneko.backend.controller;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import coffee.astroneko.backend.dto.CreateMenuItemRequest;
import coffee.astroneko.backend.dto.UpdateMenuItemRequest;
import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.service.MenuItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(MenuManagementController.class)
@ActiveProfiles("test")
class MenuManagementControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private MenuItemService menuItemService;

  @Autowired
  private ObjectMapper objectMapper;

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
  void testCreateMenuItem_Success() throws Exception {
    // Given
    MenuItem createdMenuItem = new MenuItem();
    createdMenuItem.setId(3L);
    createdMenuItem.setName("Latte");
    createdMenuItem.setPrice(4.25);

    when(
      menuItemService.createMenuItem(any(CreateMenuItemRequest.class))
    ).thenReturn(createdMenuItem);

    // When & Then
    mockMvc
      .perform(
        post("/api/v1/secure/menu")
          .contentType(MediaType.APPLICATION_JSON)
          .content(objectMapper.writeValueAsString(createRequest))
      )
      .andExpect(status().isCreated())
      .andExpect(jsonPath("$.id", is(3)))
      .andExpect(jsonPath("$.name", is("Latte")))
      .andExpect(jsonPath("$.price", is(4.25)));

    verify(menuItemService, times(1)).createMenuItem(
      any(CreateMenuItemRequest.class)
    );
  }

  @Test
  void testCreateMenuItem_InvalidData() throws Exception {
    // Given - invalid request with empty name
    CreateMenuItemRequest invalidRequest = new CreateMenuItemRequest(
      "",
      "",
      -1.0,
      MenuItem.ItemType.COFFEE,
      ""
    );

    // When & Then
    mockMvc
      .perform(
        post("/api/v1/secure/menu")
          .contentType(MediaType.APPLICATION_JSON)
          .content(objectMapper.writeValueAsString(invalidRequest))
      )
      .andExpect(status().isBadRequest());

    verify(menuItemService, never()).createMenuItem(
      any(CreateMenuItemRequest.class)
    );
  }

  @Test
  void testGetMenuItemById_Found() throws Exception {
    // Given
    when(menuItemService.getMenuItemById(1L)).thenReturn(
      Optional.of(menuItem1)
    );

    // When & Then
    mockMvc
      .perform(get("/api/v1/secure/menu/1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.id", is(1)))
      .andExpect(jsonPath("$.name", is("Espresso")))
      .andExpect(jsonPath("$.price", is(2.5)));

    verify(menuItemService, times(1)).getMenuItemById(1L);
  }

  @Test
  void testGetMenuItemById_NotFound() throws Exception {
    // Given
    when(menuItemService.getMenuItemById(999L)).thenReturn(Optional.empty());

    // When & Then
    mockMvc
      .perform(get("/api/v1/secure/menu/999"))
      .andExpect(status().isNotFound());

    verify(menuItemService, times(1)).getMenuItemById(999L);
  }

  @Test
  void testUpdateMenuItem_Success() throws Exception {
    // Given
    MenuItem updatedMenuItem = new MenuItem();
    updatedMenuItem.setId(1L);
    updatedMenuItem.setName("Updated Espresso");
    updatedMenuItem.setPrice(2.75);

    when(
      menuItemService.updateMenuItem(eq(1L), any(UpdateMenuItemRequest.class))
    ).thenReturn(Optional.of(updatedMenuItem));

    // When & Then
    mockMvc
      .perform(
        put("/api/v1/secure/menu/1")
          .contentType(MediaType.APPLICATION_JSON)
          .content(objectMapper.writeValueAsString(updateRequest))
      )
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.id", is(1)))
      .andExpect(jsonPath("$.name", is("Updated Espresso")))
      .andExpect(jsonPath("$.price", is(2.75)));

    verify(menuItemService, times(1)).updateMenuItem(
      eq(1L),
      any(UpdateMenuItemRequest.class)
    );
  }

  @Test
  void testUpdateMenuItem_NotFound() throws Exception {
    // Given
    when(
      menuItemService.updateMenuItem(eq(999L), any(UpdateMenuItemRequest.class))
    ).thenReturn(Optional.empty());

    // When & Then
    mockMvc
      .perform(
        put("/api/v1/secure/menu/999")
          .contentType(MediaType.APPLICATION_JSON)
          .content(objectMapper.writeValueAsString(updateRequest))
      )
      .andExpect(status().isNotFound());

    verify(menuItemService, times(1)).updateMenuItem(
      eq(999L),
      any(UpdateMenuItemRequest.class)
    );
  }

  @Test
  void testDeleteMenuItem_Success() throws Exception {
    // Given
    when(menuItemService.deleteMenuItem(1L)).thenReturn(true);

    // When & Then
    mockMvc
      .perform(delete("/api/v1/secure/menu/1"))
      .andExpect(status().isNoContent());

    verify(menuItemService, times(1)).deleteMenuItem(1L);
  }

  @Test
  void testDeleteMenuItem_NotFound() throws Exception {
    // Given
    when(menuItemService.deleteMenuItem(999L)).thenReturn(false);

    // When & Then
    mockMvc
      .perform(delete("/api/v1/secure/menu/999"))
      .andExpect(status().isNotFound());

    verify(menuItemService, times(1)).deleteMenuItem(999L);
  }
}
