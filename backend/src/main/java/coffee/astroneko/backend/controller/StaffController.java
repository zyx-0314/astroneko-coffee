package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.dto.CreateStaffRequest;
import coffee.astroneko.backend.dto.StaffResponse;
import coffee.astroneko.backend.dto.UpdateStaffRequest;
import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
  name = "Staff Management",
  description = "Secure API for managing coffee shop staff"
)
@RestController
@RequestMapping("/api/v1/secure/staff")
public class StaffController {

  @Autowired
  private StaffService staffService;

  @PostMapping
  @Operation(
    summary = "Create new staff member",
    description = "Creates a new staff member with user account and employee information"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "201",
        description = "Staff member created successfully"
      ),
      @ApiResponse(
        responseCode = "400",
        description = "Bad request - validation error"
      ),
      @ApiResponse(
        responseCode = "409",
        description = "Conflict - email, username, or employee ID already exists"
      ),
    }
  )
  public ResponseEntity<?> createStaff(
    @Valid @RequestBody CreateStaffRequest request
  ) {
    try {
      StaffResponse response = staffService.createStaff(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(
        Map.of("message", e.getMessage())
      );
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @GetMapping
  @Operation(
    summary = "Get all staff members",
    description = "Retrieves a list of all staff members"
  )
  @ApiResponse(
    responseCode = "200",
    description = "Staff list retrieved successfully"
  )
  public ResponseEntity<List<StaffResponse>> getAllStaff(
    @Parameter(description = "Filter by active status") @RequestParam(
      name = "active",
      required = false
    ) Boolean active
  ) {
    try {
      List<StaffResponse> staff;
      if (active != null && active) {
        staff = staffService.getAllActiveStaff();
      } else {
        staff = staffService.getAllStaff();
      }
      return ResponseEntity.ok(staff);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{id}")
  @Operation(
    summary = "Get staff member by ID",
    description = "Retrieves a specific staff member by their ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(responseCode = "200", description = "Staff member found"),
      @ApiResponse(
        responseCode = "404",
        description = "Staff member not found"
      ),
    }
  )
  public ResponseEntity<?> getStaffById(
    @Parameter(description = "Staff member ID") @PathVariable Long id
  ) {
    try {
      Optional<StaffResponse> staff = staffService.getStaffById(id);
      if (staff.isPresent()) {
        return ResponseEntity.ok(staff.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
          Map.of("message", "Staff member not found")
        );
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @GetMapping("/employee/{employeeId}")
  @Operation(
    summary = "Get staff member by employee ID",
    description = "Retrieves a specific staff member by their employee ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(responseCode = "200", description = "Staff member found"),
      @ApiResponse(
        responseCode = "404",
        description = "Staff member not found"
      ),
    }
  )
  public ResponseEntity<?> getStaffByEmployeeId(
    @Parameter(description = "Employee ID") @PathVariable String employeeId
  ) {
    try {
      Optional<StaffResponse> staff = staffService.getStaffByEmployeeId(
        employeeId
      );
      if (staff.isPresent()) {
        return ResponseEntity.ok(staff.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
          Map.of("message", "Staff member not found")
        );
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @GetMapping("/user/{userId}")
  @Operation(
    summary = "Get staff member by user ID",
    description = "Retrieves a specific staff member by their user ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(responseCode = "200", description = "Staff member found"),
      @ApiResponse(
        responseCode = "404",
        description = "Staff member not found"
      ),
    }
  )
  public ResponseEntity<?> getStaffByUserId(
    @Parameter(description = "User ID") @PathVariable Long userId
  ) {
    try {
      Optional<StaffResponse> staff = staffService.getStaffByUserId(userId);
      if (staff.isPresent()) {
        return ResponseEntity.ok(staff.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
          Map.of("message", "Staff member not found")
        );
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @PutMapping("/{id}")
  @Operation(
    summary = "Update staff member",
    description = "Updates an existing staff member's information"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Staff member updated successfully"
      ),
      @ApiResponse(
        responseCode = "400",
        description = "Bad request - validation error"
      ),
      @ApiResponse(
        responseCode = "404",
        description = "Staff member not found"
      ),
      @ApiResponse(
        responseCode = "409",
        description = "Conflict - email, username, or employee ID already exists"
      ),
    }
  )
  public ResponseEntity<?> updateStaff(
    @Parameter(description = "Staff member ID") @PathVariable Long id,
    @Valid @RequestBody UpdateStaffRequest request
  ) {
    try {
      StaffResponse response = staffService.updateStaff(id, request);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      if (e.getMessage().contains("not found")) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
          Map.of("message", e.getMessage())
        );
      } else {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
          Map.of("message", e.getMessage())
        );
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @DeleteMapping("/{id}")
  @Operation(
    summary = "Delete staff member",
    description = "Permanently deletes a staff member and their user account"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "204",
        description = "Staff member deleted successfully"
      ),
      @ApiResponse(
        responseCode = "404",
        description = "Staff member not found"
      ),
    }
  )
  public ResponseEntity<?> deleteStaff(
    @Parameter(description = "Staff member ID") @PathVariable Long id
  ) {
    try {
      staffService.deleteStaff(id);
      return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
        Map.of("message", e.getMessage())
      );
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @PutMapping("/{id}/deactivate")
  @Operation(
    summary = "Deactivate staff member",
    description = "Deactivates a staff member without deleting their account"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Staff member deactivated successfully"
      ),
      @ApiResponse(
        responseCode = "404",
        description = "Staff member not found"
      ),
    }
  )
  public ResponseEntity<?> deactivateStaff(
    @Parameter(description = "Staff member ID") @PathVariable Long id
  ) {
    try {
      staffService.deactivateStaff(id);
      return ResponseEntity.ok(
        Map.of("message", "Staff member deactivated successfully")
      );
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
        Map.of("message", e.getMessage())
      );
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
        Map.of("message", "Internal server error: " + e.getMessage())
      );
    }
  }

  @GetMapping("/department/{department}")
  @Operation(
    summary = "Get staff by department",
    description = "Retrieves all staff members in a specific department"
  )
  @ApiResponse(
    responseCode = "200",
    description = "Staff list retrieved successfully"
  )
  public ResponseEntity<List<StaffResponse>> getStaffByDepartment(
    @Parameter(description = "Department name") @PathVariable String department
  ) {
    try {
      List<StaffResponse> staff = staffService.getStaffByDepartment(department);
      return ResponseEntity.ok(staff);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/role/{role}")
  @Operation(
    summary = "Get staff by role",
    description = "Retrieves all staff members with a specific role"
  )
  @ApiResponse(
    responseCode = "200",
    description = "Staff list retrieved successfully"
  )
  public ResponseEntity<List<StaffResponse>> getStaffByRole(
    @Parameter(description = "User role") @PathVariable User.Role role
  ) {
    try {
      List<StaffResponse> staff = staffService.getStaffByRole(role);
      return ResponseEntity.ok(staff);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
