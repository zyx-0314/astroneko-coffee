package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "promos")
public class Promo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String name;

  @Column(nullable = false, length = 500)
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(name = "promo_type", nullable = true, length = 30)
  private PromoType promoType;

  @Column(name = "discount_percentage", precision = 5, scale = 2)
  private BigDecimal discountPercentage;

  @Column(name = "discount_amount", precision = 12, scale = 2)
  private BigDecimal discountAmount;

  @Column(name = "start_date", nullable = false)
  private LocalDateTime startDate;

  @Column(name = "end_date", nullable = false)
  private LocalDateTime endDate;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

  @Column(name = "usage_limit")
  private Integer usageLimit;

  @Column(name = "current_usage", nullable = false)
  private Integer currentUsage = 0;

  @Column(name = "minimum_order_amount", precision = 12, scale = 2)
  private BigDecimal minimumOrderAmount;

  @Column(name = "maximum_discount_amount", precision = 12, scale = 2)
  private BigDecimal maximumDiscountAmount;

  @Column(name = "promo_code", unique = true, length = 50)
  private String promoCode;

  @Enumerated(EnumType.STRING)
  @Column(name = "applicable_to", nullable = false, length = 20)
  private ApplicableTo applicableTo = ApplicableTo.SPECIFIC_ITEMS;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Many-to-many relationship with MenuItems
  @ManyToMany(mappedBy = "promos", fetch = FetchType.LAZY)
  private Set<MenuItem> menuItems;

  // Enums
  public enum PromoType {
    PERCENTAGE_DISCOUNT,
    FIXED_AMOUNT_DISCOUNT,
    BUY_ONE_GET_ONE,
    SEASONAL_SPECIAL,
    LOYALTY_REWARD,
    WELCOME_BACK_SCHOOL,
    HAPPY_HOUR,
    STUDENT_DISCOUNT,
    EMPLOYEE_DISCOUNT,
  }

  public enum ApplicableTo {
    ALL_ITEMS,
    SPECIFIC_ITEMS,
    CATEGORY_BASED,
    MINIMUM_ORDER,
  }

  // Constructors
  public Promo() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public Promo(
    String name,
    String description,
    PromoType promoType,
    LocalDateTime startDate,
    LocalDateTime endDate
  ) {
    this();
    this.name = name;
    this.description = description;
    this.promoType = promoType;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  // Business methods
  public boolean isCurrentlyActive() {
    LocalDateTime now = LocalDateTime.now();
    return (
      isActive &&
      now.isAfter(startDate) &&
      now.isBefore(endDate) &&
      (usageLimit == null || currentUsage < usageLimit)
    );
  }

  public BigDecimal calculateDiscount(BigDecimal orderAmount) {
    if (!isCurrentlyActive()) {
      return BigDecimal.ZERO;
    }

    if (
      minimumOrderAmount != null &&
      orderAmount.compareTo(minimumOrderAmount) < 0
    ) {
      return BigDecimal.ZERO;
    }

    BigDecimal discount = BigDecimal.ZERO;

    if (discountPercentage != null) {
      discount = orderAmount.multiply(
        discountPercentage.divide(BigDecimal.valueOf(100))
      );
    } else if (discountAmount != null) {
      discount = discountAmount;
    }

    // Apply maximum discount limit if specified
    if (
      maximumDiscountAmount != null &&
      discount.compareTo(maximumDiscountAmount) > 0
    ) {
      discount = maximumDiscountAmount;
    }

    return discount;
  }

  public void incrementUsage() {
    this.currentUsage++;
    this.updatedAt = LocalDateTime.now();
  }

  // JPA lifecycle methods
  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
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

  public PromoType getPromoType() {
    return promoType;
  }

  public void setPromoType(PromoType promoType) {
    this.promoType = promoType;
  }

  public BigDecimal getDiscountPercentage() {
    return discountPercentage;
  }

  public void setDiscountPercentage(BigDecimal discountPercentage) {
    this.discountPercentage = discountPercentage;
  }

  public BigDecimal getDiscountAmount() {
    return discountAmount;
  }

  public void setDiscountAmount(BigDecimal discountAmount) {
    this.discountAmount = discountAmount;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
  }

  public Integer getUsageLimit() {
    return usageLimit;
  }

  public void setUsageLimit(Integer usageLimit) {
    this.usageLimit = usageLimit;
  }

  public Integer getCurrentUsage() {
    return currentUsage;
  }

  public void setCurrentUsage(Integer currentUsage) {
    this.currentUsage = currentUsage;
  }

  public BigDecimal getMinimumOrderAmount() {
    return minimumOrderAmount;
  }

  public void setMinimumOrderAmount(BigDecimal minimumOrderAmount) {
    this.minimumOrderAmount = minimumOrderAmount;
  }

  public BigDecimal getMaximumDiscountAmount() {
    return maximumDiscountAmount;
  }

  public void setMaximumDiscountAmount(BigDecimal maximumDiscountAmount) {
    this.maximumDiscountAmount = maximumDiscountAmount;
  }

  public String getPromoCode() {
    return promoCode;
  }

  public void setPromoCode(String promoCode) {
    this.promoCode = promoCode;
  }

  public ApplicableTo getApplicableTo() {
    return applicableTo;
  }

  public void setApplicableTo(ApplicableTo applicableTo) {
    this.applicableTo = applicableTo;
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

  public Set<MenuItem> getMenuItems() {
    return menuItems;
  }

  public void setMenuItems(Set<MenuItem> menuItems) {
    this.menuItems = menuItems;
  }
}
