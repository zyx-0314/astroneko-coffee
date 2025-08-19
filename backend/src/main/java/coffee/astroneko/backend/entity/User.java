package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, unique = true, length = 150)
  private String email;

  @Column(nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Role role = Role.CLIENT;

  @Enumerated(EnumType.STRING)
  @Column(length = 10)
  private Sex sex;

  @Column(length = 500)
  private String avatar;

  @Column(nullable = false)
  private Integer points = 0;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

  @Column(name = "shift_start", length = 10)
  private String shiftStart;

  @Column(name = "shift_end", length = 10)
  private String shiftEnd;

  @Column(name = "clock_in_time", length = 10)
  private String clockInTime;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Enum for user roles
  public enum Role {
    CLIENT,
    CASHIER,
    HELPER,
    COOK,
    BARISTA,
    MANAGER,
    OWNER,
  }

  // Enum for user sex
  public enum Sex {
    MALE,
    FEMALE,
    OTHER,
  }

  // Constructors
  public User() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  public User(String name, String email, String password) {
    this();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
    this.updatedAt = LocalDateTime.now();
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
    this.updatedAt = LocalDateTime.now();
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
    this.updatedAt = LocalDateTime.now();
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
    this.updatedAt = LocalDateTime.now();
  }

  public Sex getSex() {
    return sex;
  }

  public void setSex(Sex sex) {
    this.sex = sex;
    this.updatedAt = LocalDateTime.now();
  }

  public String getAvatar() {
    return avatar;
  }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
    this.updatedAt = LocalDateTime.now();
  }

  public Integer getPoints() {
    return points;
  }

  public void setPoints(Integer points) {
    this.points = points;
    this.updatedAt = LocalDateTime.now();
  }

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
    this.updatedAt = LocalDateTime.now();
  }

  public String getShiftStart() {
    return shiftStart;
  }

  public void setShiftStart(String shiftStart) {
    this.shiftStart = shiftStart;
    this.updatedAt = LocalDateTime.now();
  }

  public String getShiftEnd() {
    return shiftEnd;
  }

  public void setShiftEnd(String shiftEnd) {
    this.shiftEnd = shiftEnd;
    this.updatedAt = LocalDateTime.now();
  }

  public String getClockInTime() {
    return clockInTime;
  }

  public void setClockInTime(String clockInTime) {
    this.clockInTime = clockInTime;
    this.updatedAt = LocalDateTime.now();
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  // Helper method to update timestamp
  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
