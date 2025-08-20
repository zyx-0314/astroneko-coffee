package coffee.astroneko.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PurchaseHistoryResponse {

  private Long id;
  private Long customerId;
  private String customerName;
  private String customerEmail;
  private String orderId;
  private BigDecimal totalAmount;
  private Integer itemsCount;
  private LocalDateTime orderDate;
  private String status;
  private String paymentMethod;
  private String notes;
  private BigDecimal discountApplied;
  private Integer pointsEarned;
  private Integer pointsUsed;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // Default constructor
  public PurchaseHistoryResponse() {}

  // Constructor with essential fields
  public PurchaseHistoryResponse(
    Long id,
    Long customerId,
    String customerName,
    String customerEmail,
    String orderId,
    BigDecimal totalAmount,
    Integer itemsCount,
    LocalDateTime orderDate,
    String status
  ) {
    this.id = id;
    this.customerId = customerId;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.orderId = orderId;
    this.totalAmount = totalAmount;
    this.itemsCount = itemsCount;
    this.orderDate = orderDate;
    this.status = status;
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Long customerId) {
    this.customerId = customerId;
  }

  public String getCustomerName() {
    return customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public String getCustomerEmail() {
    return customerEmail;
  }

  public void setCustomerEmail(String customerEmail) {
    this.customerEmail = customerEmail;
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
