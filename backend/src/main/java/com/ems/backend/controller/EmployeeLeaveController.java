package com.ems.backend.controller;

import com.ems.backend.dto.ApiResponse;
import com.ems.backend.dto.ApplyLeaveRequest;
import com.ems.backend.dto.LeaveBalanceResponse;
import com.ems.backend.dto.LeaveResponse;
import com.ems.backend.service.LeaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class EmployeeLeaveController {
    
    private final LeaveService leaveService;
    
    private Long getUserId(Authentication authentication) {
        return ((com.ems.backend.security.CustomUserDetails) authentication.getPrincipal()).getUser().getId();
    }

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<LeaveResponse>> applyLeave(@Valid @RequestBody ApplyLeaveRequest request, Authentication authentication) {
        LeaveResponse res = leaveService.applyLeave(getUserId(authentication), request);
        return ResponseEntity.ok(ApiResponse.<LeaveResponse>builder().success(true).message("Leave applied").data(res).status(200).build());
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<LeaveResponse>>> getHistory(Authentication authentication) {
        List<LeaveResponse> res = leaveService.getLeaveHistory(getUserId(authentication));
        return ResponseEntity.ok(ApiResponse.<List<LeaveResponse>>builder().success(true).message("History fetched").data(res).status(200).build());
    }

    @GetMapping("/balance")
    public ResponseEntity<ApiResponse<List<LeaveBalanceResponse>>> getBalance(Authentication authentication) {
        List<LeaveBalanceResponse> res = leaveService.getLeaveBalance(getUserId(authentication));
        return ResponseEntity.ok(ApiResponse.<List<LeaveBalanceResponse>>builder().success(true).message("Balance fetched").data(res).status(200).build());
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<ApiResponse<LeaveResponse>> cancelLeave(@PathVariable Long id, Authentication authentication) {
        LeaveResponse res = leaveService.cancelLeave(getUserId(authentication), id);
        return ResponseEntity.ok(ApiResponse.<LeaveResponse>builder().success(true).message("Leave cancelled").data(res).status(200).build());
    }
}
