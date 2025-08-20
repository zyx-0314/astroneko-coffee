package coffee.astroneko.backend.service;

import coffee.astroneko.backend.dto.AuthResponse;
import coffee.astroneko.backend.dto.LoginRequest;
import coffee.astroneko.backend.dto.SignUpRequest;
import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.repository.UserRepository;
import coffee.astroneko.backend.util.JwtUtil;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtUtil jwtUtil;

  public AuthResponse signUp(SignUpRequest signUpRequest) {
    // Check if email already exists
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new RuntimeException("Email is already registered!");
    }

    // Create new user account
    User user = new User();

    // Split name into first and last name
    String[] nameParts = signUpRequest.getName().trim().split("\\s+", 2);
    String firstName = nameParts[0];
    String lastName = nameParts.length > 1 ? nameParts[1] : "";

    user.setFirstName(firstName);
    user.setLastName(lastName);

    // Generate username from email (take part before @)
    String username = signUpRequest.getEmail().split("@")[0];
    // Make sure username is unique
    int counter = 1;
    String originalUsername = username;
    while (userRepository.existsByUsername(username)) {
      username = originalUsername + counter;
      counter++;
    }
    user.setUsername(username);

    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    user.setRole(User.Role.CLIENT); // Default role for sign up

    // Convert sex string to enum
    if (signUpRequest.getSex() != null && !signUpRequest.getSex().isEmpty()) {
      try {
        user.setSex(User.Sex.valueOf(signUpRequest.getSex().toUpperCase()));
      } catch (IllegalArgumentException e) {
        // If invalid sex value, set to null or default
        user.setSex(null);
      }
    }

    user.setPoints(0); // New users start with 0 points

    User savedUser = userRepository.save(user);

    // Generate JWT token
    String jwt = jwtUtil.generateJwtToken(
      savedUser.getEmail(),
      savedUser.getRole().name().toLowerCase(),
      savedUser.getId()
    );

    return new AuthResponse(
      jwt,
      savedUser.getId(),
      savedUser.getEmail(),
      savedUser.getName(),
      savedUser.getRole().name().toLowerCase()
    );
  }

  public AuthResponse login(LoginRequest loginRequest) {
    // Find user by email
    Optional<User> userOptional = userRepository.findByEmail(
      loginRequest.getEmail()
    );
    if (userOptional.isEmpty()) {
      throw new RuntimeException("Invalid email or password!");
    }

    User user = userOptional.get();

    // Check if user is active
    if (!user.getIsActive()) {
      throw new RuntimeException("Account is deactivated!");
    }

    // Validate password
    if (
      !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())
    ) {
      throw new RuntimeException("Invalid email or password!");
    }

    // Generate JWT token
    String jwt = jwtUtil.generateJwtToken(
      user.getEmail(),
      user.getRole().name().toLowerCase(),
      user.getId()
    );

    return new AuthResponse(
      jwt,
      user.getId(),
      user.getEmail(),
      user.getName(),
      user.getRole().name().toLowerCase()
    );
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  public List<User> findByRole(User.Role role) {
    return userRepository.findByRole(role);
  }

  public List<User> findAllActiveUsers() {
    return userRepository.findByIsActiveTrue();
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public List<User> saveAll(List<User> users) {
    return userRepository.saveAll(users);
  }
}
