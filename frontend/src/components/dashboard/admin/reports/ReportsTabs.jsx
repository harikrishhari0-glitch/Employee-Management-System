import "../../../../styles/reports/reportsTabs.css";

const tabs = [
  "Headcount",
  "Payroll",
  "Attendance",
  "Leave",
  "Performance",
];

function ReportsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="reports-tabs">

      {tabs.map((tab) => (

        <button
          key={tab}
          className={`report-tab ${
            activeTab === tab ? "active" : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>

      ))}

    </div>
  );
}

export default ReportsTabs;