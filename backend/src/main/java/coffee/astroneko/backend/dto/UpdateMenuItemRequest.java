package coffee.astroneko.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateMenuItemRequest {

  @NotBlank(message = "Name is required")
  @Size(
    min = 2,
    max = 100,
    message = "Name must be between 2 and 100 characters"
  )
  private String name;

  @NotNull(message = "Price is required")
  @DecimalMin(value = "0.01", message = "Price must be greater than 0")
  private Double price;

  // Default constructor
  public UpdateMenuItemRequest() {}

  // Constructor with parameters
  public UpdateMenuItemRequest(String name, Double price) {
    this.name = name;
    this.price = price;
  }

  // Getters and Setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name != null ? name.trim() : null;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  @Override
  public String toString() {
    return (
      "UpdateMenuItemRequest{" +
      "name='" +
      name +
      '\'' +
      ", price=" +
      price +
      '}'
    );
  }
}
