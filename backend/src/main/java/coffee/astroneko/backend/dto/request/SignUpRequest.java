package coffee.astroneko.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpRequest {

  @NotBlank(message = "First name is required")
  @Size(max = 50, message = "First name must be less than 50 characters")
  private String firstName;

  @NotBlank(message = "Last name is required")
  @Size(max = 50, message = "Last name must be less than 50 characters")
  private String lastName;

  @NotBlank(message = "Email is required")
  @Email(message = "Please provide a valid email")
  @Size(max = 100, message = "Email must be less than 100 characters")
  private String email;

  @NotBlank(message = "Phone number is required")
  @Size(max = 20, message = "Phone number must be less than 20 characters")
  private String phoneNumber;

  @NotBlank(message = "Password is required")
  @Size(
    min = 6,
    max = 100,
    message = "Password must be between 6 and 100 characters"
  )
  private String password;

  private String sex; // Optional field

  // Constructors
  public SignUpRequest() {}

  public SignUpRequest(
    String firstName,
    String lastName,
    String email,
    String phoneNumber,
    String password
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }
}
