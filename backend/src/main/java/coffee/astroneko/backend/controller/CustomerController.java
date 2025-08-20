package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.dto.CustomerResponse;
import coffee.astroneko.backend.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
  name = "Customer Management",
  description = "Secure API for managing coffee shop customers"
)
@RestController
@RequestMapping("/api/v1/secure/customers")
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  @GetMapping
  @Operation(
    summary = "Get all customers",
    description = "Retrieves a list of all customers"
  )
  @ApiResponse(
    responseCode = "200",
    description = "Customer list retrieved successfully"
  )
  public ResponseEntity<List<CustomerResponse>> getAllCustomers(
    @Parameter(description = "Filter by active status") @RequestParam(
      name = "active",
      required = false
    ) Boolean active
  ) {
    try {
      List<CustomerResponse> customers;
      if (active != null && active) {
        customers = customerService.getAllActiveCustomers();
      } else {
        customers = customerService.getAllCustomers();
      }
      return ResponseEntity.ok(customers);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{id}")
  @Operation(
    summary = "Get customer by ID",
    description = "Retrieves a customer by their ID"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Customer retrieved successfully"
      ),
      @ApiResponse(responseCode = "404", description = "Customer not found"),
    }
  )
  public ResponseEntity<CustomerResponse> getCustomerById(
    @Parameter(description = "Customer ID") @PathVariable Long id
  ) {
    try {
      Optional<CustomerResponse> customer = customerService.getCustomerById(id);
      return customer
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/email/{email}")
  @Operation(
    summary = "Get customer by email",
    description = "Retrieves a customer by their email address"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Customer retrieved successfully"
      ),
      @ApiResponse(responseCode = "404", description = "Customer not found"),
    }
  )
  public ResponseEntity<CustomerResponse> getCustomerByEmail(
    @Parameter(description = "Customer email") @PathVariable String email
  ) {
    try {
      Optional<CustomerResponse> customer = customerService.getCustomerByEmail(
        email
      );
      return customer
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/{id}/deactivate")
  @Operation(
    summary = "Deactivate customer",
    description = "Deactivates a customer account"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Customer deactivated successfully"
      ),
      @ApiResponse(responseCode = "404", description = "Customer not found"),
    }
  )
  public ResponseEntity<String> deactivateCustomer(
    @Parameter(description = "Customer ID") @PathVariable Long id
  ) {
    try {
      customerService.deactivateCustomer(id);
      return ResponseEntity.ok("Customer deactivated successfully");
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/{id}/activate")
  @Operation(
    summary = "Activate customer",
    description = "Activates a customer account"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Customer activated successfully"
      ),
      @ApiResponse(responseCode = "404", description = "Customer not found"),
    }
  )
  public ResponseEntity<String> activateCustomer(
    @Parameter(description = "Customer ID") @PathVariable Long id
  ) {
    try {
      customerService.activateCustomer(id);
      return ResponseEntity.ok("Customer activated successfully");
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/paginated")
  @Operation(
    summary = "Get customers with pagination",
    description = "Retrieves a paginated list of customers"
  )
  @ApiResponse(
    responseCode = "200",
    description = "Paginated customer list retrieved successfully"
  )
  public ResponseEntity<Page<CustomerResponse>> getCustomersPaginated(
    @Parameter(description = "Page number (0-based)") @RequestParam(
      name = "page",
      defaultValue = "0"
    ) int page,
    @Parameter(description = "Page size") @RequestParam(
      name = "size",
      defaultValue = "10"
    ) int size,
    @Parameter(description = "Sort field") @RequestParam(
      name = "sortBy",
      defaultValue = "firstName"
    ) String sortBy,
    @Parameter(description = "Sort direction (asc/desc)") @RequestParam(
      name = "sortDir",
      defaultValue = "asc"
    ) String sortDir,
    @Parameter(description = "Filter by active status") @RequestParam(
      name = "active",
      required = false
    ) Boolean active
  ) {
    try {
      Page<CustomerResponse> customers;
      if (active != null && active) {
        customers = customerService.getAllActiveCustomersPaginated(
          page,
          size,
          sortBy,
          sortDir
        );
      } else {
        customers = customerService.getAllCustomersPaginated(
          page,
          size,
          sortBy,
          sortDir
        );
      }
      return ResponseEntity.ok(customers);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
