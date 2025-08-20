package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
