package com.ems.backend.service.impl;

import com.ems.backend.dto.ApplyLeaveRequest;
import com.ems.backend.dto.LeaveBalanceResponse;
import com.ems.backend.dto.LeaveResponse;
import com.ems.backend.entity.LeaveBalance;
import com.ems.backend.entity.LeaveRequest;
import com.ems.backend.entity.User;
import com.ems.backend.repository.LeaveBalanceRepository;
import com.ems.backend.repository.LeaveRequestRepository;
import com.ems.backend.repository.UserRepository;
import com.ems.backend.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {
    
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public LeaveResponse applyLeave(Long userId, ApplyLeaveRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End date cannot be before start date");
        }

        long overlapping = leaveRequestRepository.countOverlappingLeaves(user, request.getStartDate(), request.getEndDate());
        if (overlapping > 0) {
            throw new RuntimeException("Leave dates overlap with an existing request");
        }

        LeaveBalance balance = leaveBalanceRepository.findByUserAndLeaveType(user, request.getLeaveType())
                .orElseThrow(() -> new RuntimeException("Leave balance not found for type: " + request.getLeaveType()));

        long requestedDays = java.time.temporal.ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
        if (balance.getBalance() < requestedDays) {
            throw new RuntimeException("Insufficient leave balance");
        }

        LeaveRequest leaveRequest = LeaveRequest.builder()
                .user(user)
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reason(request.getReason())
                .status(LeaveRequest.Status.PENDING)
                .build();
                
        leaveRequest = leaveRequestRepository.save(leaveRequest);
        return mapToResponse(leaveRequest);
    }

    @Override
    public List<LeaveResponse> getLeaveHistory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return leaveRequestRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<LeaveBalanceResponse> getLeaveBalance(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return leaveBalanceRepository.findByUser(user).stream()
                .map(b -> {
                    LeaveBalanceResponse res = new LeaveBalanceResponse();
                    res.setLeaveType(b.getLeaveType());
                    res.setAllocatedDays(b.getAllocatedDays());
                    res.setUsedDays(b.getUsedDays());
                    res.setBalance(b.getBalance());
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LeaveResponse cancelLeave(Long userId, Long leaveId) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
                
        if (!req.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        
        if (req.getStatus() != LeaveRequest.Status.PENDING) {
            throw new RuntimeException("Only pending leaves can be cancelled");
        }
        
        req.setStatus(LeaveRequest.Status.CANCELLED);
        leaveRequestRepository.save(req);
        return mapToResponse(req);
    }

    @Override
    public List<LeaveResponse> getAllLeaves() {
        return leaveRequestRepository.findAll().stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<LeaveResponse> getPendingLeaves() {
        return leaveRequestRepository.findAll().stream()
                .filter(l -> l.getStatus() == LeaveRequest.Status.PENDING)
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LeaveResponse approveLeave(Long leaveId, String adminRemark) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        
        if (req.getStatus() != LeaveRequest.Status.PENDING) {
            throw new RuntimeException("Leave is not pending");
        }

        LeaveBalance balance = leaveBalanceRepository.findByUserAndLeaveType(req.getUser(), req.getLeaveType())
                .orElseThrow(() -> new RuntimeException("Balance not found"));
                
        long requestedDays = java.time.temporal.ChronoUnit.DAYS.between(req.getStartDate(), req.getEndDate()) + 1;
        
        if (balance.getBalance() < requestedDays) {
            throw new RuntimeException("Employee has insufficient balance now");
        }
        
        balance.setUsedDays(balance.getUsedDays() + (int)requestedDays);
        balance.setBalance(balance.getAllocatedDays() - balance.getUsedDays());
        leaveBalanceRepository.save(balance);
        
        req.setStatus(LeaveRequest.Status.APPROVED);
        req.setAdminRemark(adminRemark);
        leaveRequestRepository.save(req);
        return mapToResponse(req);
    }

    @Override
    @Transactional
    public LeaveResponse rejectLeave(Long leaveId, String adminRemark) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        
        if (adminRemark == null || adminRemark.trim().isEmpty()) {
            throw new RuntimeException("Admin remark is mandatory for rejection");
        }
        
        req.setStatus(LeaveRequest.Status.REJECTED);
        req.setAdminRemark(adminRemark);
        leaveRequestRepository.save(req);
        return mapToResponse(req);
    }
    @Override
    public Map<String, Long> getAdminDashboardStats() {
        return Map.of(
            "pendingRequests", leaveRequestRepository.countByStatus(LeaveRequest.Status.PENDING),
            "approvedToday", leaveRequestRepository.countByStatusUpdatedToday(LeaveRequest.Status.APPROVED),
            "rejectedToday", leaveRequestRepository.countByStatusUpdatedToday(LeaveRequest.Status.REJECTED),
            "employeesOnLeave", leaveRequestRepository.countEmployeesOnLeaveToday()
        );
    }

    private LeaveResponse mapToResponse(LeaveRequest req) {
        LeaveResponse res = new LeaveResponse();
        res.setId(req.getId());
        res.setUserId(req.getUser().getId());
        res.setUserName(req.getUser().getFirstName() + " " + req.getUser().getLastName());
        res.setLeaveType(req.getLeaveType());
        res.setStartDate(req.getStartDate());
        res.setEndDate(req.getEndDate());
        res.setReason(req.getReason());
        res.setStatus(req.getStatus().name());
        res.setAdminRemark(req.getAdminRemark());
        return res;
    }
}
