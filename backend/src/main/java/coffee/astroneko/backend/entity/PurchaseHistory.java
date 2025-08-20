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

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false, unique = true)
  private Order order;

  @Column(name = "notes", length = 500)
  private String notes;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Constructors
  public PurchaseHistory() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public PurchaseHistory(User customer, Order order) {
    this();
    this.customer = customer;
    this.order = order;
  }

  // JPA callbacks
  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  // Convenience methods to get data from related Order
  public String getOrderId() {
    return order != null ? order.getOrderNumber() : null;
  }

  public BigDecimal getTotalAmount() {
    return order != null ? order.getTotalAmount() : BigDecimal.ZERO;
  }

  public Integer getItemsCount() {
    return order != null ? order.getTotalItemsCount() : 0;
  }

  public LocalDateTime getOrderDate() {
    return order != null ? order.getOrderDate() : null;
  }

  public String getStatus() {
    return order != null ? order.getStatus().toString() : null;
  }

  public String getPaymentMethod() {
    return order != null && order.getPaymentMethod() != null
      ? order.getPaymentMethod().toString()
      : null;
  }

  public Integer getPointsEarned() {
    return order != null ? order.getPointsEarned() : 0;
  }

  public Integer getPointsUsed() {
    return order != null ? order.getPointsUsed() : 0;
  }

  public String getCustomerName() {
    return order != null
      ? order.getCustomerName()
      : (customer != null
          ? customer.getFirstName() + " " + customer.getLastName()
          : null);
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

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
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
