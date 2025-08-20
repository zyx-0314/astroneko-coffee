package coffee.astroneko.backend.repository;

import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.entity.WorkLog;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {
  // Find work logs by user
  List<WorkLog> findByUser(User user);

  // Find work logs by user and date range
  @Query(
    "SELECT w FROM WorkLog w WHERE w.user = :user AND w.workDate BETWEEN :startDate AND :endDate"
  )
  List<WorkLog> findByUserAndDateRange(
    @Param("user") User user,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  // Find current active work log (clocked in but not clocked out)
  @Query(
    "SELECT w FROM WorkLog w WHERE w.user = :user AND w.clockOutTime IS NULL AND w.status = 'CLOCKED_IN'"
  )
  Optional<WorkLog> findActiveWorkLogByUser(@Param("user") User user);

  // Find work logs by status
  @Query("SELECT w FROM WorkLog w WHERE w.status = :status")
  List<WorkLog> findByStatus(@Param("status") WorkLog.WorkStatus status);

  // Find work logs for a specific date
  @Query(
    "SELECT w FROM WorkLog w WHERE CAST(w.workDate AS DATE) = CAST(:workDate AS DATE)"
  )
  List<WorkLog> findByWorkDate(@Param("workDate") LocalDateTime workDate);

  // Get total hours worked by user in a date range
  @Query(
    "SELECT COALESCE(SUM(w.totalHoursWorked), 0) FROM WorkLog w " +
    "WHERE w.user = :user AND w.workDate BETWEEN :startDate AND :endDate " +
    "AND w.clockOutTime IS NOT NULL"
  )
  Double getTotalHoursWorkedByUserInRange(
    @Param("user") User user,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  // Get total overtime hours by user in a date range
  @Query(
    "SELECT COALESCE(SUM(w.overtimeHours), 0) FROM WorkLog w " +
    "WHERE w.user = :user AND w.workDate BETWEEN :startDate AND :endDate " +
    "AND w.clockOutTime IS NOT NULL"
  )
  Double getTotalOvertimeHoursByUserInRange(
    @Param("user") User user,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate
  );

  // Find users who are currently clocked in
  @Query(
    "SELECT DISTINCT w.user FROM WorkLog w WHERE w.clockOutTime IS NULL AND w.status = 'CLOCKED_IN'"
  )
  List<User> findUsersCurrentlyClockedIn();

  // Get work logs with incomplete records (missing clock out)
  @Query(
    "SELECT w FROM WorkLog w WHERE w.clockOutTime IS NULL AND w.clockInTime < :cutoffTime"
  )
  List<WorkLog> findIncompleteWorkLogs(
    @Param("cutoffTime") LocalDateTime cutoffTime
  );

  // Get attendance statistics for a user in a month
  @Query(
    "SELECT COUNT(w) FROM WorkLog w WHERE w.user = :user " +
    "AND YEAR(w.workDate) = :year AND MONTH(w.workDate) = :month " +
    "AND w.clockOutTime IS NOT NULL"
  )
  Long getAttendanceCountByUserAndMonth(
    @Param("user") User user,
    @Param("year") int year,
    @Param("month") int month
  );
}
