import {
  FaUsers,
  FaClock,
  FaBriefcase,
  FaRegCalendarAlt,
} from "react-icons/fa";

import "../../../styles/hrStatsCards.css";

function HRStatsCards({ stats }) {

  const cards = [

    {
      title: "TOTAL EMPLOYEES",
      value: stats.totalEmployees,
      subtitle: "Company Employees",
      icon: <FaUsers />,
      color: "#1B3B6F",
    },

    {
      title: "ACTIVE EMPLOYEES",
      value: stats.activeEmployees,
      subtitle: "Currently Working",
      icon: <FaBriefcase />,
      color: "#0E4A46",
    },

    {
      title: "ON LEAVE",
      value: stats.onLeave,
      subtitle: "Employees on Leave",
      icon: <FaRegCalendarAlt />,
      color: "#40361F",
    },

    {
      title: "AVG ATTENDANCE",
      value: `${stats.avgAttendance}%`,
      subtitle: "Current Month",
      icon: <FaClock />,
      color: "#4B2C73",
    },

  ];

  return (

    <div className="hr-stats-grid">

      {cards.map((card, index) => (

        <div
          className="hr-stat-card"
          key={index}
        >

          <div
            className="hr-stat-icon"
            style={{
              backgroundColor: card.color,
            }}
          >
            {card.icon}
          </div>

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