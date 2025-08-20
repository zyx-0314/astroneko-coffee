package coffee.astroneko.backend.dto.request;

import coffee.astroneko.backend.entity.EmployeeInformation.EmploymentType;
import coffee.astroneko.backend.entity.User.Role;
import coffee.astroneko.backend.entity.User.Sex;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class CreateStaffRequest {

  // User information
  @NotBlank(message = "First name is required")
  @Size(max = 50, message = "First name must not exceed 50 characters")
  private String firstName;

  @NotBlank(message = "Last name is required")
  @Size(max = 50, message = "Last name must not exceed 50 characters")
  private String lastName;

  @NotBlank(message = "Username is required")
  @Size(max = 50, message = "Username must not exceed 50 characters")
  private String username;

  @NotBlank(message = "Email is required")
  @Email(message = "Invalid email format")
  @Size(max = 100, message = "Email must not exceed 100 characters")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, message = "Password must be at least 6 characters")
  private String password;

  @NotNull(message = "Role is required")
  private Role role;

  private Sex sex;

  private String avatar;

  // Employee information
  @NotBlank(message = "Employee ID is required")
  @Size(max = 20, message = "Employee ID must not exceed 20 characters")
  private String employeeId;

  @NotNull(message = "Hire date is required")
  @PastOrPresent(message = "Hire date cannot be in the future")
  private LocalDate hireDate;

  @NotNull(message = "Employment type is required")
  private EmploymentType employmentType;

  @DecimalMin(
    value = "0.0",
    inclusive = false,
    message = "Salary must be greater than 0"
  )
  @Digits(integer = 10, fraction = 2, message = "Invalid salary format")
  private BigDecimal salary;

  @DecimalMin(
    value = "0.0",
    inclusive = false,
    message = "Hourly rate must be greater than 0"
  )
  @Digits(integer = 8, fraction = 2, message = "Invalid hourly rate format")
  private BigDecimal hourlyRate;

  @NotBlank(message = "Emergency contact name is required")
  @Size(
    max = 100,
    message = "Emergency contact name must not exceed 100 characters"
  )
  private String emergencyContactName;

  @NotBlank(message = "Emergency contact phone is required")
  @Size(
    max = 20,
    message = "Emergency contact phone must not exceed 20 characters"
  )
  private String emergencyContactPhone;

  @NotBlank(message = "Address is required")
  private String address;

  @NotBlank(message = "Phone is required")
  @Size(max = 20, message = "Phone must not exceed 20 characters")
  private String phone;

  @NotNull(message = "Birth date is required")
  @Past(message = "Birth date must be in the past")
  private LocalDate birthDate;

  @NotBlank(message = "Social security number is required")
  @Size(max = 20, message = "SSN must not exceed 20 characters")
  private String socialSecurityNumber;

  @NotBlank(message = "Bank account number is required")
  @Size(max = 30, message = "Bank account number must not exceed 30 characters")
  private String bankAccountNumber;

  @NotBlank(message = "Bank routing number is required")
  @Size(max = 30, message = "Bank routing number must not exceed 30 characters")
  private String bankRoutingNumber;

  @DecimalMin(value = "0.0", message = "Performance rating must be at least 0")
  @DecimalMax(value = "5.0", message = "Performance rating must not exceed 5.0")
  @Digits(
    integer = 1,
    fraction = 2,
    message = "Invalid performance rating format"
  )
  private BigDecimal performanceRating;

  private LocalDate lastPerformanceReview;
  private LocalDate nextPerformanceReview;
  private String notes;

  @NotBlank(message = "Position is required")
  @Size(max = 50, message = "Position must not exceed 50 characters")
  private String position;

  @NotBlank(message = "Department is required")
  @Size(max = 50, message = "Department must not exceed 50 characters")
  private String department;

  @NotNull(message = "Shift start time is required")
  private LocalTime shiftStart;

  @NotNull(message = "Shift end time is required")
  private LocalTime shiftEnd;

  @Min(value = 0, message = "Sick days total must be non-negative")
  private Integer sickDaysTotal = 0;

  @Min(value = 0, message = "Vacation days total must be non-negative")
  private Integer vacationDaysTotal = 0;

  // Constructors
  public CreateStaffRequest() {}

  // Getters and Setters
  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public Sex getSex() {
    return sex;
  }

  public void setSex(Sex sex) {
    this.sex = sex;
  }

  public String getAvatar() {
    return avatar;
  }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public LocalDate getHireDate() {
    return hireDate;
  }

  public void setHireDate(LocalDate hireDate) {
    this.hireDate = hireDate;
  }

  public EmploymentType getEmploymentType() {
    return employmentType;
  }

  public void setEmploymentType(EmploymentType employmentType) {
    this.employmentType = employmentType;
  }

  public BigDecimal getSalary() {
    return salary;
  }

  public void setSalary(BigDecimal salary) {
    this.salary = salary;
  }

  public BigDecimal getHourlyRate() {
    return hourlyRate;
  }

  public void setHourlyRate(BigDecimal hourlyRate) {
    this.hourlyRate = hourlyRate;
  }

  public String getEmergencyContactName() {
    return emergencyContactName;
  }

  public void setEmergencyContactName(String emergencyContactName) {
    this.emergencyContactName = emergencyContactName;
  }

  public String getEmergencyContactPhone() {
    return emergencyContactPhone;
  }

  public void setEmergencyContactPhone(String emergencyContactPhone) {
    this.emergencyContactPhone = emergencyContactPhone;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public LocalDate getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
  }

  public String getSocialSecurityNumber() {
    return socialSecurityNumber;
  }

  public void setSocialSecurityNumber(String socialSecurityNumber) {
    this.socialSecurityNumber = socialSecurityNumber;
  }

  public String getBankAccountNumber() {
    return bankAccountNumber;
  }

  public void setBankAccountNumber(String bankAccountNumber) {
    this.bankAccountNumber = bankAccountNumber;
  }

  public String getBankRoutingNumber() {
    return bankRoutingNumber;
  }

  public void setBankRoutingNumber(String bankRoutingNumber) {
    this.bankRoutingNumber = bankRoutingNumber;
  }

  public BigDecimal getPerformanceRating() {
    return performanceRating;
  }

  public void setPerformanceRating(BigDecimal performanceRating) {
    this.performanceRating = performanceRating;
  }

  public LocalDate getLastPerformanceReview() {
    return lastPerformanceReview;
  }

  public void setLastPerformanceReview(LocalDate lastPerformanceReview) {
    this.lastPerformanceReview = lastPerformanceReview;
  }

  public LocalDate getNextPerformanceReview() {
    return nextPerformanceReview;
  }

  public void setNextPerformanceReview(LocalDate nextPerformanceReview) {
    this.nextPerformanceReview = nextPerformanceReview;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

  public LocalTime getShiftStart() {
    return shiftStart;
  }

  public void setShiftStart(LocalTime shiftStart) {
    this.shiftStart = shiftStart;
  }

  public LocalTime getShiftEnd() {
    return shiftEnd;
  }

  public void setShiftEnd(LocalTime shiftEnd) {
    this.shiftEnd = shiftEnd;
  }

  public Integer getSickDaysTotal() {
    return sickDaysTotal;
  }

  public void setSickDaysTotal(Integer sickDaysTotal) {
    this.sickDaysTotal = sickDaysTotal;
  }

  public Integer getVacationDaysTotal() {
    return vacationDaysTotal;
  }

  public void setVacationDaysTotal(Integer vacationDaysTotal) {
    this.vacationDaysTotal = vacationDaysTotal;
  }
}
