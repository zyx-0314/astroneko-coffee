package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  // Method name variations for consistency with Spring Data naming conventions
  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.id = :id")
  Optional<User> findByIdAndIsDeletedFalse(@Param("id") Long id);

  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.email = :email")
  Optional<User> findByEmailAndIsDeletedFalse(@Param("email") String email);

  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role")
  List<User> findByRoleAndIsDeletedFalse(@Param("role") User.Role role);

  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.isActive = true")
  List<User> findByIsActiveTrueAndIsDeletedFalse();

  // Basic queries including soft delete check
  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.email = :email")
  Optional<User> findByEmail(@Param("email") String email);

  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.username = :username"
  )
  Optional<User> findByUsername(@Param("username") String username);

  @Query(
    "SELECT COUNT(u) > 0 FROM User u WHERE u.isDeleted = false AND u.email = :email"
  )
  Boolean existsByEmail(@Param("email") String email);

  @Query(
    "SELECT COUNT(u) > 0 FROM User u WHERE u.isDeleted = false AND u.username = :username"
  )
  Boolean existsByUsername(@Param("username") String username);

  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role")
  List<User> findByRole(@Param("role") User.Role role);

  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.isActive = true")
  List<User> findByIsActiveTrue();

  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role AND u.isActive = true"
  )
  List<User> findByRoleAndIsActiveTrue(@Param("role") User.Role role);

  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.id = :id AND u.role = :role"
  )
  Optional<User> findByIdAndRole(
    @Param("id") Long id,
    @Param("role") User.Role role
  );

  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.email = :email AND u.role = :role"
  )
  Optional<User> findByEmailAndRole(
    @Param("email") String email,
    @Param("role") User.Role role
  );

  // Pagination support with soft delete check
  @Query("SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role")
  Page<User> findByRole(@Param("role") User.Role role, Pageable pageable);

  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role AND u.isActive = true"
  )
  Page<User> findByRoleAndIsActiveTrue(
    @Param("role") User.Role role,
    Pageable pageable
  );

  // Search support with soft delete check
  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role AND " +
    "(LOWER(u.firstName) LIKE :searchTerm OR " +
    "LOWER(u.lastName) LIKE :searchTerm OR " +
    "LOWER(u.email) LIKE :searchTerm OR " +
    "u.phoneNumber LIKE :searchTerm)"
  )
  Page<User> findByRoleAndSearchTerm(
    @Param("role") User.Role role,
    @Param("searchTerm") String searchTerm,
    Pageable pageable
  );

  @Query(
    "SELECT u FROM User u WHERE u.isDeleted = false AND u.role = :role AND u.isActive = true AND " +
    "(LOWER(u.firstName) LIKE :searchTerm OR " +
    "LOWER(u.lastName) LIKE :searchTerm OR " +
    "LOWER(u.email) LIKE :searchTerm OR " +
    "u.phoneNumber LIKE :searchTerm)"
  )
  Page<User> findByRoleAndIsActiveTrueAndSearchTerm(
    @Param("role") User.Role role,
    @Param("searchTerm") String searchTerm,
    Pageable pageable
  );

  // Additional soft delete utility methods
  @Query("SELECT u FROM User u WHERE u.isDeleted = false")
  List<User> findAllNotDeleted();

  @Query("SELECT u FROM User u WHERE u.isDeleted = false")
  Page<User> findAllNotDeleted(Pageable pageable);
}
