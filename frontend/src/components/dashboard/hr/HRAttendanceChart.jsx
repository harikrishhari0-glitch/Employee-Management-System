import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import "./HRAttendanceChart.css";

const data = [
  { department: "Engineering", attendance: 96, color: "#4F86F7" },
  { department: "Design", attendance: 98, color: "#29C5E8" },
  { department: "Marketing", attendance: 91, color: "#9B7CF5" },
  { department: "Sales", attendance: 89, color: "#38D39F" },
  { department: "HR", attendance: 99, color: "#FF9640" },
  { department: "Finance", attendance: 97, color: "#EC66B3" },
];

const colors = [
  "#3B82F6",
  "#60A5FA",
  "#3B82F6",
  "#60A5FA",
  "#3B82F6",
  "#60A5FA",
];

function HRAttendanceChart() {
  return (
    <div className="attendance-card">

      <div className="chart-header">
        <h3>Attendance by Department</h3>
        <p>Current month's attendance percentage</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: -15,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="department"
            tick={{ fill: "#8EA1C1", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[80, 100]}
            tick={{ fill: "#8EA1C1" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Bar
             dataKey="attendance"
             radius={[8, 8, 0, 0]}
             barSize={38}
          >
            {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default HRAttendanceChart;