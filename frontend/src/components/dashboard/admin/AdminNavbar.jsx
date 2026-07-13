import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

import "../../../styles/AdminNavbar.css";

function AdminNavbar() {
  return (
    <header className="admin-navbar">

      {/* Search Box */}
      <div className="admin-search">

        <HiOutlineSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search employees, reports..."
        />

      </div>

      {/* Right Side */}
      <div className="admin-navbar-right">

        <button className="admin-icon-btn">
          <HiOutlineCog />
        </button>

        <button className="admin-icon-btn notification-btn">

          <HiOutlineBell />

          <span className="notification-badge"></span>

        </button>

        <div className="admin-user">

          <div className="admin-avatar">
            JR
          </div>

          <div>

            <h4>James Rodriguez</h4>

            <p>System Admin</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;