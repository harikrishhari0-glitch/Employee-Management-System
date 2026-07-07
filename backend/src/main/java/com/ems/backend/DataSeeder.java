package com.ems.backend;

import com.ems.backend.entity.LeaveBalance;
import com.ems.backend.entity.User;
import com.ems.backend.repository.LeaveBalanceRepository;
import com.ems.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@company.com").isEmpty()) {
            User admin = new User();
            admin.setFirstName("Super");
            admin.setLastName("Admin");
            admin.setEmail("admin@company.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("john@company.com").isEmpty()) {
            User emp = new User();
            emp.setFirstName("John");
            emp.setLastName("Doe");
            emp.setEmail("john@company.com");
            emp.setPassword(passwordEncoder.encode("emp123"));
            emp.setRole(User.Role.EMPLOYEE);
            User savedEmp = userRepository.save(emp);

            // Seed balances
            leaveBalanceRepository.saveAll(List.of(
                createBalance(savedEmp, "Casual Leave", 12),
                createBalance(savedEmp, "Sick Leave", 12),
                createBalance(savedEmp, "Earned Leave", 15),
                createBalance(savedEmp, "Work From Home", 30)
            ));
        }
    }
    
    private LeaveBalance createBalance(User user, String type, int days) {
        LeaveBalance bal = new LeaveBalance();
        bal.setUser(user);
        bal.setLeaveType(type);
        bal.setAllocatedDays(days);
        bal.setUsedDays(0);
        bal.setBalance(days);
        return bal;
    }
}
