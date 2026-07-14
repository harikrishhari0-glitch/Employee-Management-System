import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "./HRAttendanceChart.css";

function HRAttendanceChart({ data = [] }) {

  return (
    <div className="attendance-card">

      <div className="chart-header">
        <h3>Attendance by Department</h3>
        <p>Current month's attendance percentage</p>
      </div>

      <div style={{ width: "100%", height: "320px" }}>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -15,
              bottom: 5,
            }}
          >

            <CartesianGrid
              stroke="#2A3A55"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="department"
              tick={{ fill: "#8EA1C1", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[80, 100]}
              tick={{ fill: "#8EA1C1", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.08)" }}
              contentStyle={{
                background: "#162235",
                border: "1px solid #24344F",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="attendance"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              barSize={38}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default HRAttendanceChart;