package com.ems.backend.repository;

import com.ems.backend.entity.LeaveRequest;
import com.ems.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT COUNT(lr) FROM LeaveRequest lr WHERE lr.user = :user AND " +
           "lr.status != 'REJECTED' AND lr.status != 'CANCELLED' AND " +
           "(lr.startDate <= :endDate AND lr.endDate >= :startDate)")
    long countOverlappingLeaves(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    long countByStatus(LeaveRequest.Status status);
    
    @Query("SELECT COUNT(DISTINCT lr.user) FROM LeaveRequest lr WHERE lr.status = 'APPROVED' AND CURRENT_DATE BETWEEN lr.startDate AND lr.endDate")
    long countEmployeesOnLeaveToday();

    @Query("SELECT COUNT(lr) FROM LeaveRequest lr WHERE lr.status = :status AND lr.updatedAt >= CURRENT_DATE")
    long countByStatusUpdatedToday(@Param("status") LeaveRequest.Status status);
}
