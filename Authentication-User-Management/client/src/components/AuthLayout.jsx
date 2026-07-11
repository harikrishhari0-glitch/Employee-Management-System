import "../styles/auth.css";

import {
  FiUsers,
  FiBriefcase,
  FiActivity,
} from "react-icons/fi";

import { HiOutlineOfficeBuilding } from "react-icons/hi";

import { TbLayersIntersect } from "react-icons/tb";

const statistics = [
  {
    value: "108",
    title: "Employees",
    icon: <FiUsers />,
  },
  {
    value: "06",
    title: "Departments",
    icon: <HiOutlineOfficeBuilding />,
  },
  {
    value: "08",
    title: "Open Roles",
    icon: <FiBriefcase />,
  },
  {
    value: "99.9%",
    title: "Uptime",
    icon: <FiActivity />,
  },
];

function AuthLayout({ children }) {
  return (
    <div className="auth-container">

      {/* LEFT PANEL */}

      <div className="left-side">

        <div className="brand">

          <div className="brand-logo">

            <TbLayersIntersect />

          </div>

          <div className="brand-text">

            <h2>Nexus Technologies</h2>

          </div>

        </div>

        <div className="hero-section">

          <h1>
            People-first
            <br />
            workforce platform
          </h1>

          <p>
            Streamline HR operations, track performance,
            and empower your team — all in one secure,
            modern workspace.
          </p>

        </div>

        <div className="statistics-grid">

          {statistics.map((item) => (

            <div
              className="statistics-card"
              key={item.title}
            >

              <div className="statistics-icon">

                {item.icon}

              </div>

              <h3>{item.value}</h3>

              <p>{item.title}</p>

            </div>

          ))}

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="right-side">

        <div className="auth-card">

          {children}

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;