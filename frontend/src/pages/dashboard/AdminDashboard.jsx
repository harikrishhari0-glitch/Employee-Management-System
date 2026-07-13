import AdminSidebar from "../../components/dashboard/admin/AdminSidebar";
import AdminNavbar from "../../components/dashboard/admin/AdminNavbar";
import AdminStatsCards from "../../components/dashboard/admin/AdminStatsCards";
import AdminEmployeeGrowth from "../../components/dashboard/admin/AdminEmployeeGrowthChart";
import AdminPayrollChart from "../../components/dashboard/admin/AdminPayrollChart";
import AdminSystemHealth from "../../components/dashboard/admin/AdminSystemHealth";

import "../../styles/adminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="admin-main">

        {/* Navbar */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <div className="admin-content">

          {/* Header */}
          <div className="admin-header">
            <h1>Analytics</h1>
            <p>Company-wide metrics and insights</p>
          </div>

          {/* Statistics Cards */}
          <div className="admin-stats">
            <AdminStatsCards />
          </div>

          {/* Charts */}
          <div className="admin-chart-row">

            <div className="admin-chart-left">
              <AdminEmployeeGrowth />
            </div>

            <div className="admin-chart-right">
              <AdminPayrollChart />
            </div>

          </div>

          {/* System Health */}
          <div className="admin-system-health">
            <AdminSystemHealth />
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;