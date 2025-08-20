package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.PurchaseHistory;
import coffee.astroneko.backend.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseHistoryRepository
  extends JpaRepository<PurchaseHistory, Long> {
  List<PurchaseHistory> findByCustomerOrderByOrderOrderDateDesc(User customer);

  Page<PurchaseHistory> findByCustomerOrderByOrderOrderDateDesc(
    User customer,
    Pageable pageable
  );

  List<PurchaseHistory> findByCustomerIdOrderByOrderOrderDateDesc(
    Long customerId
  );

  Page<PurchaseHistory> findByCustomerIdOrderByOrderOrderDateDesc(
    Long customerId,
    Pageable pageable
  );

  List<PurchaseHistory> findByOrderOrderNumber(String orderNumber);

  @Query("SELECT p FROM PurchaseHistory p WHERE p.order.status = :status")
  List<PurchaseHistory> findByOrderStatus(
    @Param("status") coffee.astroneko.backend.entity.Order.OrderStatus status
  );

  @Query(
    "SELECT p FROM PurchaseHistory p WHERE p.customer.id = :customerId AND p.order.orderDate BETWEEN :startDate AND :endDate ORDER BY p.order.orderDate DESC"
  )
  List<PurchaseHistory> findByCustomerIdAndDateRange(
    @Param("customerId") Long customerId,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  @Query(
    "SELECT p FROM PurchaseHistory p WHERE p.order.orderDate BETWEEN :startDate AND :endDate ORDER BY p.order.orderDate DESC"
  )
  List<PurchaseHistory> findByDateRange(
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  @Query(
    "SELECT COUNT(p) FROM PurchaseHistory p WHERE p.customer.id = :customerId"
  )
  Long countByCustomerId(@Param("customerId") Long customerId);

  @Query(
    "SELECT SUM(p.order.totalAmount) FROM PurchaseHistory p WHERE p.customer.id = :customerId"
  )
  java.math.BigDecimal getTotalSpentByCustomerId(
    @Param("customerId") Long customerId
  );
}
