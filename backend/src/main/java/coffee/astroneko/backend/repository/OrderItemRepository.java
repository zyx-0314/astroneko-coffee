package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.Order;
import coffee.astroneko.backend.entity.OrderItem;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
  // Find by order
  List<OrderItem> findByOrder(Order order);

  // Find by order ID
  List<OrderItem> findByOrderId(Long orderId);

  // Find by menu item
  List<OrderItem> findByMenuItem(MenuItem menuItem);

  // Find by menu item ID
  List<OrderItem> findByMenuItemId(Long menuItemId);

  // Statistics for menu item popularity
  @Query(
    "SELECT oi.menuItem.id, SUM(oi.quantity) as totalQuantity FROM OrderItem oi " +
    "WHERE oi.order.status = 'COMPLETE' " +
    "GROUP BY oi.menuItem.id ORDER BY totalQuantity DESC"
  )
  List<Object[]> findMenuItemPopularity();

  // Statistics for menu item popularity by customer
  @Query(
    "SELECT oi.menuItem.id, SUM(oi.quantity) as totalQuantity FROM OrderItem oi " +
    "WHERE oi.order.customer.id = :customerId AND oi.order.status = 'COMPLETE' " +
    "GROUP BY oi.menuItem.id ORDER BY totalQuantity DESC"
  )
  List<Object[]> findMenuItemPopularityByCustomer(
    @Param("customerId") Long customerId
  );

  // Find customer's most ordered items
  @Query(
    "SELECT oi.menuItem, SUM(oi.quantity) as totalQuantity, COUNT(DISTINCT oi.order) as orderCount " +
    "FROM OrderItem oi " +
    "WHERE oi.order.customer.id = :customerId AND oi.order.status = 'COMPLETE' " +
    "GROUP BY oi.menuItem " +
    "ORDER BY totalQuantity DESC, orderCount DESC"
  )
  List<Object[]> findCustomerFavoriteItems(
    @Param("customerId") Long customerId
  );

  // Find items ordered in date range
  @Query(
    "SELECT oi FROM OrderItem oi WHERE oi.order.orderDate BETWEEN :startDate AND :endDate"
  )
  List<OrderItem> findByOrderDateBetween(
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  // Revenue by menu item
  @Query(
    "SELECT oi.menuItem.id, SUM(oi.subtotal) as totalRevenue FROM OrderItem oi " +
    "WHERE oi.order.status = 'COMPLETE' " +
    "GROUP BY oi.menuItem.id ORDER BY totalRevenue DESC"
  )
  List<Object[]> findMenuItemRevenue();
}
