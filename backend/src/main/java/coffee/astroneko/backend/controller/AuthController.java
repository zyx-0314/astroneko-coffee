package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.dto.AuthResponse;
import coffee.astroneko.backend.dto.LoginRequest;
import coffee.astroneko.backend.dto.SignUpRequest;
import coffee.astroneko.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/expose/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

  @Autowired
  private UserService userService;

  @PostMapping("/signup")
  @Operation(
    summary = "Register a new user",
    description = "Create a new user account with client role"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "User registered successfully"
      ),
      @ApiResponse(
        responseCode = "400",
        description = "Bad request - validation error"
      ),
      @ApiResponse(responseCode = "409", description = "Email already exists"),
    }
  )
  public ResponseEntity<?> registerUser(
    @Valid @RequestBody SignUpRequest signUpRequest
  ) {
    try {
      AuthResponse authResponse = userService.signUp(signUpRequest);
      return ResponseEntity.ok(authResponse);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest()
        .body(Map.of("message", e.getMessage()));
    }
  }

  @PostMapping("/login")
  @Operation(
    summary = "Authenticate user",
    description = "Login with email and password"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "User authenticated successfully"
      ),
      @ApiResponse(
        responseCode = "400",
        description = "Bad request - validation error"
      ),
      @ApiResponse(responseCode = "401", description = "Invalid credentials"),
    }
  )
  public ResponseEntity<?> authenticateUser(
    @Valid @RequestBody LoginRequest loginRequest
  ) {
    try {
      AuthResponse authResponse = userService.login(loginRequest);
      return ResponseEntity.ok(authResponse);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest()
        .body(Map.of("message", e.getMessage()));
    }
  }

  @PostMapping("/logout")
  @Operation(
    summary = "Logout user",
    description = "Logout user (token invalidation handled on client side)"
  )
  @ApiResponse(
    responseCode = "200",
    description = "User logged out successfully"
  )
  public ResponseEntity<?> logoutUser() {
    // Since JWT is stateless, we just return a success message
    // The client should remove the token from storage
    return ResponseEntity.ok(Map.of("message", "User logged out successfully"));
  }
}
