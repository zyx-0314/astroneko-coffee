package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.MenuItem.ItemType;
import coffee.astroneko.backend.entity.MenuItem.PromoType;
import java.util.List;
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
   * Find menu items by promo type
   */
  List<MenuItem> findByPromoType(PromoType promoType);

  /**
   * Find menu items that have any promo type (not null)
   */
  List<MenuItem> findByPromoTypeIsNotNull();

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
    "(:promoType IS NULL OR m.promoType = :promoType) AND " +
    "(:inStock IS NULL OR m.inStock = :inStock) AND " +
    "(:isOnSale IS NULL OR m.isOnSale = :isOnSale) AND " +
    "(:isCombo IS NULL OR m.isCombo = :isCombo)"
  )
  List<MenuItem> findMenuItemsWithFilters(
    @Param("type") ItemType type,
    @Param("promoType") PromoType promoType,
    @Param("inStock") Boolean inStock,
    @Param("isOnSale") Boolean isOnSale,
    @Param("isCombo") Boolean isCombo
  );
}
