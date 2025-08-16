package coffee.astroneko.backend.controller;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.service.MenuItemService;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(MenuController.class)
@ActiveProfiles("test")
class MenuControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private MenuItemService menuItemService;

  private MenuItem menuItem1;
  private MenuItem menuItem2;
  private List<MenuItem> menuItems;

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

    menuItems = Arrays.asList(menuItem1, menuItem2);
  }

  @Test
  void testGetMenu_WithItems() throws Exception {
    // Given
    when(menuItemService.getAllMenuItems()).thenReturn(menuItems);

    // When & Then
    mockMvc
      .perform(get("/api/v1/expose/menu"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$", hasSize(2)))
      .andExpect(jsonPath("$[0].id", is(1)))
      .andExpect(jsonPath("$[0].name", is("Espresso")))
      .andExpect(jsonPath("$[0].price", is(2.5)))
      .andExpect(jsonPath("$[1].id", is(2)))
      .andExpect(jsonPath("$[1].name", is("Cappuccino")))
      .andExpect(jsonPath("$[1].price", is(3.75)));

    verify(menuItemService, times(1)).getAllMenuItems();
  }

  @Test
  void testGetMenu_EmptyList() throws Exception {
    // Given
    when(menuItemService.getAllMenuItems()).thenReturn(Arrays.asList());

    // When & Then
    mockMvc
      .perform(get("/api/v1/expose/menu"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$", hasSize(0)));

    verify(menuItemService, times(1)).getAllMenuItems();
  }

  @Test
  void testGetMenu_ServiceException() throws Exception {
    // Given
    when(menuItemService.getAllMenuItems()).thenThrow(
      new RuntimeException("Database error")
    );

    // When & Then
    mockMvc
      .perform(get("/api/v1/expose/menu"))
      .andExpect(status().isInternalServerError());

    verify(menuItemService, times(1)).getAllMenuItems();
  }
}
