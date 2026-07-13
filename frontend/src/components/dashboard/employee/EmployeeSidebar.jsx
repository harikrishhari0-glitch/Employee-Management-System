import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

import "../../../styles/employeeSidebar.css";

function EmployeeSidebar() {
  return (
    <aside className="employee-sidebar">

      <div className="employee-logo">
        <h2>Nexus HR</h2>
      </div>

      <nav>

        <NavLink
          to="/employee"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <HiOutlineHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employee/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <HiOutlineUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="#" className="sidebar-item">
          <HiOutlineCalendar />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="#" className="sidebar-item">
          <HiOutlineClipboardDocumentList />
          <span>Leave</span>
        </NavLink>

        <NavLink to="#" className="sidebar-item">
          <HiOutlineDocumentText />
          <span>Documents</span>
        </NavLink>

        <NavLink to="#" className="sidebar-item">
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default EmployeeSidebar;