import {
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineTrendingUp,
} from "react-icons/hi";

import "../../../styles/adminStatsCards.css";

const stats = [
  {
    title: "TOTAL HEADCOUNT",
    value: "108",
    subtitle: "+6 this month",
    icon: <HiOutlineUsers />,
    iconBg: "#163D72",
    iconColor: "#56A3FF",
  },
  {
    title: "MONTHLY PAYROLL",
    value: "$1.08M",
    subtitle: "+$20k vs May",
    icon: <HiOutlineCurrencyDollar />,
    iconBg: "#123E39",
    iconColor: "#17F3AF",
  },
  {
    title: "AVG TENURE",
    value: "2.4 yrs",
    subtitle: "Across company",
    icon: <HiOutlineClock />,
    iconBg: "#3B235F",
    iconColor: "#B86BFF",
  },
  {
    title: "RETENTION RATE",
    value: "94.4%",
    subtitle: "Last 12 months",
    icon: <HiOutlineTrendingUp />,
    iconBg: "#123A4F",
    iconColor: "#1BD7FF",
  },
];

function AdminStatsCards() {
  return (
    <div className="admin-stats-grid">
      {stats.map((item) => (
        <div className="admin-card" key={item.title}>

          <div className="admin-card-top">

            <span className="admin-title">
              {item.title}
            </span>

            <div
              className="admin-icon-box"
              style={{ background: item.iconBg }}
            >
              <span
                className="admin-icon"
                style={{ color: item.iconColor }}
              >
                {item.icon}
              </span>
            </div>

          </div>

          <div className="admin-card-body">

            <h2>{item.value}</h2>

            <p>{item.subtitle}</p>

          </div>

        </div>
      ))}
    </div>
  );
}

export default AdminStatsCards;