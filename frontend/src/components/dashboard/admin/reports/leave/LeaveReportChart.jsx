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

import "./LeaveReportChart.css";

const data = [
  {
    department: "Engineering",
    annual: 10,
    sick: 3,
    personal: 2,
  },
  {
    department: "Design",
    annual: 8,
    sick: 2,
    personal: 1,
  },
  {
    department: "Marketing",
    annual: 7,
    sick: 4,
    personal: 2,
  },
  {
    department: "Sales",
    annual: 9,
    sick: 3,
    personal: 2,
  },
  {
    department: "HR",
    annual: 6,
    sick: 2,
    personal: 1,
  },
];

function LeaveReportChart() {
  return (
    <div className="leave-card">

      <div className="leave-header">
        <h3>Leave Utilization — 2024</h3>
      </div>

      <ResponsiveContainer width="100%" height={380}>

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 20,
          }}
          barCategoryGap={45}
        >

          <CartesianGrid
            stroke="#22324B"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="department"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#7D91B1",
              fontSize: 14,
            }}
          />

          <YAxis
            domain={[0, 12]}
            ticks={[0, 3, 6, 9, 12]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#7D91B1",
              fontSize: 14,
            }}
          />

          <Tooltip
            cursor={{
              fill: "rgba(255,255,255,0.05)",
            }}
            contentStyle={{
              background: "#172235",
              border: "1px solid #2B3D59",
              borderRadius: "14px",
              color: "#fff",
              padding: "12px 16px",
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: 700,
            }}
            itemStyle={{
              color: "#D8E3F8",
              fontWeight: 500,
            }}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              paddingTop: "18px",
              color: "#D8E3F8",
              fontSize: "14px",
            }}
          />

          <Bar
            dataKey="annual"
            name="Annual Leave"
            fill="#3B82F6"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />

          <Bar
            dataKey="sick"
            name="Sick Leave"
            fill="#EF4444"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />

          <Bar
            dataKey="personal"
            name="Personal Leave"
            fill="#A855F7"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default LeaveReportChart;