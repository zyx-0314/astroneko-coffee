package coffee.astroneko.backend.dto;

import coffee.astroneko.backend.entity.MenuItem;
import jakarta.validation.constraints.*;
import java.util.List;

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
  private Double price;

  @DecimalMin(value = "0.01", message = "Original price must be greater than 0")
  private Double originalPrice;

  @NotNull(message = "Type is required")
  private MenuItem.ItemType type;

  @NotBlank(message = "Image URL is required")
  @Size(max = 500, message = "Image URL must not exceed 500 characters")
  private String image;

  @DecimalMin(value = "0.0", message = "Rating must be non-negative")
  @DecimalMax(value = "5.0", message = "Rating must not exceed 5.0")
  private Double rating = 0.0;

  @Min(value = 0, message = "Reviews count must be non-negative")
  private Integer reviewsCount = 0;

  @Min(value = 0, message = "Weekly reviews must be non-negative")
  private Integer weeklyReviews = 0;

  @Min(value = 0, message = "Monthly reviews must be non-negative")
  private Integer monthlyReviews = 0;

  @Min(value = 0, message = "Weekly buys must be non-negative")
  private Integer weeklyBuys = 0;

  @Min(value = 0, message = "Monthly buys must be non-negative")
  private Integer monthlyBuys = 0;

  @Min(value = 0, message = "Positive reviews weekly must be non-negative")
  private Integer positiveReviewsWeekly = 0;

  @Min(value = 0, message = "Positive reviews monthly must be non-negative")
  private Integer positiveReviewsMonthly = 0;

  private String tags;

  private Boolean inStock = true;

  private Boolean isOnSale = false;

  private Boolean isCombo = false;

  private MenuItem.PromoType promoType;

  // Default constructor
  public CreateMenuItemRequest() {}

  // Constructor with basic parameters
  public CreateMenuItemRequest(
    String name,
    String description,
    Double price,
    MenuItem.ItemType type,
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
    this.name = name != null ? name.trim() : null;
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

  public MenuItem.ItemType getType() {
    return type;
  }

  public void setType(MenuItem.ItemType type) {
    this.type = type;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public Double getRating() {
    return rating;
  }

  public void setRating(Double rating) {
    this.rating = rating;
  }

  public Integer getReviewsCount() {
    return reviewsCount;
  }

  public void setReviewsCount(Integer reviewsCount) {
    this.reviewsCount = reviewsCount;
  }

  public Integer getWeeklyReviews() {
    return weeklyReviews;
  }

  public void setWeeklyReviews(Integer weeklyReviews) {
    this.weeklyReviews = weeklyReviews;
  }

  public Integer getMonthlyReviews() {
    return monthlyReviews;
  }

  public void setMonthlyReviews(Integer monthlyReviews) {
    this.monthlyReviews = monthlyReviews;
  }

  public Integer getWeeklyBuys() {
    return weeklyBuys;
  }

  public void setWeeklyBuys(Integer weeklyBuys) {
    this.weeklyBuys = weeklyBuys;
  }

  public Integer getMonthlyBuys() {
    return monthlyBuys;
  }

  public void setMonthlyBuys(Integer monthlyBuys) {
    this.monthlyBuys = monthlyBuys;
  }

  public Integer getPositiveReviewsWeekly() {
    return positiveReviewsWeekly;
  }

  public void setPositiveReviewsWeekly(Integer positiveReviewsWeekly) {
    this.positiveReviewsWeekly = positiveReviewsWeekly;
  }

  public Integer getPositiveReviewsMonthly() {
    return positiveReviewsMonthly;
  }

  public void setPositiveReviewsMonthly(Integer positiveReviewsMonthly) {
    this.positiveReviewsMonthly = positiveReviewsMonthly;
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

  public MenuItem.PromoType getPromoType() {
    return promoType;
  }

  public void setPromoType(MenuItem.PromoType promoType) {
    this.promoType = promoType;
  }

  @Override
  public String toString() {
    return (
      "CreateMenuItemRequest{" +
      "name='" +
      name +
      '\'' +
      ", price=" +
      price +
      '}'
    );
  }
}
