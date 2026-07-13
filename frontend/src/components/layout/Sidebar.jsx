import {
  FiHome,
  FiUser,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiCheckSquare,
  FiTrendingUp,
  FiMessageSquare,
  FiBell,
  FiBookOpen,
  FiFileText,
  FiSettings,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

import { FaLayerGroup } from "react-icons/fa";

import "../../styles/sidebar.css";

const menuItems = [
  { icon: <FiHome />, text: "Dashboard", active: true },
  { icon: <FiUser />, text: "Profile" },
  { icon: <FiClock />, text: "Attendance" },
  { icon: <FiCalendar />, text: "Leave" },
  { icon: <FiDollarSign />, text: "Payroll" },
  { icon: <FiCheckSquare />, text: "Tasks" },
  { icon: <FiTrendingUp />, text: "Performance" },
  { icon: <FiMessageSquare />, text: "Chat" },
  { icon: <FiBell />, text: "Notifications" },
  { icon: <FiBookOpen />, text: "Training" },
  { icon: <FiFileText />, text: "Documents" },
  { icon: <FiSettings />, text: "Settings" },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <div className="logo">

          <div className="logo-icon">
            <FaLayerGroup />
          </div>

          <span>Nexus HR</span>

        </div>

        <FiMenu className="menu-icon" />

      </div>

      <div className="portal-title">
        EMPLOYEE PORTAL
      </div>

      <ul className="sidebar-menu">

        {menuItems.map((item) => (

          <li
            key={item.text}
            className={item.active ? "active" : ""}
          >

            {item.icon}

            <span>{item.text}</span>

          </li>

        ))}

      </ul>

      <div className="sidebar-profile">

        <div className="avatar">

          AC

        </div>

        <div>

          <h4>Alex Chen</h4>

          <p>Senior Engineer</p>

        </div>

        <FiLogOut />

      </div>

    </aside>
  );
}

export default Sidebar;