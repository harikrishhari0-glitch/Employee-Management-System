import {
  HiOutlineServer,
  HiOutlineCircleStack,
  HiOutlineShieldCheck,
  HiOutlineArchiveBox,
} from "react-icons/hi2";

import { FiRefreshCw } from "react-icons/fi";

import "./AdminSystemHealth.css";

const systems = [
  {
    icon: <HiOutlineServer />,
    title: "API Server",
    uptime: "99.98%",
    latency: "45ms",
    status: "healthy",
    color: "green",
  },
  {
    icon: <HiOutlineCircleStack />,
    title: "Database",
    uptime: "99.99%",
    latency: "12ms",
    status: "healthy",
    color: "green",
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: "Auth Service",
    uptime: "98.5%",
    latency: "230ms",
    status: "degraded",
    color: "yellow",
  },
  {
    icon: <HiOutlineArchiveBox />,
    title: "Storage",
    uptime: "100%",
    latency: "8ms",
    status: "healthy",
    color: "green",
  },
];

function AdminSystemHealth() {
  return (
    <div className="system-health-card">
      <div className="system-header">
        <h3>System Health</h3>

        <button className="refresh-btn">
          <FiRefreshCw />
          <span>Refresh</span>
        </button>
      </div>

      <div className="system-grid">
        {systems.map((item, index) => (
          <div className="system-item" key={index}>
            <div className={`system-icon ${item.color}`}>
              {item.icon}
            </div>

            <div className="system-info">
              <h4>{item.title}</h4>

              <p>
                Uptime {item.uptime} · Latency {item.latency}
              </p>
            </div>

            <span className={`status-badge ${item.color}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSystemHealth;