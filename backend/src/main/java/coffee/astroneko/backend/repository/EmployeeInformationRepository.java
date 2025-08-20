package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.EmployeeInformation;
import coffee.astroneko.backend.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeInformationRepository
  extends JpaRepository<EmployeeInformation, Long> {
  Optional<EmployeeInformation> findByEmployeeId(String employeeId);

  Optional<EmployeeInformation> findByUserId(Long userId);

  Optional<EmployeeInformation> findByUser(User user);

  List<EmployeeInformation> findByIsActiveTrue();

  List<EmployeeInformation> findByIsActiveFalse();

  List<EmployeeInformation> findByDepartment(String department);

  List<EmployeeInformation> findByPosition(String position);

  boolean existsByEmployeeId(String employeeId);

  @Query("SELECT e FROM EmployeeInformation e WHERE e.user.role IN :roles")
  List<EmployeeInformation> findByUserRoles(
    @Param("roles") List<User.Role> roles
  );

  @Query("SELECT e FROM EmployeeInformation e WHERE e.user.role = :role")
  List<EmployeeInformation> findByUserRole(@Param("role") User.Role role);

  @Query(
    "SELECT e FROM EmployeeInformation e WHERE e.isActive = true AND e.user.isActive = true"
  )
  List<EmployeeInformation> findAllActiveStaff();
}
