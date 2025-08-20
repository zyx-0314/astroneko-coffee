package coffee.astroneko.backend.dto.request;

import coffee.astroneko.backend.entity.MenuItem.ItemType;
import coffee.astroneko.backend.entity.MenuItem.PromoType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public class CreateMenuItemRequest {

  @NotBlank(message = "Name is required")
  @Size(
    min = 2,
    max = 100,
    message = "Name must be between 2 and 100 characters"
  )
  private String name;

  @NotBlank(message = "Description is required")
  @Size(max = 1000, message = "Description must not exceed 1000 characters")
  private String description;

  @NotNull(message = "Price is required")
  @DecimalMin(value = "0.01", message = "Price must be greater than 0")
  @DecimalMax(value = "999.99", message = "Price must not exceed 999.99")
  private Double price;

  @DecimalMin(value = "0.01", message = "Original price must be greater than 0")
  @DecimalMax(
    value = "999.99",
    message = "Original price must not exceed 999.99"
  )
  @JsonProperty("originalPrice")
  private Double originalPrice;

  @NotNull(message = "Type is required")
  private ItemType type;

  @NotBlank(message = "Image URL is required")
  @Size(max = 500, message = "Image URL must not exceed 500 characters")
  private String image;

  @Size(max = 255, message = "Tags must not exceed 255 characters")
  private String tags;

  @JsonProperty("inStock")
  private Boolean inStock = true;

  @JsonProperty("isOnSale")
  private Boolean isOnSale = false;

  @JsonProperty("isCombo")
  private Boolean isCombo = false;

  @JsonProperty("promoType")
  private PromoType promoType;

  // Constructors
  public CreateMenuItemRequest() {}

  public CreateMenuItemRequest(
    String name,
    String description,
    Double price,
    ItemType type,
    String image
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.type = type;
    this.image = image;
  }

  // Getters and Setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public Double getOriginalPrice() {
    return originalPrice;
  }

  public void setOriginalPrice(Double originalPrice) {
    this.originalPrice = originalPrice;
  }

  public ItemType getType() {
    return type;
  }

  public void setType(ItemType type) {
    this.type = type;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getTags() {
    return tags;
  }

  public void setTags(String tags) {
    this.tags = tags;
  }

  public Boolean getInStock() {
    return inStock;
  }

  public void setInStock(Boolean inStock) {
    this.inStock = inStock;
  }

  public Boolean getIsOnSale() {
    return isOnSale;
  }

  public void setIsOnSale(Boolean isOnSale) {
    this.isOnSale = isOnSale;
  }

  public Boolean getIsCombo() {
    return isCombo;
  }

  public void setIsCombo(Boolean isCombo) {
    this.isCombo = isCombo;
  }

  public PromoType getPromoType() {
    return promoType;
  }

  public void setPromoType(PromoType promoType) {
    this.promoType = promoType;
  }
}
