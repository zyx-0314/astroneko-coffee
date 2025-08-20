package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_history")
public class PurchaseHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id", nullable = false)
  private User customer;

  @Column(name = "order_id", nullable = false, unique = true)
  private String orderId;

  @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
  private BigDecimal totalAmount;

  @Column(name = "items_count", nullable = false)
  private Integer itemsCount;

  @Column(name = "order_date", nullable = false)
  private LocalDateTime orderDate;

  @Column(name = "status", nullable = false, length = 20)
  private String status;

  @Column(name = "payment_method", length = 50)
  private String paymentMethod;

  @Column(name = "notes", length = 500)
  private String notes;

  @Column(name = "discount_applied", precision = 10, scale = 2)
  private BigDecimal discountApplied;

  @Column(name = "points_earned")
  private Integer pointsEarned;

  @Column(name = "points_used")
  private Integer pointsUsed;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Constructors
  public PurchaseHistory() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public PurchaseHistory(
    User customer,
    String orderId,
    BigDecimal totalAmount,
    Integer itemsCount,
    String status
  ) {
    this();
    this.customer = customer;
    this.orderId = orderId;
    this.totalAmount = totalAmount;
    this.itemsCount = itemsCount;
    this.status = status;
    this.orderDate = LocalDateTime.now();
  }

  // JPA callbacks
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

  public User getCustomer() {
    return customer;
  }

  public void setCustomer(User customer) {
    this.customer = customer;
  }

  public String getOrderId() {
    return orderId;
  }

  public void setOrderId(String orderId) {
    this.orderId = orderId;
  }

  public BigDecimal getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(BigDecimal totalAmount) {
    this.totalAmount = totalAmount;
  }

  public Integer getItemsCount() {
    return itemsCount;
  }

  public void setItemsCount(Integer itemsCount) {
    this.itemsCount = itemsCount;
  }

  public LocalDateTime getOrderDate() {
    return orderDate;
  }

  public void setOrderDate(LocalDateTime orderDate) {
    this.orderDate = orderDate;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public BigDecimal getDiscountApplied() {
    return discountApplied;
  }

  public void setDiscountApplied(BigDecimal discountApplied) {
    this.discountApplied = discountApplied;
  }

  public Integer getPointsEarned() {
    return pointsEarned;
  }

  public void setPointsEarned(Integer pointsEarned) {
    this.pointsEarned = pointsEarned;
  }

  public Integer getPointsUsed() {
    return pointsUsed;
  }

  public void setPointsUsed(Integer pointsUsed) {
    this.pointsUsed = pointsUsed;
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
