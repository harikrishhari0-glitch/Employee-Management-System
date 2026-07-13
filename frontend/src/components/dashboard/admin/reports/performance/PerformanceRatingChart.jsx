import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./PerformanceRatingChart.css";

const data = [
  { rating: "5.0", employees: 8 },
  { rating: "4.5", employees: 24 },
  { rating: "4.0", employees: 38 },
  { rating: "3.5", employees: 22 },
  { rating: "3.0", employees: 12 },
  { rating: "<3", employees: 4 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#162235",
          border: "1px solid #2B3D59",
          borderRadius: "14px",
          padding: "12px 16px",
          color: "#fff",
          minWidth: "170px",
          boxShadow: "0 8px 20px rgba(0,0,0,.35)",
        }}
      >
        <p
          style={{
            margin: 0,
            marginBottom: "10px",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          Rating {label}
        </p>

        <p
          style={{
            margin: 0,
            color: "#F59E0B",
            fontSize: "14px",
          }}
        >
          👥 Employees : <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }

  return null;
}

function PerformanceRatingChart() {
  return (
    <div className="performance-rating-card">

      <div className="performance-rating-header">
        <h3>Rating Distribution</h3>
      </div>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart
          data={data}
          margin={{
            top: 15,
            right: 15,
            left: 0,
            bottom: 10,
          }}
          barCategoryGap={45}
        >

          <CartesianGrid
            stroke="#23324B"
            strokeDasharray="3 3"
            vertical
          />

          <XAxis
            dataKey="rating"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#7B8DAE",
              fontSize: 14,
            }}
          />

          <YAxis
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#7B8DAE",
              fontSize: 14,
            }}
          />

          <Tooltip
            cursor={{
              fill: "rgba(255,255,255,0.05)",
            }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="employees"
            fill="#F59E0B"
            radius={[6, 6, 0, 0]}
            barSize={28}
            activeBar={{
              fill: "#FBBF24",
              stroke: "#FFD36A",
              strokeWidth: 2,
            }}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PerformanceRatingChart;