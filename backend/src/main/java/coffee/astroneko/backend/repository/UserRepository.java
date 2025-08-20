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
  Optional<User> findByEmail(String email);
  Optional<User> findByUsername(String username);
  Boolean existsByEmail(String email);
  Boolean existsByUsername(String username);
  List<User> findByRole(User.Role role);
  List<User> findByIsActiveTrue();
  List<User> findByRoleAndIsActiveTrue(User.Role role);
  Optional<User> findByIdAndRole(Long id, User.Role role);
  Optional<User> findByEmailAndRole(String email, User.Role role);

  // Pagination support
  Page<User> findByRole(User.Role role, Pageable pageable);
  Page<User> findByRoleAndIsActiveTrue(User.Role role, Pageable pageable);

  // Search support
  @Query(
    "SELECT u FROM User u WHERE u.role = :role AND " +
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
    "SELECT u FROM User u WHERE u.role = :role AND u.isActive = true AND " +
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
}
