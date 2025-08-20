package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "order_number", nullable = false, unique = true)
  private String orderNumber;

  @Column(name = "queue_number", nullable = false)
  private Integer queueNumber;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "customer_id")
  private User customer;

  @Column(name = "customer_name", nullable = false, length = 100)
  private String customerName;

  @OneToMany(
    mappedBy = "order",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY
  )
  private List<OrderItem> orderItems = new ArrayList<>();

  @Column(name = "subtotal", nullable = false, precision = 12, scale = 2)
  private BigDecimal subtotal = BigDecimal.ZERO;

  @Column(name = "discount_amount", precision = 12, scale = 2)
  private BigDecimal discountAmount = BigDecimal.ZERO;

  @Column(name = "tax_amount", precision = 12, scale = 2)
  private BigDecimal taxAmount = BigDecimal.ZERO;

  @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
  private BigDecimal totalAmount = BigDecimal.ZERO;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 20)
  private OrderStatus status = OrderStatus.PENDING;

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_method", length = 50)
  private PaymentMethod paymentMethod;

  @Column(name = "points_earned")
  private Integer pointsEarned = 0;

  @Column(name = "points_used")
  private Integer pointsUsed = 0;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assigned_to")
  private User assignedTo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "completed_by")
  private User completedBy;

  @Column(name = "special_instructions", length = 500)
  private String specialInstructions;

  @Column(name = "notes", length = 500)
  private String notes;

  @Column(name = "order_date", nullable = false)
  private LocalDateTime orderDate;

  @Column(name = "estimated_ready_time")
  private LocalDateTime estimatedReadyTime;

  @Column(name = "ready_time")
  private LocalDateTime readyTime;

  @Column(name = "completed_time")
  private LocalDateTime completedTime;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Order Status Enum
  public enum OrderStatus {
    PENDING,
    IN_PROGRESS,
    READY,
    COMPLETE,
    HAS_PROBLEM,
    CANCELLED,
    RETURN,
    DELAYED,
  }

  // Payment Method Enum
  public enum PaymentMethod {
    CASH,
    CREDIT_CARD,
    DEBIT_CARD,
    DIGITAL_WALLET,
    POINTS,
    BANK_TRANSFER,
  }

  // Constructors
  public Order() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
    this.orderDate = LocalDateTime.now();
  }

  public Order(String customerName, User customer) {
    this();
    this.customerName = customerName;
    this.customer = customer;
  }

  // JPA callbacks
  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  @PrePersist
  public void prePersist() {
    if (this.orderNumber == null) {
      this.orderNumber = generateOrderNumber();
    }
  }

  // Helper methods
  private String generateOrderNumber() {
    return "ORD-" + System.currentTimeMillis();
  }

  public void calculateTotals() {
    this.subtotal = orderItems
      .stream()
      .map(OrderItem::getSubtotal)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    this.totalAmount = subtotal
      .add(taxAmount != null ? taxAmount : BigDecimal.ZERO)
      .subtract(discountAmount != null ? discountAmount : BigDecimal.ZERO);
  }

  public int getTotalItemsCount() {
    return orderItems.stream().mapToInt(OrderItem::getQuantity).sum();
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getOrderNumber() {
    return orderNumber;
  }

  public void setOrderNumber(String orderNumber) {
    this.orderNumber = orderNumber;
  }

  public Integer getQueueNumber() {
    return queueNumber;
  }

  public void setQueueNumber(Integer queueNumber) {
    this.queueNumber = queueNumber;
  }

  public User getCustomer() {
    return customer;
  }

  public void setCustomer(User customer) {
    this.customer = customer;
  }

  public String getCustomerName() {
    return customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public List<OrderItem> getOrderItems() {
    return orderItems;
  }

  public void setOrderItems(List<OrderItem> orderItems) {
    this.orderItems = orderItems;
  }

  public BigDecimal getSubtotal() {
    return subtotal;
  }

  public void setSubtotal(BigDecimal subtotal) {
    this.subtotal = subtotal;
  }

  public BigDecimal getDiscountAmount() {
    return discountAmount;
  }

  public void setDiscountAmount(BigDecimal discountAmount) {
    this.discountAmount = discountAmount;
  }

  public BigDecimal getTaxAmount() {
    return taxAmount;
  }

  public void setTaxAmount(BigDecimal taxAmount) {
    this.taxAmount = taxAmount;
  }

  public BigDecimal getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(BigDecimal totalAmount) {
    this.totalAmount = totalAmount;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }

  public PaymentMethod getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(PaymentMethod paymentMethod) {
    this.paymentMethod = paymentMethod;
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

  public User getAssignedTo() {
    return assignedTo;
  }

  public void setAssignedTo(User assignedTo) {
    this.assignedTo = assignedTo;
  }

  public User getCompletedBy() {
    return completedBy;
  }

  public void setCompletedBy(User completedBy) {
    this.completedBy = completedBy;
  }

  public String getSpecialInstructions() {
    return specialInstructions;
  }

  public void setSpecialInstructions(String specialInstructions) {
    this.specialInstructions = specialInstructions;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public LocalDateTime getOrderDate() {
    return orderDate;
  }

  public void setOrderDate(LocalDateTime orderDate) {
    this.orderDate = orderDate;
  }

  public LocalDateTime getEstimatedReadyTime() {
    return estimatedReadyTime;
  }

  public void setEstimatedReadyTime(LocalDateTime estimatedReadyTime) {
    this.estimatedReadyTime = estimatedReadyTime;
  }

  public LocalDateTime getReadyTime() {
    return readyTime;
  }

  public void setReadyTime(LocalDateTime readyTime) {
    this.readyTime = readyTime;
  }

  public LocalDateTime getCompletedTime() {
    return completedTime;
  }

  public void setCompletedTime(LocalDateTime completedTime) {
    this.completedTime = completedTime;
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
