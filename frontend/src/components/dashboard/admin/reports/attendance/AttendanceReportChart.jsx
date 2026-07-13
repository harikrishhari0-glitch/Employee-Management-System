import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import "./AttendanceReportChart.css";

const data = [
  { month: "Feb", present: 19, absent: 1, late: 0 },
  { month: "Mar", present: 21, absent: 2, late: 1 },
  { month: "Apr", present: 20, absent: 2, late: 0 },
  { month: "May", present: 23, absent: 1, late: 0 },
  { month: "Jun", present: 20, absent: 2, late: 0 },
  { month: "Jul", present: 15, absent: 1, late: 0 },
];

function AttendanceReportChart() {
  return (
    <div className="attendance-card">
      <div className="attendance-header">
        <h3>Company Attendance — 2024</h3>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
          barCategoryGap={70}
        >
          <CartesianGrid
            stroke="#22324B"
            strokeDasharray="4 4"
            vertical
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#7287A7", fontSize: 15 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 24]}
            ticks={[0, 6, 12, 18, 24]}
            tick={{ fill: "#7287A7", fontSize: 15 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="present"
            fill="#36D399"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="absent"
            fill="#FF5A5A"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="late"
            fill="#FF9A3C"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceReportChart;