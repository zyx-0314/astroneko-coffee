package coffee.astroneko.backend.service;

import coffee.astroneko.backend.dto.request.CreateStaffRequest;
import coffee.astroneko.backend.dto.request.UpdateStaffRequest;
import coffee.astroneko.backend.dto.response.StaffResponse;
import coffee.astroneko.backend.entity.EmployeeInformation;
import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.repository.EmployeeInformationRepository;
import coffee.astroneko.backend.repository.UserRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StaffService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EmployeeInformationRepository employeeInformationRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public StaffResponse createStaff(CreateStaffRequest request) {
    // Check if email, username, or employee ID already exists
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    if (userRepository.existsByUsername(request.getUsername())) {
      throw new RuntimeException("Username already exists");
    }

    if (
      employeeInformationRepository.existsByEmployeeId(request.getEmployeeId())
    ) {
      throw new RuntimeException("Employee ID already exists");
    }

    // Create user first
    User user = new User();
    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(request.getRole());
    user.setSex(request.getSex());
    user.setAvatar(request.getAvatar());
    user.setPhoneNumber(request.getPhone()); // Set phone number on User entity
    user.setIsActive(true);

    user = userRepository.save(user);

    // Create employee information
    EmployeeInformation employeeInfo = new EmployeeInformation();
    employeeInfo.setUser(user);
    employeeInfo.setEmployeeId(request.getEmployeeId());
    employeeInfo.setHireDate(request.getHireDate());
    employeeInfo.setEmploymentType(request.getEmploymentType());
    employeeInfo.setSalary(request.getSalary());
    employeeInfo.setHourlyRate(request.getHourlyRate());
    employeeInfo.setEmergencyContactName(request.getEmergencyContactName());
    employeeInfo.setEmergencyContactPhone(request.getEmergencyContactPhone());
    employeeInfo.setAddress(request.getAddress());
    employeeInfo.setPhone(request.getPhone());
    employeeInfo.setBirthDate(request.getBirthDate());
    employeeInfo.setSocialSecurityNumber(request.getSocialSecurityNumber());
    employeeInfo.setBankAccountNumber(request.getBankAccountNumber());
    employeeInfo.setBankRoutingNumber(request.getBankRoutingNumber());
    employeeInfo.setPerformanceRating(request.getPerformanceRating());
    employeeInfo.setLastPerformanceReview(request.getLastPerformanceReview());
    employeeInfo.setNextPerformanceReview(request.getNextPerformanceReview());
    employeeInfo.setNotes(request.getNotes());
    employeeInfo.setPosition(request.getPosition());
    employeeInfo.setDepartment(request.getDepartment());
    employeeInfo.setShiftStart(request.getShiftStart());
    employeeInfo.setShiftEnd(request.getShiftEnd());
    employeeInfo.setSickDaysTotal(request.getSickDaysTotal());
    employeeInfo.setVacationDaysTotal(request.getVacationDaysTotal());
    employeeInfo.setIsActive(true);

    employeeInfo = employeeInformationRepository.save(employeeInfo);

    return mapToStaffResponse(employeeInfo);
  }

  @Transactional(readOnly = true)
  public List<StaffResponse> getAllStaff() {
    // Get all non-client roles (exclude CLIENT role)
    List<User.Role> staffRoles = Arrays.asList(
      User.Role.CASHIER,
      User.Role.HELPER,
      User.Role.COOK,
      User.Role.BARISTA,
      User.Role.MANAGER,
      User.Role.OWNER
    );
    List<EmployeeInformation> employees =
      employeeInformationRepository.findByUserRoles(staffRoles);
    return employees
      .stream()
      .map(this::mapToStaffResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<StaffResponse> getAllActiveStaff() {
    // Get all active non-client roles (exclude CLIENT role)
    List<User.Role> staffRoles = Arrays.asList(
      User.Role.CASHIER,
      User.Role.HELPER,
      User.Role.COOK,
      User.Role.BARISTA,
      User.Role.MANAGER,
      User.Role.OWNER
    );
    List<EmployeeInformation> employees =
      employeeInformationRepository.findByUserRoles(staffRoles);
    return employees
      .stream()
      .filter(emp -> emp.getIsActive() && emp.getUser().getIsActive())
      .map(this::mapToStaffResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public Optional<StaffResponse> getStaffById(Long id) {
    Optional<EmployeeInformation> employee =
      employeeInformationRepository.findById(id);
    return employee.map(this::mapToStaffResponse);
  }

  @Transactional(readOnly = true)
  public Optional<StaffResponse> getStaffByEmployeeId(String employeeId) {
    Optional<EmployeeInformation> employee =
      employeeInformationRepository.findByEmployeeId(employeeId);
    return employee.map(this::mapToStaffResponse);
  }

  @Transactional(readOnly = true)
  public Optional<StaffResponse> getStaffByUserId(Long userId) {
    Optional<EmployeeInformation> employee =
      employeeInformationRepository.findByUserId(userId);
    return employee.map(this::mapToStaffResponse);
  }

  public StaffResponse updateStaff(Long id, UpdateStaffRequest request) {
    EmployeeInformation employeeInfo = employeeInformationRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Staff member not found"));

    User user = employeeInfo.getUser();

    // Update user information if provided
    if (request.getFirstName() != null) {
      user.setFirstName(request.getFirstName());
    }
    if (request.getLastName() != null) {
      user.setLastName(request.getLastName());
    }
    if (request.getUsername() != null) {
      // Check if username is already taken by another user
      Optional<User> existingUser = userRepository.findByUsername(
        request.getUsername()
      );
      if (
        existingUser.isPresent() &&
        !existingUser.get().getId().equals(user.getId())
      ) {
        throw new RuntimeException("Username already exists");
      }
      user.setUsername(request.getUsername());
    }
    if (request.getEmail() != null) {
      // Check if email is already taken by another user
      Optional<User> existingUser = userRepository.findByEmail(
        request.getEmail()
      );
      if (
        existingUser.isPresent() &&
        !existingUser.get().getId().equals(user.getId())
      ) {
        throw new RuntimeException("Email already exists");
      }
      user.setEmail(request.getEmail());
    }
    if (request.getRole() != null) {
      user.setRole(request.getRole());
    }
    if (request.getSex() != null) {
      user.setSex(request.getSex());
    }
    if (request.getAvatar() != null) {
      user.setAvatar(request.getAvatar());
    }
    if (request.getPhone() != null) {
      user.setPhoneNumber(request.getPhone()); // Update phone number on User entity
    }

    user = userRepository.save(user);

    // Update employee information if provided
    if (request.getEmployeeId() != null) {
      // Check if employee ID is already taken
      if (
        employeeInformationRepository.existsByEmployeeId(
          request.getEmployeeId()
        )
      ) {
        Optional<EmployeeInformation> existing =
          employeeInformationRepository.findByEmployeeId(
            request.getEmployeeId()
          );
        if (
          existing.isPresent() &&
          !existing.get().getId().equals(employeeInfo.getId())
        ) {
          throw new RuntimeException("Employee ID already exists");
        }
      }
      employeeInfo.setEmployeeId(request.getEmployeeId());
    }
    if (request.getHireDate() != null) {
      employeeInfo.setHireDate(request.getHireDate());
    }
    if (request.getEmploymentType() != null) {
      employeeInfo.setEmploymentType(request.getEmploymentType());
    }
    if (request.getSalary() != null) {
      employeeInfo.setSalary(request.getSalary());
    }
    if (request.getHourlyRate() != null) {
      employeeInfo.setHourlyRate(request.getHourlyRate());
    }
    if (request.getEmergencyContactName() != null) {
      employeeInfo.setEmergencyContactName(request.getEmergencyContactName());
    }
    if (request.getEmergencyContactPhone() != null) {
      employeeInfo.setEmergencyContactPhone(request.getEmergencyContactPhone());
    }
    if (request.getAddress() != null) {
      employeeInfo.setAddress(request.getAddress());
    }
    if (request.getPhone() != null) {
      employeeInfo.setPhone(request.getPhone());
    }
    if (request.getBirthDate() != null) {
      employeeInfo.setBirthDate(request.getBirthDate());
    }
    if (request.getSocialSecurityNumber() != null) {
      employeeInfo.setSocialSecurityNumber(request.getSocialSecurityNumber());
    }
    if (request.getBankAccountNumber() != null) {
      employeeInfo.setBankAccountNumber(request.getBankAccountNumber());
    }
    if (request.getBankRoutingNumber() != null) {
      employeeInfo.setBankRoutingNumber(request.getBankRoutingNumber());
    }
    if (request.getPerformanceRating() != null) {
      employeeInfo.setPerformanceRating(request.getPerformanceRating());
    }
    if (request.getLastPerformanceReview() != null) {
      employeeInfo.setLastPerformanceReview(request.getLastPerformanceReview());
    }
    if (request.getNextPerformanceReview() != null) {
      employeeInfo.setNextPerformanceReview(request.getNextPerformanceReview());
    }
    if (request.getNotes() != null) {
      employeeInfo.setNotes(request.getNotes());
    }
    if (request.getPosition() != null) {
      employeeInfo.setPosition(request.getPosition());
    }
    if (request.getDepartment() != null) {
      employeeInfo.setDepartment(request.getDepartment());
    }
    if (request.getShiftStart() != null) {
      employeeInfo.setShiftStart(request.getShiftStart());
    }
    if (request.getShiftEnd() != null) {
      employeeInfo.setShiftEnd(request.getShiftEnd());
    }
    if (request.getSickDaysTotal() != null) {
      employeeInfo.setSickDaysTotal(request.getSickDaysTotal());
    }
    if (request.getSickDaysUsed() != null) {
      employeeInfo.setSickDaysUsed(request.getSickDaysUsed());
    }
    if (request.getVacationDaysTotal() != null) {
      employeeInfo.setVacationDaysTotal(request.getVacationDaysTotal());
    }
    if (request.getVacationDaysUsed() != null) {
      employeeInfo.setVacationDaysUsed(request.getVacationDaysUsed());
    }
    if (request.getIsActive() != null) {
      employeeInfo.setIsActive(request.getIsActive());
    }

    employeeInfo = employeeInformationRepository.save(employeeInfo);

    return mapToStaffResponse(employeeInfo);
  }

  public void deleteStaff(Long id) {
    EmployeeInformation employeeInfo = employeeInformationRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Staff member not found"));

    // Delete employee information first (due to foreign key constraint)
    employeeInformationRepository.delete(employeeInfo);

    // Then delete the user
    userRepository.delete(employeeInfo.getUser());
  }

  public void deactivateStaff(Long id) {
    EmployeeInformation employeeInfo = employeeInformationRepository
      .findById(id)
      .orElseThrow(() -> new RuntimeException("Staff member not found"));

    // Deactivate both employee information and user
    employeeInfo.setIsActive(false);
    employeeInfo.getUser().setIsActive(false);

    employeeInformationRepository.save(employeeInfo);
    userRepository.save(employeeInfo.getUser());
  }

  @Transactional(readOnly = true)
  public List<StaffResponse> getStaffByDepartment(String department) {
    List<EmployeeInformation> employees =
      employeeInformationRepository.findByDepartment(department);
    return employees
      .stream()
      .map(this::mapToStaffResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<StaffResponse> getStaffByRole(User.Role role) {
    List<EmployeeInformation> employees =
      employeeInformationRepository.findByUserRole(role);
    return employees
      .stream()
      .map(this::mapToStaffResponse)
      .collect(Collectors.toList());
  }

  private StaffResponse mapToStaffResponse(EmployeeInformation employeeInfo) {
    User user = employeeInfo.getUser();

    StaffResponse response = new StaffResponse();
    response.setId(employeeInfo.getId());
    response.setUserId(user.getId());
    response.setFirstName(user.getFirstName());
    response.setLastName(user.getLastName());
    response.setUsername(user.getUsername());
    response.setEmail(user.getEmail());
    response.setRole(user.getRole());
    response.setSex(user.getSex());
    response.setAvatar(user.getAvatar());
    response.setIsUserActive(user.getIsActive());

    response.setEmployeeId(employeeInfo.getEmployeeId());
    response.setHireDate(employeeInfo.getHireDate());
    response.setEmploymentType(employeeInfo.getEmploymentType());
    response.setSalary(employeeInfo.getSalary());
    response.setHourlyRate(employeeInfo.getHourlyRate());
    response.setEmergencyContactName(employeeInfo.getEmergencyContactName());
    response.setEmergencyContactPhone(employeeInfo.getEmergencyContactPhone());
    response.setAddress(employeeInfo.getAddress());
    response.setPhone(employeeInfo.getPhone());
    response.setBirthDate(employeeInfo.getBirthDate());

    // Mask sensitive information in response
    response.setSocialSecurityNumber(
      maskSensitiveData(employeeInfo.getSocialSecurityNumber(), 4)
    );
    response.setBankAccountNumber(
      maskSensitiveData(employeeInfo.getBankAccountNumber(), 4)
    );
    response.setBankRoutingNumber(
      maskSensitiveData(employeeInfo.getBankRoutingNumber(), 4)
    );

    response.setPerformanceRating(employeeInfo.getPerformanceRating());
    response.setLastPerformanceReview(employeeInfo.getLastPerformanceReview());
    response.setNextPerformanceReview(employeeInfo.getNextPerformanceReview());
    response.setNotes(employeeInfo.getNotes());
    response.setPosition(employeeInfo.getPosition());
    response.setDepartment(employeeInfo.getDepartment());
    response.setShiftStart(employeeInfo.getShiftStart());
    response.setShiftEnd(employeeInfo.getShiftEnd());
    response.setSickDaysTotal(employeeInfo.getSickDaysTotal());
    response.setSickDaysUsed(employeeInfo.getSickDaysUsed());
    response.setVacationDaysTotal(employeeInfo.getVacationDaysTotal());
    response.setVacationDaysUsed(employeeInfo.getVacationDaysUsed());
    response.setIsActive(employeeInfo.getIsActive());
    response.setCreatedAt(employeeInfo.getCreatedAt());
    response.setUpdatedAt(employeeInfo.getUpdatedAt());

    return response;
  }

  private String maskSensitiveData(String data, int visibleCharacters) {
    if (data == null || data.length() <= visibleCharacters) {
      return "*****";
    }

    String masked = "*".repeat(data.length() - visibleCharacters);
    return masked + data.substring(data.length() - visibleCharacters);
  }
}
