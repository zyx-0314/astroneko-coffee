package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.Order;
import coffee.astroneko.backend.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  // Find by order number
  Optional<Order> findByOrderNumber(String orderNumber);

  // Find by customer
  Page<Order> findByCustomer(User customer, Pageable pageable);

  List<Order> findByCustomerOrderByOrderDateDesc(User customer);

  // Find by customer ID
  @Query(
    "SELECT o FROM Order o WHERE o.customer.id = :customerId ORDER BY o.orderDate DESC"
  )
  Page<Order> findByCustomerIdOrderByOrderDateDesc(
    @Param("customerId") Long customerId,
    Pageable pageable
  );

  // Find by status
  List<Order> findByStatusOrderByOrderDateDesc(Order.OrderStatus status);

  Page<Order> findByStatusOrderByOrderDateDesc(
    Order.OrderStatus status,
    Pageable pageable
  );

  // Find by multiple statuses
  List<Order> findByStatusInOrderByOrderDateDesc(
    List<Order.OrderStatus> statuses
  );

  // Find by queue number
  Optional<Order> findByQueueNumber(Integer queueNumber);

  // Find by date range
  @Query(
    "SELECT o FROM Order o WHERE o.orderDate BETWEEN :startDate AND :endDate ORDER BY o.orderDate DESC"
  )
  List<Order> findByOrderDateBetween(
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  // Find by customer and date range
  @Query(
    "SELECT o FROM Order o WHERE o.customer.id = :customerId AND o.orderDate BETWEEN :startDate AND :endDate ORDER BY o.orderDate DESC"
  )
  List<Order> findByCustomerIdAndOrderDateBetween(
    @Param("customerId") Long customerId,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  // Find orders assigned to staff member
  List<Order> findByAssignedToOrderByOrderDateDesc(User assignedTo);

  // Find orders completed by staff member
  List<Order> findByCompletedByOrderByOrderDateDesc(User completedBy);

  // Find today's orders
  @Query(
    "SELECT o FROM Order o WHERE CAST(o.orderDate AS DATE) = CURRENT_DATE ORDER BY o.orderDate DESC"
  )
  List<Order> findTodaysOrders();

  // Count orders by status
  Long countByStatus(Order.OrderStatus status);

  // Count orders for today
  @Query(
    "SELECT COUNT(o) FROM Order o WHERE CAST(o.orderDate AS DATE) = CURRENT_DATE"
  )
  Long countTodaysOrders();

  // Get next queue number
  @Query(
    "SELECT COALESCE(MAX(o.queueNumber), 0) + 1 FROM Order o WHERE CAST(o.orderDate AS DATE) = CURRENT_DATE"
  )
  Integer getNextQueueNumber();

  // Statistics queries
  @Query(
    "SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'COMPLETE' AND CAST(o.orderDate AS DATE) = CURRENT_DATE"
  )
  Optional<Double> getTodaysRevenue();

  @Query("SELECT AVG(o.totalAmount) FROM Order o WHERE o.status = 'COMPLETE'")
  Optional<Double> getAverageOrderValue();
}
