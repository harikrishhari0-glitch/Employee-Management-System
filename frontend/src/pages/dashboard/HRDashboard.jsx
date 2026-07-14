import { useEffect, useState } from "react";

import HRSidebar from "../../components/dashboard/hr/HRSidebar";
import HRNavbar from "../../components/dashboard/hr/HRNavbar";
import HRStatsCards from "../../components/dashboard/hr/HRStatsCards";
import HRAttendanceChart from "../../components/dashboard/hr/HRAttendanceChart";
import HRDepartmentChart from "../../components/dashboard/hr/HRDepartmentChart";
import HRLeaveRequests from "../../components/dashboard/hr/HRLeaveRequests";

import { getDashboardData } from "../../services/dashboardService";

import "../../styles/hrDashboard.css";

function HRDashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {

 const fetchDashboard = async () => {
  try {
    const data = await getDashboardData();

    console.log("Dashboard Data:", data);

    setDashboardData(data);
  } catch (error) {
    console.error("Dashboard API Error:", error);
  }
 };

    fetchDashboard();

  }, []);

  if (!dashboardData) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0F172A",
          color: "#fff",
          fontSize: "18px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="hr-dashboard">

      {/* Sidebar */}
      <HRSidebar />

      {/* Main Content */}
      <div className="hr-main">

        {/* Navbar */}
        <HRNavbar />

        {/* Page Content */}
        <div className="hr-content">

          {/* Header */}
          <div className="hr-header">
            <h1>HR Overview</h1>
            <p>Company-wide workforce summary</p>
          </div>

          {/* Statistics Cards */}
          <HRStatsCards
            stats={dashboardData.stats}
          />

          {/* Charts */}
          <div className="hr-chart-row">

            {/* Attendance Chart */}
            <div className="attendance-section">
              <HRAttendanceChart
                data={dashboardData.attendanceByDepartment}
              />
            </div>

            {/* Department Chart */}
            <div className="department-section">
              <HRDepartmentChart
                data={dashboardData.departments}
              />
            </div>

          </div>

          {/* Recent Activities */}
          <div className="recent-activities-section">
            <HRLeaveRequests
                requests={dashboardData.leaveRequests}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default HRDashboard;