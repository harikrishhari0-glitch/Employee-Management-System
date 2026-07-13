import {
  FaUsers,
  FaClock,
  FaBriefcase,
  FaRegCalendarAlt,
} from "react-icons/fa";

import "../../../styles/hrStatsCards.css";

function HRStatsCards() {
  const cards = [
    {
      title: "TOTAL EMPLOYEES",
      value: "108",
      subtitle: "+6 this month",
      icon: <FaUsers />,
      color: "#1B3B6F",
    },
    {
      title: "AVG ATTENDANCE",
      value: "94.2%",
      subtitle: "Across all depts",
      icon: <FaClock />,
      color: "#0E4A46",
    },
    {
      title: "OPEN POSITIONS",
      value: "8",
      subtitle: "4 departments",
      icon: <FaBriefcase />,
      color: "#40361F",
    },
    {
      title: "PENDING LEAVES",
      value: "3",
      subtitle: "Awaiting approval",
      icon: <FaRegCalendarAlt />,
      color: "#4B2C73",
    },
  ];

  return (
    <div className="hr-stats-grid">
      {cards.map((card, index) => (
        <div className="hr-stat-card" key={index}>
          {/* Icon */}
          <div
            className="hr-stat-icon"
            style={{ backgroundColor: card.color }}
          >
            {card.icon}
          </div>

          {/* Content */}
          <div className="hr-stat-content">
            <p>{card.title}</p>

            <h2>{card.value}</h2>

            <span>{card.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HRStatsCards;