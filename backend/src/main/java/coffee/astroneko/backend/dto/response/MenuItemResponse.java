package coffee.astroneko.backend.dto.response;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import coffee.astroneko.backend.entity.MenuItem.PromoType;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class MenuItemResponse {

  private Long id;
  private String name;
  private String description;
  private Double price;

  @JsonProperty("originalPrice")
  private Double originalPrice;

  private ItemType type;
  private String image;
  private Double rating;

  @JsonProperty("reviewsCount")
  private Integer reviewsCount;

  @JsonProperty("weeklyReviews")
  private Integer weeklyReviews;

  @JsonProperty("monthlyReviews")
  private Integer monthlyReviews;

  @JsonProperty("weeklyBuys")
  private Integer weeklyBuys;

  @JsonProperty("monthlyBuys")
  private Integer monthlyBuys;

  @JsonProperty("positiveReviewsWeekly")
  private Integer positiveReviewsWeekly;

  @JsonProperty("positiveReviewsMonthly")
  private Integer positiveReviewsMonthly;

  private String tags;

  @JsonProperty("inStock")
  private Boolean inStock;

  @JsonProperty("isOnSale")
  private Boolean isOnSale;

  @JsonProperty("isCombo")
  private Boolean isCombo;

  @JsonProperty("promoType")
  private PromoType promoType;

  @JsonProperty("createdAt")
  private LocalDateTime createdAt;

  @JsonProperty("updatedAt")
  private LocalDateTime updatedAt;

  // Constructors
  public MenuItemResponse() {}

  public MenuItemResponse(MenuItem menuItem) {
    this.id = menuItem.getId();
    this.name = menuItem.getName();
    this.description = menuItem.getDescription();
    this.price = menuItem.getPrice();
    this.originalPrice = menuItem.getOriginalPrice();
    this.type = menuItem.getType();
    this.image = menuItem.getImage();
    this.rating = menuItem.getRating();
    this.reviewsCount = menuItem.getReviewsCount();
    this.weeklyReviews = menuItem.getWeeklyReviews();
    this.monthlyReviews = menuItem.getMonthlyReviews();
    this.weeklyBuys = menuItem.getWeeklyBuys();
    this.monthlyBuys = menuItem.getMonthlyBuys();
    this.positiveReviewsWeekly = menuItem.getPositiveReviewsWeekly();
    this.positiveReviewsMonthly = menuItem.getPositiveReviewsMonthly();
    this.tags = menuItem.getTags();
    this.inStock = menuItem.getInStock();
    this.isOnSale = menuItem.getIsOnSale();
    this.isCombo = menuItem.getIsCombo();
    this.promoType = menuItem.getPromoType();
    this.createdAt = menuItem.getCreatedAt();
    this.updatedAt = menuItem.getUpdatedAt();
  }

  // Static factory method
  public static MenuItemResponse from(MenuItem menuItem) {
    return new MenuItemResponse(menuItem);
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

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

  public PromoType getPromoType() {
    return promoType;
  }

  public void setPromoType(PromoType promoType) {
    this.promoType = promoType;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
