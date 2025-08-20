package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
  /**
   * Find menu item by ID (excluding soft deleted)
   */
  Optional<MenuItem> findByIdAndIsDeletedFalse(Long id);

  /**
   * Find menu items by type (excluding soft deleted)
   */
  List<MenuItem> findByTypeAndIsDeletedFalse(ItemType type);

  /**
   * Find menu items by stock status (excluding soft deleted)
   */
  List<MenuItem> findByInStockAndIsDeletedFalse(Boolean inStock);

  /**
   * Find menu items on sale (excluding soft deleted)
   */
  List<MenuItem> findByIsOnSaleAndIsDeletedFalse(Boolean isOnSale);

  /**
   * Find combo deals (excluding soft deleted)
   */
  List<MenuItem> findByIsComboAndIsDeletedFalse(Boolean isCombo);

  /**
   * Find all non-deleted menu items
   */
  List<MenuItem> findByIsDeletedFalse();

  /**
   * Find menu items with complex filtering using JPQL (excluding soft deleted)
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.isDeleted = false AND " +
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
   * Find menu items with pagination and filtering (excluding soft deleted)
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.isDeleted = false AND " +
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
   * Find top menu items by monthly buys for recommendations (excluding soft deleted)
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.isDeleted = false AND m.inStock = true ORDER BY m.monthlyBuys DESC"
  )
  List<MenuItem> findTopBoughtItems(Pageable pageable);

  /**
   * Find top menu items by rating for favorites (excluding soft deleted)
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.isDeleted = false AND m.inStock = true AND m.rating > 0 ORDER BY m.rating DESC, m.monthlyBuys DESC"
  )
  List<MenuItem> findTopRatedItems(Pageable pageable);

  /**
   * Find promotional items (with active promos) (excluding soft deleted)
   */
  @Query(
    "SELECT DISTINCT m FROM MenuItem m JOIN m.promos p WHERE m.isDeleted = false AND p.isActive = true AND p.startDate <= CURRENT_TIMESTAMP AND p.endDate >= CURRENT_TIMESTAMP AND m.inStock = true ORDER BY m.monthlyBuys DESC"
  )
  List<MenuItem> findPromotionalItems(Pageable pageable);

  /**
   * Find all non-deleted menu items
   */
  @Query("SELECT m FROM MenuItem m WHERE m.isDeleted = false")
  List<MenuItem> findAllNotDeleted();

  /**
   * Find all non-deleted menu items with pagination
   */
  @Query("SELECT m FROM MenuItem m WHERE m.isDeleted = false")
  Page<MenuItem> findAllNotDeleted(Pageable pageable);

  /**
   * Find by type excluding soft deleted
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.isDeleted = false AND m.type = :type"
  )
  List<MenuItem> findByTypeNotDeleted(@Param("type") ItemType type);

  /**
   * Find by stock status excluding soft deleted
   */
  @Query(
    "SELECT m FROM MenuItem m WHERE m.isDeleted = false AND m.inStock = :inStock"
  )
  List<MenuItem> findByInStockNotDeleted(@Param("inStock") Boolean inStock);
}
