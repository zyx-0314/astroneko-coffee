package coffee.astroneko.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_logs")
public class WorkLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "clock_in_time", nullable = false)
  private LocalDateTime clockInTime;

  @Column(name = "clock_out_time")
  private LocalDateTime clockOutTime;

  @Column(name = "work_date", nullable = false)
  private LocalDateTime workDate;

  @Column(name = "total_hours_worked")
  private Double totalHoursWorked;

  @Column(name = "break_duration_minutes")
  private Integer breakDurationMinutes = 0;

  @Column(name = "overtime_hours")
  private Double overtimeHours = 0.0;

  @Column(name = "notes", length = 500)
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 20)
  private WorkStatus status = WorkStatus.CLOCKED_IN;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Enum for work status
  public enum WorkStatus {
    CLOCKED_IN,
    ON_BREAK,
    CLOCKED_OUT,
    ABSENT,
    LATE,
    EARLY_LEAVE,
  }

  // Constructors
  public WorkLog() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
    this.workDate = LocalDateTime.now();
  }

  public WorkLog(User user, LocalDateTime clockInTime) {
    this();
    this.user = user;
    this.clockInTime = clockInTime;
  }

  // Method to calculate total hours worked
  public void calculateTotalHours() {
    if (clockInTime != null && clockOutTime != null) {
      long minutesWorked = java.time.Duration.between(
        clockInTime,
        clockOutTime
      ).toMinutes();
      if (breakDurationMinutes != null) {
        minutesWorked -= breakDurationMinutes;
      }
      this.totalHoursWorked = minutesWorked / 60.0;

      // Calculate overtime (assuming 8 hours is standard work day)
      if (totalHoursWorked > 8.0) {
        this.overtimeHours = totalHoursWorked - 8.0;
      }
    }
  }

  // JPA lifecycle methods
  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
    if (workDate == null) {
      workDate = LocalDateTime.now();
    }
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
    calculateTotalHours();
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public LocalDateTime getClockInTime() {
    return clockInTime;
  }

  public void setClockInTime(LocalDateTime clockInTime) {
    this.clockInTime = clockInTime;
  }

  public LocalDateTime getClockOutTime() {
    return clockOutTime;
  }

  public void setClockOutTime(LocalDateTime clockOutTime) {
    this.clockOutTime = clockOutTime;
    calculateTotalHours();
  }

  public LocalDateTime getWorkDate() {
    return workDate;
  }

  public void setWorkDate(LocalDateTime workDate) {
    this.workDate = workDate;
  }

  public Double getTotalHoursWorked() {
    return totalHoursWorked;
  }

  public void setTotalHoursWorked(Double totalHoursWorked) {
    this.totalHoursWorked = totalHoursWorked;
  }

  public Integer getBreakDurationMinutes() {
    return breakDurationMinutes;
  }

  public void setBreakDurationMinutes(Integer breakDurationMinutes) {
    this.breakDurationMinutes = breakDurationMinutes;
  }

  public Double getOvertimeHours() {
    return overtimeHours;
  }

  public void setOvertimeHours(Double overtimeHours) {
    this.overtimeHours = overtimeHours;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public WorkStatus getStatus() {
    return status;
  }

  public void setStatus(WorkStatus status) {
    this.status = status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
