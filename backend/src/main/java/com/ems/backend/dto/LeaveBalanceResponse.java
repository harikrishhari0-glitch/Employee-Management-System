package com.ems.backend.dto;

import lombok.Data;

@Data
public class LeaveBalanceResponse {
    private String leaveType;
    private int allocatedDays;
    private int usedDays;
    private int balance;
}
