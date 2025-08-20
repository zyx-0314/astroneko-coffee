package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "first_name", nullable = false, length = 50)
  private String firstName;

  @Column(name = "last_name", nullable = false, length = 50)
  private String lastName;

  @Column(nullable = false, unique = true, length = 50)
  private String username;

  @Column(nullable = false, unique = true, length = 100)
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

  @Column(name = "phone_number", nullable = false, length = 20)
  private String phoneNumber;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

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

  public User(
    String firstName,
    String lastName,
    String username,
    String email,
    String password
  ) {
    this();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
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

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
    this.updatedAt = LocalDateTime.now();
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
    this.updatedAt = LocalDateTime.now();
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
    this.updatedAt = LocalDateTime.now();
  }

  public String getName() {
    return firstName + " " + lastName;
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

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
    this.updatedAt = LocalDateTime.now();
  }

  public Boolean getIsActive() {
    return isActive;
  }

  public void setIsActive(Boolean isActive) {
    this.isActive = isActive;
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
