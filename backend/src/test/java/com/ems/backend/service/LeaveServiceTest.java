package com.ems.backend.service;

import com.ems.backend.entity.LeaveBalance;
import com.ems.backend.entity.User;
import com.ems.backend.repository.LeaveBalanceRepository;
import com.ems.backend.repository.LeaveRequestRepository;
import com.ems.backend.repository.UserRepository;
import com.ems.backend.service.impl.LeaveServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class LeaveServiceTest {

    @Mock
    private LeaveRequestRepository leaveRequestRepository;

    @Mock
    private LeaveBalanceRepository leaveBalanceRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LeaveServiceImpl leaveService;

    @Test
    void getLeaveBalance_shouldReturnBalance() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        assertNotNull(leaveService.getLeaveBalance(1L));
    }
}
