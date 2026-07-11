package com.ems.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LeaveResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String status;
    private String adminRemark;
}
