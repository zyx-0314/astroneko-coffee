package coffee.astroneko.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpRequest {

  @NotBlank(message = "Name is required")
  @Size(max = 100, message = "Name must be less than 100 characters")
  private String name;

  @NotBlank(message = "Email is required")
  @Email(message = "Please provide a valid email")
  @Size(max = 150, message = "Email must be less than 150 characters")
  private String email;

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

  public SignUpRequest(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Getters and Setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }
}
