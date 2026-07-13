import {
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentReport,
  HiOutlineCog,
  HiOutlineShieldCheck,
  HiOutlineMenu,
} from "react-icons/hi";

import { FaLayerGroup } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import "../../../styles/AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">

        <div className="logo-box">
          <FaLayerGroup />
        </div>

        <div className="logo-text">
          <h2>Nexus HR</h2>
        </div>

        <HiOutlineMenu className="menu-icon" />

      </div>

      <p className="portal-title">ADMIN PORTAL</p>

      <nav className="admin-menu">

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <HiOutlineChartBar />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className="menu-item"
        >
          <HiOutlineUsers />
          <span>User Management</span>
        </NavLink>

        <NavLink
          to="/admin/payroll"
          className="menu-item"
        >
          <HiOutlineCurrencyDollar />
          <span>Payroll</span>
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <HiOutlineDocumentReport />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className="menu-item"
        >
          <HiOutlineCog />
          <span>System Settings</span>
        </NavLink>

        <NavLink
          to="/admin/audit"
          className="menu-item"
        >
          <HiOutlineShieldCheck />
          <span>Audit Logs</span>
        </NavLink>

      </nav>

      {/* Bottom Profile */}
      <div className="admin-profile">

        <div className="profile-avatar">
          JR
        </div>

        <div className="profile-info">
          <h4>James Rodriguez</h4>
          <p>System Admin</p>
        </div>

      </div>

    </aside>
  );
}

export default AdminSidebar;