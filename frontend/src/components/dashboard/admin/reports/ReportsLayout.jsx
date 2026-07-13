import { useState } from "react";

import ReportsHeader from "./ReportsHeader";
import ReportsTabs from "./ReportsTabs";

import HeadcountChart from "./HeadcountChart";
import DepartmentPieChart from "./DepartmentPieChart";

import PayrollTab from "./payroll/PayrollTab";
import AttendanceTab from "./attendance/AttendanceTab";
import LeaveTab from "./leave/LeaveTab";
import PerformanceTab from "./performance/PerformanceTab";


import "../../../../styles/reports/reportsLayout.css";

function ReportsLayout() {

  const [activeTab, setActiveTab] = useState("Headcount");

  return (
    <div className="reports-page">

      {/* Header */}
      <ReportsHeader />

      {/* Tabs */}
      <ReportsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Headcount */}
      {activeTab === "Headcount" && (
        <div className="reports-grid">

          <HeadcountChart />

          <DepartmentPieChart />

        </div>
      )}

      {/* Payroll */}
      {activeTab === "Payroll" && (
        <PayrollTab />
      )}

      {/* Attendance */}
      {activeTab === "Attendance" && (
        <AttendanceTab />
      )}

      {/* Leave */}
      {/* Leave */}
      {activeTab === "Leave" && (
  <LeaveTab />
    )}

      {/* Performance */}
    {activeTab === "Performance" && (
        <PerformanceTab />
    )}
    </div>
  );
}

export default ReportsLayout;