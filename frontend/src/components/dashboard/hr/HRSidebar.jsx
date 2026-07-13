import {
  Building2,
  PanelLeft,
  LayoutDashboard,
  Users,
  CalendarCheck2,
  BriefcaseBusiness,
  Building,
  TrendingUp,
  LogOut,
} from "lucide-react";

import "./HRSidebar.css";

function HRSidebar() {
  return (
    <aside className="hr-sidebar">

      {/* Logo */}
      <div className="sidebar-top">

        <div className="logo-section">

          <div className="logo-box">
            <Building2 size={22} strokeWidth={2.2} />
          </div>

          <div className="logo-text">
            <h2>Nexus HR</h2>
          </div>

          <PanelLeft size={20} className="collapse-icon" />

        </div>

      </div>

      {/* Portal Label */}
      <p className="portal-label">
        HR PORTAL
      </p>

      {/* Navigation */}
      <nav className="sidebar-menu">

        <div className="menu-item active">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </div>

        <div className="menu-item">
          <Users size={20} />
          <span>Employees</span>
        </div>

        <div className="menu-item">
          <CalendarCheck2 size={20} />
          <span>Leave Approval</span>
        </div>

        <div className="menu-item">
          <BriefcaseBusiness size={20} />
          <span>Recruitment</span>
        </div>

        <div className="menu-item">
          <Building size={20} />
          <span>Departments</span>
        </div>

        <div className="menu-item">
          <TrendingUp size={20} />
          <span>Performance</span>
        </div>

      </nav>

      {/* Bottom Profile */}
      <div className="sidebar-footer">

        <div className="user-info">

          <div className="avatar">
            SM
          </div>

          <div>

            <h4>Sarah Mitchell</h4>

            <p>HR Manager</p>

          </div>

        </div>

        <LogOut size={20} className="logout-icon" />

      </div>

    </aside>
  );
}

export default HRSidebar;