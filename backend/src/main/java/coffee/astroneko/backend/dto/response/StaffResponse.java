package coffee.astroneko.backend.dto.response;

import coffee.astroneko.backend.entity.EmployeeInformation.EmploymentType;
import coffee.astroneko.backend.entity.User.Role;
import coffee.astroneko.backend.entity.User.Sex;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class StaffResponse {

  // User information
  private Long id;
  private Long userId;
  private String firstName;
  private String lastName;
  private String username;
  private String email;
  private Role role;
  private Sex sex;
  private String avatar;
  private Boolean isUserActive;

  // Employee information
  private String employeeId;
  private LocalDate hireDate;
  private EmploymentType employmentType;
  private BigDecimal salary;
  private BigDecimal hourlyRate;
  private String emergencyContactName;
  private String emergencyContactPhone;
  private String address;
  private String phone;
  private LocalDate birthDate;
  private String socialSecurityNumber; // This will be masked in actual implementation
  private String bankAccountNumber; // This will be masked in actual implementation
  private String bankRoutingNumber; // This will be masked in actual implementation
  private BigDecimal performanceRating;
  private LocalDate lastPerformanceReview;
  private LocalDate nextPerformanceReview;
  private String notes;
  private String position;
  private String department;
  private LocalTime shiftStart;
  private LocalTime shiftEnd;
  private Integer sickDaysTotal;
  private Integer sickDaysUsed;
  private Integer vacationDaysTotal;
  private Integer vacationDaysUsed;
  private Boolean isActive;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // Constructors
  public StaffResponse() {}

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

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

  public Boolean getIsUserActive() {
    return isUserActive;
  }

  public void setIsUserActive(Boolean isUserActive) {
    this.isUserActive = isUserActive;
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

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
