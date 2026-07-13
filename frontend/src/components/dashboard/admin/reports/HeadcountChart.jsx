import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "../../../../styles/reports/headcountChart.css";

const data = [
  { month: "Feb", headcount: 100 },
  { month: "Mar", headcount: 102 },
  { month: "Apr", headcount: 104 },
  { month: "May", headcount: 106 },
  { month: "Jun", headcount: 108 },
  { month: "Jul", headcount: 110 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;

  return (
    <div className="headcount-tooltip">
      <h4>{label}</h4>

      <p>
        Headcount:
        <span>{payload[0].value}</span>
      </p>
    </div>
  );
}

export default function HeadcountChart() {
  return (
    <div className="headcount-card">

      <div className="headcount-header">
        <div>
          <h3>Headcount Growth</h3>
          <p>Monthly employee growth</p>
        </div>
      </div>

      <div className="headcount-chart">

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={data}>

            <CartesianGrid
              stroke="#243349"
              strokeDasharray="4 4"
              vertical
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#7083A7", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 120]}
              ticks={[0, 30, 60, 90, 120]}
              tick={{ fill: "#7083A7", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#9CA3AF",
                strokeWidth: 1,
              }}
            />

            <Line
              dataKey="headcount"
              stroke="#4F8DFF"
              strokeWidth={3}
              dot={{
                r: 5,
                stroke: "#4F8DFF",
                strokeWidth: 2,
                fill: "#4F8DFF",
              }}
              activeDot={{
                r: 6,
                stroke: "#ffffff",
                strokeWidth: 2,
                fill: "#4F8DFF",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}