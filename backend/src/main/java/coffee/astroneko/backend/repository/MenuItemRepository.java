package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
  /**
   * Find menu items by type
   */
  List<MenuItem> findByType(ItemType type);

  /**
   * Find menu items by stock status
   */
  List<MenuItem> findByInStock(Boolean inStock);

  /**
   * Find menu items on sale
   */
  List<MenuItem> findByIsOnSale(Boolean isOnSale);

  /**
   * Find combo deals
   */
  List<MenuItem> findByIsCombo(Boolean isCombo);

  /**
   * Find menu items with complex filtering using JPQL
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE " +
    "(:type IS NULL OR m.type = :type) AND " +
    "(:inStock IS NULL OR m.inStock = :inStock) AND " +
    "(:isOnSale IS NULL OR m.isOnSale = :isOnSale) AND " +
    "(:isCombo IS NULL OR m.isCombo = :isCombo)"
  )
  List<MenuItem> findMenuItemsWithFilters(
    @Param("type") ItemType type,
    @Param("inStock") Boolean inStock,
    @Param("isOnSale") Boolean isOnSale,
    @Param("isCombo") Boolean isCombo
  );

  /**
   * Find menu items with pagination and filtering
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE " +
    "(:type IS NULL OR m.type = :type) AND " +
    "(:inStock IS NULL OR m.inStock = :inStock) AND " +
    "(:isOnSale IS NULL OR m.isOnSale = :isOnSale) AND " +
    "(:isCombo IS NULL OR m.isCombo = :isCombo)"
  )
  Page<MenuItem> findMenuItemsWithFilters(
    @Param("type") ItemType type,
    @Param("inStock") Boolean inStock,
    @Param("isOnSale") Boolean isOnSale,
    @Param("isCombo") Boolean isCombo,
    Pageable pageable
  );

  /**
   * Find top menu items by monthly buys for recommendations
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.inStock = true ORDER BY m.monthlyBuys DESC"
  )
  List<MenuItem> findTopBoughtItems(Pageable pageable);

  /**
   * Find top menu items by rating for favorites
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.inStock = true AND m.rating > 0 ORDER BY m.rating DESC, m.monthlyBuys DESC"
  )
  List<MenuItem> findTopRatedItems(Pageable pageable);

  /**
   * Find promotional items (with active promos)
   */
  @Query(
    "SELECT DISTINCT m FROM MenuItem m JOIN m.promos p WHERE p.isActive = true AND p.startDate <= CURRENT_TIMESTAMP AND p.endDate >= CURRENT_TIMESTAMP AND m.inStock = true ORDER BY m.monthlyBuys DESC"
  )
  List<MenuItem> findPromotionalItems(Pageable pageable);
}
