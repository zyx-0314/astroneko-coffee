package coffee.astroneko.backend.service;

import coffee.astroneko.backend.dto.response.PurchaseHistoryResponse;
import coffee.astroneko.backend.entity.PurchaseHistory;
import coffee.astroneko.backend.repository.PurchaseHistoryRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PurchaseHistoryService {

  @Autowired
  private PurchaseHistoryRepository purchaseHistoryRepository;

  @Transactional(readOnly = true)
  public List<PurchaseHistoryResponse> getAllPurchaseHistory() {
    List<PurchaseHistory> purchases = purchaseHistoryRepository.findAll();
    return purchases
      .stream()
      .map(this::mapToPurchaseHistoryResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<PurchaseHistoryResponse> getPurchaseHistoryByCustomerId(
    Long customerId
  ) {
    List<PurchaseHistory> purchases =
      purchaseHistoryRepository.findByCustomerIdOrderByOrderOrderDateDesc(
        customerId
      );
    return purchases
      .stream()
      .map(this::mapToPurchaseHistoryResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public Page<PurchaseHistoryResponse> getPurchaseHistoryByCustomerId(
    Long customerId,
    int page,
    int size
  ) {
    Pageable pageable = PageRequest.of(page, size);
    Page<PurchaseHistory> purchases =
      purchaseHistoryRepository.findByCustomerIdOrderByOrderOrderDateDesc(
        customerId,
        pageable
      );
    return purchases.map(this::mapToPurchaseHistoryResponse);
  }

  @Transactional(readOnly = true)
  public Optional<PurchaseHistoryResponse> getPurchaseHistoryById(Long id) {
    Optional<PurchaseHistory> purchase = purchaseHistoryRepository.findById(id);
    return purchase.map(this::mapToPurchaseHistoryResponse);
  }

  @Transactional(readOnly = true)
  public List<PurchaseHistoryResponse> getPurchaseHistoryByOrderId(
    String orderId
  ) {
    List<PurchaseHistory> purchases =
      purchaseHistoryRepository.findByOrderOrderNumber(orderId);
    return purchases
      .stream()
      .map(this::mapToPurchaseHistoryResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<PurchaseHistoryResponse> getPurchaseHistoryByDateRange(
    LocalDateTime startDate,
    LocalDateTime endDate
  ) {
    List<PurchaseHistory> purchases = purchaseHistoryRepository.findByDateRange(
      startDate,
      endDate
    );
    return purchases
      .stream()
      .map(this::mapToPurchaseHistoryResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<PurchaseHistoryResponse> getPurchaseHistoryByCustomerAndDateRange(
    Long customerId,
    LocalDateTime startDate,
    LocalDateTime endDate
  ) {
    List<PurchaseHistory> purchases =
      purchaseHistoryRepository.findByCustomerIdAndDateRange(
        customerId,
        startDate,
        endDate
      );
    return purchases
      .stream()
      .map(this::mapToPurchaseHistoryResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public Long getCustomerOrderCount(Long customerId) {
    return purchaseHistoryRepository.countByCustomerId(customerId);
  }

  @Transactional(readOnly = true)
  public BigDecimal getCustomerTotalSpent(Long customerId) {
    BigDecimal total = purchaseHistoryRepository.getTotalSpentByCustomerId(
      customerId
    );
    return total != null ? total : BigDecimal.ZERO;
  }

  private PurchaseHistoryResponse mapToPurchaseHistoryResponse(
    PurchaseHistory purchase
  ) {
    PurchaseHistoryResponse response = new PurchaseHistoryResponse();

    response.setId(purchase.getId());
    response.setCustomerId(purchase.getCustomer().getId());
    response.setCustomerName(
      purchase.getCustomer().getFirstName() +
      " " +
      purchase.getCustomer().getLastName()
    );
    response.setCustomerEmail(purchase.getCustomer().getEmail());
    response.setOrderId(purchase.getOrderId());
    response.setTotalAmount(purchase.getTotalAmount());
    response.setItemsCount(purchase.getItemsCount());
    response.setOrderDate(purchase.getOrderDate());
    response.setStatus(purchase.getStatus());
    response.setPaymentMethod(purchase.getPaymentMethod());
    response.setNotes(purchase.getNotes());
    // Discount applied can be retrieved from order if needed
    response.setDiscountApplied(
      purchase.getOrder() != null
        ? purchase.getOrder().getDiscountAmount()
        : null
    );
    response.setPointsEarned(purchase.getPointsEarned());
    response.setPointsUsed(purchase.getPointsUsed());
    response.setCreatedAt(purchase.getCreatedAt());
    response.setUpdatedAt(purchase.getUpdatedAt());

    return response;
  }
}
