package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "employee_information")
public class EmployeeInformation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "employee_id", nullable = false, unique = true, length = 20)
  private String employeeId;

  @Column(name = "hire_date", nullable = false)
  private LocalDate hireDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "employment_type", nullable = false, length = 20)
  private EmploymentType employmentType;

  @Column(name = "salary", precision = 12, scale = 2)
  private BigDecimal salary;

  @Column(name = "hourly_rate", precision = 10, scale = 2)
  private BigDecimal hourlyRate;

  @Column(name = "emergency_contact_name", nullable = false, length = 100)
  private String emergencyContactName;

  @Column(name = "emergency_contact_phone", nullable = false, length = 20)
  private String emergencyContactPhone;

  @Column(name = "address", nullable = false, columnDefinition = "TEXT")
  private String address;

  @Column(name = "phone", nullable = false, length = 20)
  private String phone;

  @Column(name = "birth_date", nullable = false)
  private LocalDate birthDate;

  @Column(name = "social_security_number", nullable = false, length = 20)
  private String socialSecurityNumber;

  @Column(name = "bank_account_number", nullable = false, length = 30)
  private String bankAccountNumber;

  @Column(name = "bank_routing_number", nullable = false, length = 30)
  private String bankRoutingNumber;

  @Column(name = "performance_rating", precision = 3, scale = 2)
  private BigDecimal performanceRating;

  @Column(name = "last_performance_review")
  private LocalDate lastPerformanceReview;

  @Column(name = "next_performance_review")
  private LocalDate nextPerformanceReview;

  @Column(name = "notes", columnDefinition = "TEXT")
  private String notes;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

  @Column(name = "position", nullable = false, length = 50)
  private String position;

  @Column(name = "department", nullable = false, length = 50)
  private String department;

  @Column(name = "shift_start", nullable = false)
  private LocalTime shiftStart;

  @Column(name = "shift_end", nullable = false)
  private LocalTime shiftEnd;

  @Column(name = "sick_days_total")
  private Integer sickDaysTotal = 0;

  @Column(name = "sick_days_used")
  private Integer sickDaysUsed = 0;

  @Column(name = "vacation_days_total")
  private Integer vacationDaysTotal = 0;

  @Column(name = "vacation_days_used")
  private Integer vacationDaysUsed = 0;

  // Enums
  public enum EmploymentType {
    FULL_TIME,
    PART_TIME,
    CONTRACT,
    INTERN,
  }

  // Constructors
  public EmployeeInformation() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
    this.updatedAt = LocalDateTime.now();
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalDate getHireDate() {
    return hireDate;
  }

  public void setHireDate(LocalDate hireDate) {
    this.hireDate = hireDate;
    this.updatedAt = LocalDateTime.now();
  }

  public EmploymentType getEmploymentType() {
    return employmentType;
  }

  public void setEmploymentType(EmploymentType employmentType) {
    this.employmentType = employmentType;
    this.updatedAt = LocalDateTime.now();
  }

  public BigDecimal getSalary() {
    return salary;
  }

  public void setSalary(BigDecimal salary) {
    this.salary = salary;
    this.updatedAt = LocalDateTime.now();
  }

  public BigDecimal getHourlyRate() {
    return hourlyRate;
  }

  public void setHourlyRate(BigDecimal hourlyRate) {
    this.hourlyRate = hourlyRate;
    this.updatedAt = LocalDateTime.now();
  }

  public String getEmergencyContactName() {
    return emergencyContactName;
  }

  public void setEmergencyContactName(String emergencyContactName) {
    this.emergencyContactName = emergencyContactName;
    this.updatedAt = LocalDateTime.now();
  }

  public String getEmergencyContactPhone() {
    return emergencyContactPhone;
  }

  public void setEmergencyContactPhone(String emergencyContactPhone) {
    this.emergencyContactPhone = emergencyContactPhone;
    this.updatedAt = LocalDateTime.now();
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
    this.updatedAt = LocalDateTime.now();
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalDate getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
    this.updatedAt = LocalDateTime.now();
  }

  public String getSocialSecurityNumber() {
    return socialSecurityNumber;
  }

  public void setSocialSecurityNumber(String socialSecurityNumber) {
    this.socialSecurityNumber = socialSecurityNumber;
    this.updatedAt = LocalDateTime.now();
  }

  public String getBankAccountNumber() {
    return bankAccountNumber;
  }

  public void setBankAccountNumber(String bankAccountNumber) {
    this.bankAccountNumber = bankAccountNumber;
    this.updatedAt = LocalDateTime.now();
  }

  public String getBankRoutingNumber() {
    return bankRoutingNumber;
  }

  public void setBankRoutingNumber(String bankRoutingNumber) {
    this.bankRoutingNumber = bankRoutingNumber;
    this.updatedAt = LocalDateTime.now();
  }

  public BigDecimal getPerformanceRating() {
    return performanceRating;
  }

  public void setPerformanceRating(BigDecimal performanceRating) {
    this.performanceRating = performanceRating;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalDate getLastPerformanceReview() {
    return lastPerformanceReview;
  }

  public void setLastPerformanceReview(LocalDate lastPerformanceReview) {
    this.lastPerformanceReview = lastPerformanceReview;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalDate getNextPerformanceReview() {
    return nextPerformanceReview;
  }

  public void setNextPerformanceReview(LocalDate nextPerformanceReview) {
    this.nextPerformanceReview = nextPerformanceReview;
    this.updatedAt = LocalDateTime.now();
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
    this.updatedAt = LocalDateTime.now();
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
    this.updatedAt = LocalDateTime.now();
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalTime getShiftStart() {
    return shiftStart;
  }

  public void setShiftStart(LocalTime shiftStart) {
    this.shiftStart = shiftStart;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalTime getShiftEnd() {
    return shiftEnd;
  }

  public void setShiftEnd(LocalTime shiftEnd) {
    this.shiftEnd = shiftEnd;
    this.updatedAt = LocalDateTime.now();
  }

  public Integer getSickDaysTotal() {
    return sickDaysTotal;
  }

  public void setSickDaysTotal(Integer sickDaysTotal) {
    this.sickDaysTotal = sickDaysTotal;
    this.updatedAt = LocalDateTime.now();
  }

  public Integer getSickDaysUsed() {
    return sickDaysUsed;
  }

  public void setSickDaysUsed(Integer sickDaysUsed) {
    this.sickDaysUsed = sickDaysUsed;
    this.updatedAt = LocalDateTime.now();
  }

  public Integer getVacationDaysTotal() {
    return vacationDaysTotal;
  }

  public void setVacationDaysTotal(Integer vacationDaysTotal) {
    this.vacationDaysTotal = vacationDaysTotal;
    this.updatedAt = LocalDateTime.now();
  }

  public Integer getVacationDaysUsed() {
    return vacationDaysUsed;
  }

  public void setVacationDaysUsed(Integer vacationDaysUsed) {
    this.vacationDaysUsed = vacationDaysUsed;
    this.updatedAt = LocalDateTime.now();
  }

  // Helper method to update timestamp
  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
