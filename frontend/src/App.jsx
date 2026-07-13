import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import HRDashboard from "./pages/dashboard/HRDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminReports from "./pages/dashboard/AdminReports";
import Profile from "./pages/dashboard/EmployeeProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/employee" />} />

        <Route path="/employee" element={<EmployeeDashboard />} />

        <Route path="/hr" element={<HRDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/reports" element={<AdminReports />} />

        <Route path="/employee/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;