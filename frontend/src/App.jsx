import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/employee/Dashboard';
import ApplyLeave from './pages/employee/ApplyLeave';
import LeaveHistory from './pages/employee/LeaveHistory';
import LeaveBalance from './pages/employee/LeaveBalance';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequests from './pages/admin/AdminRequests';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route element={<ProtectedLayout allowedRoles={['EMPLOYEE', 'ADMIN']} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/apply" element={<ApplyLeave />} />
                    <Route path="/history" element={<LeaveHistory />} />
                    <Route path="/balance" element={<LeaveBalance />} />
                </Route>

                <Route path="/admin" element={<ProtectedLayout allowedRoles={['ADMIN']} />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="requests" element={<AdminRequests />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
