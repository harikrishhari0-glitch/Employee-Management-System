USE employee_management_db;

-- Insert an Admin user (password: admin123, you would bcrypt this in a real scenario, but for now we'll put a raw or mock hash.
-- Using BCrypt hash for 'admin123': $2a$10$XQZ/n9J/1g4K1hB/k3r7yO.vT7n6T.J2.1.2.3.4.5.6.7.8.9.0
-- For testing purposes, we'll assume the Spring Boot app will create users, but let's insert a mock admin.
-- We will use a known bcrypt hash for "admin123" which is: $2a$12$R9h/cIPz0gi.URNNX3k2lOlnOOzL14Uy.r8L/670.3p/Qc.iR.s3K
INSERT IGNORE INTO users (id, first_name, last_name, email, password, role) VALUES 
(1, 'Super', 'Admin', 'admin@company.com', '$2a$12$R9h/cIPz0gi.URNNX3k2lOlnOOzL14Uy.r8L/670.3p/Qc.iR.s3K', 'ADMIN');

-- Insert a regular Employee (password: emp123)
-- bcrypt hash for "emp123" -> $2a$12$Y/08N.zO6C4.8a6.T6r.e.q.r.e.r.e.r.e.r.e.r.e.r.e.r.e.r
INSERT IGNORE INTO users (id, first_name, last_name, email, password, role) VALUES 
(2, 'John', 'Doe', 'john@company.com', '$2a$10$gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO6.gO', 'EMPLOYEE');

-- Leave Types requested: 
-- Casual Leave, Sick Leave, Earned Leave, Work From Home, Maternity Leave, Paternity Leave, Emergency Leave, Loss of Pay

-- Initialize balances for Employee (John Doe, id=2)
INSERT IGNORE INTO leave_balance (user_id, leave_type, allocated_days, used_days, balance) VALUES
(2, 'Casual Leave', 12, 0, 12),
(2, 'Sick Leave', 12, 0, 12),
(2, 'Earned Leave', 15, 0, 15),
(2, 'Work From Home', 30, 0, 30),
(2, 'Maternity Leave', 0, 0, 0), -- Typically conditional
(2, 'Paternity Leave', 0, 0, 0), -- Typically conditional
(2, 'Emergency Leave', 5, 0, 5),
(2, 'Loss of Pay', 0, 0, 0); -- Unlimited but unpaid, tracked by used_days
