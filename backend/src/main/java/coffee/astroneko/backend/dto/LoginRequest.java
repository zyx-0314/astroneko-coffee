package coffee.astroneko.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

  @NotBlank(message = "Email is required")
  @Email(message = "Please provide a valid email")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, message = "Password must be at least 6 characters")
  private String password;

  // Constructors
  public LoginRequest() {}

  public LoginRequest(String email, String password) {
    this.email = email;
    this.password = password;
  }

  // Getters and Setters
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
}
