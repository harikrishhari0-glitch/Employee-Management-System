import {
  Search,
  Bell,
  Sun,
} from "lucide-react";

import "../../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      {/* Search */}

      <div className="search-container">

        <Search size={18} className="search-icon"/>

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Right */}

      <div className="navbar-right">

        <button className="icon-button">
          <Sun size={18}/>
        </button>

        <button className="icon-button notification-button">

          <Bell size={18}/>

          <span className="dot"></span>

        </button>

        <div className="user-info">

          <div className="avatar">

            AC

          </div>

          <div>

            <h4>Alex Chen</h4>

            <p>Senior Engineer</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;