import axiosInstance from '../utils/axiosInstance';

// ─── Module 5: Auth & Leave Management (Harsha) ────────────────────

export const authService = {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
};

export const employeeService = {
    applyLeave:  (data) => axiosInstance.post('/leaves/apply', data),
    getHistory:  ()     => axiosInstance.get('/leaves/history'),
    getBalance:  ()     => axiosInstance.get('/leaves/balance'),
    cancelLeave: (id)   => axiosInstance.put(`/leaves/cancel/${id}`),
};

export const adminService = {
    getAllLeaves:      ()           => axiosInstance.get('/admin/leaves'),
    getPendingLeaves:  ()           => axiosInstance.get('/admin/pending'),
    approveLeave:     (id, remark) => axiosInstance.put(`/admin/approve/${id}`, { remark }),
    rejectLeave:      (id, remark) => axiosInstance.put(`/admin/reject/${id}`, { remark }),
    getDashboardStats: ()           => axiosInstance.get('/admin/dashboard'),
};

// ───────────────────────────────────────────────────────────────────

// ─── Module 1: Dashboard ── Add your services here ─────────────────
// export const dashboardService = { ... };
// ───────────────────────────────────────────────────────────────────

// ─── Module 2: Attendance ── Add your services here ────────────────
// export const attendanceService = { ... };
// ───────────────────────────────────────────────────────────────────

// ─── Module 3: Payroll ── Add your services here ───────────────────
// export const payrollService = { ... };
// ───────────────────────────────────────────────────────────────────

// ─── Module 4: Training ── Add your services here ──────────────────
// export const trainingService = { ... };
// ───────────────────────────────────────────────────────────────────
