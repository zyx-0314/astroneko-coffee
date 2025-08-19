package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  Boolean existsByEmail(String email);
  List<User> findByRole(User.Role role);
  List<User> findByIsActiveTrue();
}
