package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.service.UserService;
import coffee.astroneko.backend.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
  name = "User Profile",
  description = "Secure API for user profile management"
)
@RestController
@RequestMapping("/api/v1/secure/user")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtUtil jwtUtil;

  @Operation(
    summary = "Get current user profile",
    description = "Retrieves the profile information of the currently authenticated user"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "User profile retrieved successfully"
      ),
      @ApiResponse(
        responseCode = "401",
        description = "Unauthorized - Invalid or missing token"
      ),
      @ApiResponse(responseCode = "404", description = "User not found"),
    }
  )
  @GetMapping("/profile")
  public ResponseEntity<?> getCurrentUserProfile(HttpServletRequest request) {
    try {
      // Extract JWT token from Authorization header
      String authHeader = request.getHeader("Authorization");
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(401).body(
          "Missing or invalid Authorization header"
        );
      }

      String token = authHeader.substring(7);

      // Validate and extract email from token
      if (!jwtUtil.validateJwtToken(token)) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      String email = jwtUtil.getEmailFromJwtToken(token);

      // Find user by email
      Optional<User> userOptional = userService.findByEmail(email);
      if (userOptional.isEmpty()) {
        return ResponseEntity.status(404).body("User not found");
      }

      User user = userOptional.get();

      // Return user profile (excluding password)
      return ResponseEntity.ok(user);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(
        "Internal server error: " + e.getMessage()
      );
    }
  }
}
