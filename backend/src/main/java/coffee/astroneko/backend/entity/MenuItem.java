package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "menu_items")
public class MenuItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String description;

  @Column(nullable = false)
  private Double price;

  @Column(name = "original_price")
  private Double originalPrice;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private ItemType type;

  @Column(nullable = false, length = 500)
  private String image;

  @Column(nullable = false)
  private Double rating = 0.0;

  @Column(name = "reviews_count", nullable = false)
  private Integer reviewsCount = 0;

  @Column(name = "weekly_reviews", nullable = false)
  private Integer weeklyReviews = 0;

  @Column(name = "monthly_reviews", nullable = false)
  private Integer monthlyReviews = 0;

  @Column(name = "weekly_buys", nullable = false)
  private Integer weeklyBuys = 0;

  @Column(name = "monthly_buys", nullable = false)
  private Integer monthlyBuys = 0;

  @Column(name = "positive_reviews_weekly", nullable = false)
  private Integer positiveReviewsWeekly = 0;

  @Column(name = "positive_reviews_monthly", nullable = false)
  private Integer positiveReviewsMonthly = 0;

  @Column(name = "tags")
  private String tags;

  @Column(name = "in_stock", nullable = false)
  private Boolean inStock = true;

  @Column(name = "is_on_sale")
  private Boolean isOnSale = false;

  @Column(name = "is_combo")
  private Boolean isCombo = false;

  // Many-to-many relationship with Promos
  @ManyToMany(
    fetch = FetchType.LAZY,
    cascade = { CascadeType.PERSIST, CascadeType.MERGE }
  )
  @JoinTable(
    name = "menu_item_promos",
    joinColumns = @JoinColumn(name = "menu_item_id"),
    inverseJoinColumns = @JoinColumn(name = "promo_id")
  )
  private Set<Promo> promos;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Enums
  public enum ItemType {
    COFFEE,
    PASTRIES,
    DRINKS,
    BUNDLES,
    VEGETARIAN,
    INSTANT,
    COMBO,
  }

  // Constructors
  public MenuItem() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public MenuItem(
    String name,
    String description,
    Double price,
    ItemType type,
    String image
  ) {
    this();
    this.name = name;
    this.description = description;
    this.price = price;
    this.type = type;
    this.image = image;
  }

  // Lifecycle callbacks
  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
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

  public Set<Promo> getPromos() {
    return promos;
  }

  public void setPromos(Set<Promo> promos) {
    this.promos = promos;
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

  // Helper methods
  public boolean isOnSale() {
    return Boolean.TRUE.equals(this.isOnSale) && this.originalPrice != null;
  }

  public boolean isComboItem() {
    return Boolean.TRUE.equals(this.isCombo);
  }

  public boolean hasPromotion() {
    return this.promos != null && !this.promos.isEmpty();
  }

  @Override
  public String toString() {
    return (
      "MenuItem{" +
      "id=" +
      id +
      ", name='" +
      name +
      '\'' +
      ", type=" +
      type +
      ", price=" +
      price +
      ", inStock=" +
      inStock +
      '}'
    );
  }
}
