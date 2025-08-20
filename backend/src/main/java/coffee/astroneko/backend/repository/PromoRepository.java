package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.Promo;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoRepository extends JpaRepository<Promo, Long> {
  // Find promo by promo code
  Optional<Promo> findByPromoCode(String promoCode);

  // Find active promos
  @Query(
    "SELECT p FROM Promo p WHERE p.isActive = true AND :currentDate BETWEEN p.startDate AND p.endDate"
  )
  List<Promo> findActivePromos(@Param("currentDate") LocalDateTime currentDate);

  // Find promos by type
  List<Promo> findByPromoType(Promo.PromoType promoType);

  // Find promos applicable to specific menu item
  @Query(
    "SELECT p FROM Promo p JOIN p.menuItems mi WHERE mi = :menuItem AND p.isActive = true " +
    "AND :currentDate BETWEEN p.startDate AND p.endDate"
  )
  List<Promo> findActivePromosForMenuItem(
    @Param("menuItem") MenuItem menuItem,
    @Param("currentDate") LocalDateTime currentDate
  );

  // Find promos by name (case insensitive)
  @Query(
    "SELECT p FROM Promo p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))"
  )
  List<Promo> findByNameContainingIgnoreCase(@Param("name") String name);

  // Find expired promos
  @Query("SELECT p FROM Promo p WHERE p.endDate < :currentDate")
  List<Promo> findExpiredPromos(
    @Param("currentDate") LocalDateTime currentDate
  );

  // Find promos that will expire soon
  @Query(
    "SELECT p FROM Promo p WHERE p.isActive = true AND p.endDate BETWEEN :currentDate AND :futureDate"
  )
  List<Promo> findPromosExpiringSoon(
    @Param("currentDate") LocalDateTime currentDate,
    @Param("futureDate") LocalDateTime futureDate
  );

  // Find promos with usage limit reached
  @Query(
    "SELECT p FROM Promo p WHERE p.usageLimit IS NOT NULL AND p.currentUsage >= p.usageLimit"
  )
  List<Promo> findPromosWithUsageLimitReached();

  // Find all available promos for a specific date
  @Query(
    "SELECT p FROM Promo p WHERE p.isActive = true " +
    "AND :targetDate BETWEEN p.startDate AND p.endDate " +
    "AND (p.usageLimit IS NULL OR p.currentUsage < p.usageLimit)"
  )
  List<Promo> findAvailablePromosForDate(
    @Param("targetDate") LocalDateTime targetDate
  );

  // Get promos by applicable scope
  List<Promo> findByApplicableTo(Promo.ApplicableTo applicableTo);

  // Find promos that apply to all items
  @Query(
    "SELECT p FROM Promo p WHERE p.applicableTo = 'ALL_ITEMS' AND p.isActive = true " +
    "AND :currentDate BETWEEN p.startDate AND p.endDate"
  )
  List<Promo> findActivePromosForAllItems(
    @Param("currentDate") LocalDateTime currentDate
  );

  // Get promo statistics - most used promos
  @Query("SELECT p FROM Promo p ORDER BY p.currentUsage DESC")
  List<Promo> findPromosByUsageDesc();

  // Find promos with minimum order amount
  @Query(
    "SELECT p FROM Promo p WHERE p.minimumOrderAmount IS NOT NULL " +
    "AND p.minimumOrderAmount <= :orderAmount AND p.isActive = true " +
    "AND :currentDate BETWEEN p.startDate AND p.endDate"
  )
  List<Promo> findPromosApplicableForOrderAmount(
    @Param("orderAmount") java.math.BigDecimal orderAmount,
    @Param("currentDate") LocalDateTime currentDate
  );
}
