import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "../../../styles/adminEmployeeGrowthChart.css";

const data = [
  { month: "Jan", headcount: 95, hires: 4, exits: 1 },
  { month: "Feb", headcount: 98, hires: 5, exits: 2 },
  { month: "Mar", headcount: 101, hires: 6, exits: 3 },
  { month: "Apr", headcount: 104, hires: 5, exits: 2 },
  { month: "May", headcount: 108, hires: 7, exits: 3 },
  { month: "Jun", headcount: 112, hires: 6, exits: 2 },
];

// Custom Tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const d = payload[0].payload;

  return (
    <div
      style={{
        background: "#162235",
        border: "1px solid #24344F",
        borderRadius: "14px",
        padding: "14px 18px",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
      }}
    >
      <h4
        style={{
          margin: "0 0 12px",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        {label}
      </h4>

      <p style={{ margin: "6px 0" }}>
        👥 <strong>Headcount:</strong> {d.headcount}
      </p>

      <p style={{ margin: "6px 0", color: "#22C55E" }}>
        ➕ <strong>Hires:</strong> {d.hires}
      </p>

      <p style={{ margin: "6px 0", color: "#EF4444" }}>
        ➖ <strong>Exits:</strong> {d.exits}
      </p>
    </div>
  );
}

function AdminEmployeeGrowth() {
  return (
    <div className="admin-growth-card">

      <div className="growth-header">
        <h3>Employee Growth — 2024</h3>
      </div>

      <div className="growth-chart">

        <ResponsiveContainer width="100%" height={290}>

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="employeeFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.30} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#223149"
              strokeDasharray="4 4"
              vertical={true}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#7E93B5", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[90, 120]}
              ticks={[90, 95, 100, 105, 110, 115, 120]}
              tick={{ fill: "#7E93B5", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="headcount"
              stroke="#4F8DFF"
              strokeWidth={3}
              fill="url(#employeeFill)"
              activeDot={{
                r: 6,
                fill: "#4F8DFF",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AdminEmployeeGrowth;