package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_items")
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "menu_item_id", nullable = false)
  private MenuItem menuItem;

  @Column(name = "quantity", nullable = false)
  private Integer quantity;

  @Column(name = "unit_price", nullable = false, precision = 12, scale = 2)
  private BigDecimal unitPrice;

  @Column(name = "subtotal", nullable = false, precision = 12, scale = 2)
  private BigDecimal subtotal;

  @Column(name = "special_instructions", length = 500)
  private String specialInstructions;

  @Column(name = "discount_amount", precision = 12, scale = 2)
  private BigDecimal discountAmount = BigDecimal.ZERO;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Constructors
  public OrderItem() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public OrderItem(Order order, MenuItem menuItem, Integer quantity) {
    this();
    this.order = order;
    this.menuItem = menuItem;
    this.quantity = quantity;
    this.unitPrice = BigDecimal.valueOf(menuItem.getPrice());
    calculateSubtotal();
  }

  // JPA callbacks
  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  @PrePersist
  public void prePersist() {
    calculateSubtotal();
  }

  // Helper methods
  public void calculateSubtotal() {
    if (unitPrice != null && quantity != null) {
      BigDecimal baseSubtotal = unitPrice.multiply(
        BigDecimal.valueOf(quantity)
      );
      this.subtotal = baseSubtotal.subtract(
        discountAmount != null ? discountAmount : BigDecimal.ZERO
      );
    }
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public MenuItem getMenuItem() {
    return menuItem;
  }

  public void setMenuItem(MenuItem menuItem) {
    this.menuItem = menuItem;
    if (menuItem != null) {
      this.unitPrice = BigDecimal.valueOf(menuItem.getPrice());
      calculateSubtotal();
    }
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
    calculateSubtotal();
  }

  public BigDecimal getUnitPrice() {
    return unitPrice;
  }

  public void setUnitPrice(BigDecimal unitPrice) {
    this.unitPrice = unitPrice;
    calculateSubtotal();
  }

  public BigDecimal getSubtotal() {
    return subtotal;
  }

  public void setSubtotal(BigDecimal subtotal) {
    this.subtotal = subtotal;
  }

  public String getSpecialInstructions() {
    return specialInstructions;
  }

  public void setSpecialInstructions(String specialInstructions) {
    this.specialInstructions = specialInstructions;
  }

  public BigDecimal getDiscountAmount() {
    return discountAmount;
  }

  public void setDiscountAmount(BigDecimal discountAmount) {
    this.discountAmount = discountAmount;
    calculateSubtotal();
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
