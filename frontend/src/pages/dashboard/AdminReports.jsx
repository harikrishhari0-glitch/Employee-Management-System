import AdminSidebar from "../../components/dashboard/admin/AdminSidebar";
import AdminNavbar from "../../components/dashboard/admin/AdminNavbar";

import ReportsLayout from "../../components/dashboard/admin/reports/ReportsLayout";

import "../../styles/adminDashboard.css";

function AdminReports() {

  return (

    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="admin-main">

        <AdminNavbar />

        <div className="admin-content">

          <ReportsLayout />

        </div>

      </div>

    </div>

  );

}

export default AdminReports;