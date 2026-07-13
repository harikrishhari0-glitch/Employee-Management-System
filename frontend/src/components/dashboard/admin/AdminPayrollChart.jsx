import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "../../../styles/adminPayrollChart.css";

const data = [
  { month: "Feb", payroll: 9.8, budget: 2.8 },
  { month: "Mar", payroll: 10.2, budget: 2.9 },
  { month: "Apr", payroll: 10.4, budget: 3.1 },
  { month: "May", payroll: 10.6, budget: 3.2 },
  { month: "Jun", payroll: 10.8, budget: 3.3 },
  { month: "Jul", payroll: 11.0, budget: 3.4 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="payroll-tooltip">

      <h4>{label}</h4>

      <div className="tooltip-row">

        <span
          className="tooltip-dot"
          style={{ background: "#22D3EE" }}
        ></span>

        <span>${payload[0].value}M</span>

      </div>

      <div className="tooltip-row">

        <span
          className="tooltip-dot"
          style={{ background: "#A855F7" }}
        ></span>

        <span>${payload[0].payload.budget}M</span>

      </div>

    </div>
  );
}

function AdminPayrollChart() {
  return (
    <div className="admin-payroll-card">

      <div className="payroll-header">
        <h3>Payroll Cost ($M) — 2024</h3>
      </div>

      <div className="payroll-chart">

        <ResponsiveContainer width="100%" height={290}>

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 15,
              left: -15,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="payrollFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#1CC8E8"
                  stopOpacity={0.18}
                />

                <stop
                  offset="100%"
                  stopColor="#1CC8E8"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#223149"
              strokeDasharray="4 4"
              vertical={true}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              padding={{ left: 0, right: 0 }}
              tick={{
                fill: "#8090AE",
                fontSize: 14,
              }}
            />

            <YAxis
              domain={[0, 12]}
              ticks={[0, 3, 6, 9, 12]}
              tickFormatter={(v) => `$${v}M`}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#8090AE",
                fontSize: 14,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#DDE6F7",
                strokeWidth: 1.2,
              }}
              content={<CustomTooltip />}
            />

            <Area
              type="monotone"
              dataKey="payroll"
              stroke="#7C8DFF"
              strokeWidth={2.6}
              fill="url(#payrollFill)"
              activeDot={{
                r: 6,
                fill: "#22D3EE",
                stroke: "#FFFFFF",
                strokeWidth: 3,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AdminPayrollChart;