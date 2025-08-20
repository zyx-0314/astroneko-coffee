package coffee.astroneko.backend.controller;

import coffee.astroneko.backend.dto.PurchaseHistoryResponse;
import coffee.astroneko.backend.service.PurchaseHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
  name = "Purchase History Management",
  description = "Secure API for managing customer purchase history"
)
@RestController
@RequestMapping("/api/v1/secure/purchase-history")
public class PurchaseHistoryController {

  @Autowired
  private PurchaseHistoryService purchaseHistoryService;

  @GetMapping
  @Operation(
    summary = "Get all purchase history",
    description = "Retrieves all purchase history records"
  )
  @ApiResponse(
    responseCode = "200",
    description = "Purchase history retrieved successfully"
  )
  public ResponseEntity<List<PurchaseHistoryResponse>> getAllPurchaseHistory() {
    try {
      List<PurchaseHistoryResponse> history =
        purchaseHistoryService.getAllPurchaseHistory();
      return ResponseEntity.ok(history);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/customer/{customerId}")
  @Operation(
    summary = "Get purchase history by customer ID",
    description = "Retrieves purchase history for a specific customer"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Purchase history retrieved successfully"
      ),
      @ApiResponse(responseCode = "404", description = "Customer not found"),
    }
  )
  public ResponseEntity<
    List<PurchaseHistoryResponse>
  > getPurchaseHistoryByCustomerId(
    @Parameter(description = "Customer ID") @PathVariable Long customerId
  ) {
    try {
      List<PurchaseHistoryResponse> history =
        purchaseHistoryService.getPurchaseHistoryByCustomerId(customerId);
      return ResponseEntity.ok(history);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/customer/{customerId}/paginated")
  @Operation(
    summary = "Get paginated purchase history by customer ID",
    description = "Retrieves paginated purchase history for a specific customer"
  )
  public ResponseEntity<
    Page<PurchaseHistoryResponse>
  > getPaginatedPurchaseHistoryByCustomerId(
    @Parameter(description = "Customer ID") @PathVariable Long customerId,
    @Parameter(description = "Page number") @RequestParam(
      defaultValue = "0"
    ) int page,
    @Parameter(description = "Page size") @RequestParam(
      defaultValue = "10"
    ) int size
  ) {
    try {
      Page<PurchaseHistoryResponse> history =
        purchaseHistoryService.getPurchaseHistoryByCustomerId(
          customerId,
          page,
          size
        );
      return ResponseEntity.ok(history);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{id}")
  @Operation(
    summary = "Get purchase history by ID",
    description = "Retrieves a specific purchase history record"
  )
  @ApiResponses(
    value = {
      @ApiResponse(
        responseCode = "200",
        description = "Purchase history retrieved successfully"
      ),
      @ApiResponse(
        responseCode = "404",
        description = "Purchase history not found"
      ),
    }
  )
  public ResponseEntity<PurchaseHistoryResponse> getPurchaseHistoryById(
    @Parameter(description = "Purchase history ID") @PathVariable Long id
  ) {
    try {
      Optional<PurchaseHistoryResponse> history =
        purchaseHistoryService.getPurchaseHistoryById(id);
      return history
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/order/{orderId}")
  @Operation(
    summary = "Get purchase history by order ID",
    description = "Retrieves purchase history by order ID"
  )
  public ResponseEntity<
    List<PurchaseHistoryResponse>
  > getPurchaseHistoryByOrderId(
    @Parameter(description = "Order ID") @PathVariable String orderId
  ) {
    try {
      List<PurchaseHistoryResponse> history =
        purchaseHistoryService.getPurchaseHistoryByOrderId(orderId);
      return ResponseEntity.ok(history);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/customer/{customerId}/stats/count")
  @Operation(
    summary = "Get customer order count",
    description = "Retrieves the total number of orders for a customer"
  )
  public ResponseEntity<Long> getCustomerOrderCount(
    @Parameter(description = "Customer ID") @PathVariable Long customerId
  ) {
    try {
      Long count = purchaseHistoryService.getCustomerOrderCount(customerId);
      return ResponseEntity.ok(count);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/customer/{customerId}/stats/total-spent")
  @Operation(
    summary = "Get customer total spent",
    description = "Retrieves the total amount spent by a customer"
  )
  public ResponseEntity<BigDecimal> getCustomerTotalSpent(
    @Parameter(description = "Customer ID") @PathVariable Long customerId
  ) {
    try {
      BigDecimal totalSpent = purchaseHistoryService.getCustomerTotalSpent(
        customerId
      );
      return ResponseEntity.ok(totalSpent);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/date-range")
  @Operation(
    summary = "Get purchase history by date range",
    description = "Retrieves purchase history within a specific date range"
  )
  public ResponseEntity<
    List<PurchaseHistoryResponse>
  > getPurchaseHistoryByDateRange(
    @Parameter(
      description = "Start date (yyyy-MM-dd'T'HH:mm:ss)"
    ) @RequestParam String startDate,
    @Parameter(
      description = "End date (yyyy-MM-dd'T'HH:mm:ss)"
    ) @RequestParam String endDate
  ) {
    try {
      DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
      LocalDateTime start = LocalDateTime.parse(startDate, formatter);
      LocalDateTime end = LocalDateTime.parse(endDate, formatter);

      List<PurchaseHistoryResponse> history =
        purchaseHistoryService.getPurchaseHistoryByDateRange(start, end);
      return ResponseEntity.ok(history);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/customer/{customerId}/date-range")
  @Operation(
    summary = "Get customer purchase history by date range",
    description = "Retrieves purchase history for a customer within a specific date range"
  )
  public ResponseEntity<
    List<PurchaseHistoryResponse>
  > getPurchaseHistoryByCustomerAndDateRange(
    @Parameter(description = "Customer ID") @PathVariable Long customerId,
    @Parameter(
      description = "Start date (yyyy-MM-dd'T'HH:mm:ss)"
    ) @RequestParam String startDate,
    @Parameter(
      description = "End date (yyyy-MM-dd'T'HH:mm:ss)"
    ) @RequestParam String endDate
  ) {
    try {
      DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
      LocalDateTime start = LocalDateTime.parse(startDate, formatter);
      LocalDateTime end = LocalDateTime.parse(endDate, formatter);

      List<PurchaseHistoryResponse> history =
        purchaseHistoryService.getPurchaseHistoryByCustomerAndDateRange(
          customerId,
          start,
          end
        );
      return ResponseEntity.ok(history);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
