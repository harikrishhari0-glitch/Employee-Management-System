package com.ems.backend.service;

import com.ems.backend.dto.ApplyLeaveRequest;
import com.ems.backend.dto.LeaveBalanceResponse;
import com.ems.backend.dto.LeaveResponse;
import java.util.List;
import java.util.Map;

public interface LeaveService {
    LeaveResponse applyLeave(Long userId, ApplyLeaveRequest request);
    List<LeaveResponse> getLeaveHistory(Long userId);
    List<LeaveBalanceResponse> getLeaveBalance(Long userId);
    LeaveResponse cancelLeave(Long userId, Long leaveId);
    
    List<LeaveResponse> getAllLeaves();
    List<LeaveResponse> getPendingLeaves();
    LeaveResponse approveLeave(Long leaveId, String adminRemark);
    LeaveResponse rejectLeave(Long leaveId, String adminRemark);
    Map<String, Long> getAdminDashboardStats();
}
