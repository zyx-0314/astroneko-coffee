package coffee.astroneko.backend.dto;

import coffee.astroneko.backend.entity.EmployeeInformation.EmploymentType;
import coffee.astroneko.backend.entity.User.Role;
import coffee.astroneko.backend.entity.User.Sex;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class UpdateStaffRequest {

  // User information (all optional for updates)
  @Size(max = 50, message = "First name must not exceed 50 characters")
  private String firstName;

  @Size(max = 50, message = "Last name must not exceed 50 characters")
  private String lastName;

  @Size(max = 50, message = "Username must not exceed 50 characters")
  private String username;

  @Email(message = "Invalid email format")
  @Size(max = 100, message = "Email must not exceed 100 characters")
  private String email;

  private Role role;
  private Sex sex;
  private String avatar;

  // Employee information (all optional for updates)
  @Size(max = 20, message = "Employee ID must not exceed 20 characters")
  private String employeeId;

  @PastOrPresent(message = "Hire date cannot be in the future")
  private LocalDate hireDate;

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

  @Size(
    max = 100,
    message = "Emergency contact name must not exceed 100 characters"
  )
  private String emergencyContactName;

  @Size(
    max = 20,
    message = "Emergency contact phone must not exceed 20 characters"
  )
  private String emergencyContactPhone;

  private String address;

  @Size(max = 20, message = "Phone must not exceed 20 characters")
  private String phone;

  @Past(message = "Birth date must be in the past")
  private LocalDate birthDate;

  @Size(max = 20, message = "SSN must not exceed 20 characters")
  private String socialSecurityNumber;

  @Size(max = 30, message = "Bank account number must not exceed 30 characters")
  private String bankAccountNumber;

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

  @Size(max = 50, message = "Position must not exceed 50 characters")
  private String position;

  @Size(max = 50, message = "Department must not exceed 50 characters")
  private String department;

  private LocalTime shiftStart;
  private LocalTime shiftEnd;

  @Min(value = 0, message = "Sick days total must be non-negative")
  private Integer sickDaysTotal;

  @Min(value = 0, message = "Sick days used must be non-negative")
  private Integer sickDaysUsed;

  @Min(value = 0, message = "Vacation days total must be non-negative")
  private Integer vacationDaysTotal;

  @Min(value = 0, message = "Vacation days used must be non-negative")
  private Integer vacationDaysUsed;

  private Boolean isActive;

  // Constructors
  public UpdateStaffRequest() {}

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

  public Integer getSickDaysUsed() {
    return sickDaysUsed;
  }

  public void setSickDaysUsed(Integer sickDaysUsed) {
    this.sickDaysUsed = sickDaysUsed;
  }

  public Integer getVacationDaysTotal() {
    return vacationDaysTotal;
  }

  public void setVacationDaysTotal(Integer vacationDaysTotal) {
    this.vacationDaysTotal = vacationDaysTotal;
  }

  public Integer getVacationDaysUsed() {
    return vacationDaysUsed;
  }

  public void setVacationDaysUsed(Integer vacationDaysUsed) {
    this.vacationDaysUsed = vacationDaysUsed;
  }

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
  }
}
