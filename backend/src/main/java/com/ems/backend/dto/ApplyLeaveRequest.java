package com.ems.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ApplyLeaveRequest {
    @NotBlank(message = "Leave type is mandatory")
    private String leaveType;

    @NotNull(message = "Start date is mandatory")
    @FutureOrPresent(message = "Leave cannot start in the past")
    private LocalDate startDate;

    @NotNull(message = "End date is mandatory")
    private LocalDate endDate;

    @NotBlank(message = "Reason is mandatory")
    private String reason;
}
