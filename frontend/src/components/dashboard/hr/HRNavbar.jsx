import {
  Search,
  Settings,
  Bell,
} from "lucide-react";

import "./HRNavbar.css";

function HRNavbar() {
  return (
    <header className="hr-navbar">

      {/* Search Box */}

      <div className="search-container">

        <Search size={18} className="search-icon" />

        <input
          type="text"
          placeholder="Search employees, departments..."
        />

      </div>

      {/* Right Side */}

      <div className="navbar-right">

        <button className="icon-btn">
          <Settings size={20} />
        </button>

        <button className="icon-btn notification-btn">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <div className="navbar-profile">

          <div className="navbar-avatar">
            SM
          </div>

          <div>

            <h4>Sarah Mitchell</h4>

            <p>HR Manager</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default HRNavbar;