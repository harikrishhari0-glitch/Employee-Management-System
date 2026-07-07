package com.ems.backend.controller;

import com.ems.backend.dto.ApiResponse;
import com.ems.backend.dto.LeaveResponse;
import com.ems.backend.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminLeaveController {
    
    private final LeaveService leaveService;

    @GetMapping("/leaves")
    public ResponseEntity<ApiResponse<List<LeaveResponse>>> getAllLeaves() {
        List<LeaveResponse> res = leaveService.getAllLeaves();
        return ResponseEntity.ok(ApiResponse.<List<LeaveResponse>>builder().success(true).message("All leaves fetched").data(res).status(200).build());
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<LeaveResponse>>> getPendingLeaves() {
        List<LeaveResponse> res = leaveService.getPendingLeaves();
        return ResponseEntity.ok(ApiResponse.<List<LeaveResponse>>builder().success(true).message("Pending leaves fetched").data(res).status(200).build());
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<ApiResponse<LeaveResponse>> approveLeave(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String remark = payload.getOrDefault("remark", "Approved");
        LeaveResponse res = leaveService.approveLeave(id, remark);
        return ResponseEntity.ok(ApiResponse.<LeaveResponse>builder().success(true).message("Leave approved").data(res).status(200).build());
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<ApiResponse<LeaveResponse>> rejectLeave(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String remark = payload.get("remark");
        LeaveResponse res = leaveService.rejectLeave(id, remark);
        return ResponseEntity.ok(ApiResponse.<LeaveResponse>builder().success(true).message("Leave rejected").data(res).status(200).build());
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDashboardStats() {
        Map<String, Long> stats = leaveService.getAdminDashboardStats();
        return ResponseEntity.ok(ApiResponse.<Map<String, Long>>builder().success(true).message("Dashboard stats").data(stats).status(200).build());
    }
}
