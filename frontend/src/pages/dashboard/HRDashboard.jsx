import HRSidebar from "../../components/dashboard/hr/HRSidebar";
import HRNavbar from "../../components/dashboard/hr/HRNavbar";
import HRStatsCards from "../../components/dashboard/hr/HRStatsCards";
import HRAttendanceChart from "../../components/dashboard/hr/HRAttendanceChart";
import HRDepartmentChart from "../../components/dashboard/hr/HRDepartmentChart";
import HRLeaveRequests from "../../components/dashboard/hr/HRLeaveRequests";

import "../../styles/hrDashboard.css";

function HRDashboard() {
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
          <HRStatsCards />

          {/* Charts Section */}
          <div className="hr-chart-row">

            {/* Attendance Chart */}
            <div className="attendance-section">
              <HRAttendanceChart />
            </div>

            {/* Department Chart */}
            <div className="department-section">
              <HRDepartmentChart />
            </div>

          </div>

          {/* Recent Activities */}
          <div className="recent-activities-section">
            <HRLeaveRequests />
          </div>

        </div>

      </div>

    </div>
  );
}

export default HRDashboard;