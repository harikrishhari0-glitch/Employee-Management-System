import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ─── Module 5: Leave Management (Harsha) ───────────────────────────
import Login        from './pages/auth/Login';
import LeaveManagement from './pages/employee/LeaveManagement';
import LeaveApproval   from './pages/admin/LeaveApproval';
// ───────────────────────────────────────────────────────────────────

// ─── Module 1: Dashboard ── Add your imports here ──────────────────
// import Dashboard from './pages/employee/Dashboard';
// ───────────────────────────────────────────────────────────────────

// ─── Module 2: Attendance ── Add your imports here ─────────────────
// import Attendance from './pages/employee/Attendance';
// ───────────────────────────────────────────────────────────────────

// ─── Module 3: Payroll ── Add your imports here ────────────────────
// import Payroll from './pages/employee/Payroll';
// ───────────────────────────────────────────────────────────────────

// ─── Module 4: Training ── Add your imports here ───────────────────
// import Training from './pages/employee/Training';
// ───────────────────────────────────────────────────────────────────

import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public Routes ── */}
          <Route path="/login" element={<Login />} />

          {/* ── Employee Protected Routes ── */}
          <Route element={<ProtectedLayout allowedRoles={['EMPLOYEE', 'ADMIN', 'HR']} />}>

            {/* Module 5: Leave Management (Harsha) */}
            <Route path="/"      element={<LeaveManagement />} />
            <Route path="/leave" element={<LeaveManagement />} />

            {/* Module 1: Dashboard — uncomment when ready */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}

            {/* Module 2: Attendance — uncomment when ready */}
            {/* <Route path="/attendance" element={<Attendance />} /> */}

            {/* Module 3: Payroll — uncomment when ready */}
            {/* <Route path="/payroll" element={<Payroll />} /> */}

            {/* Module 4: Training — uncomment when ready */}
            {/* <Route path="/training" element={<Training />} /> */}

          </Route>

          {/* ── Admin / HR Protected Routes ── */}
          <Route path="/hr" element={<ProtectedLayout allowedRoles={['ADMIN', 'HR']} />}>

            {/* Module 5: Leave Approval (Harsha) */}
            <Route path="leave-approval" element={<LeaveApproval />} />

          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </AuthProvider>
  );
}

export default App;
