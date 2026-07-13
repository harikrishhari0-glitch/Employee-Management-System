import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
 YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./payrollChart.css";

const data = [
  { month: "Feb", payroll: 9.8, overhead: 2.2 },
  { month: "Mar", payroll: 10.2, overhead: 2.4 },
  { month: "Apr", payroll: 10.4, overhead: 2.6 },
  { month: "May", payroll: 10.6, overhead: 2.8 },
  { month: "Jun", payroll: 10.8, overhead: 3.0 },
  { month: "Jul", payroll: 11.0, overhead: 3.2 },
];

function PayrollChart() {
  return (
    <div className="payroll-card">

      <h3>Payroll Trend ($M)</h3>

      <ResponsiveContainer width="100%" height={380}>

        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 20,
            left: 20,
            bottom: 40,
          }}
        >

          <CartesianGrid
            stroke="#223149"
            strokeDasharray="4 4"
            vertical={true}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6F89AF", fontSize: 15 }}
          />

          <YAxis
            domain={[0, 12]}
            ticks={[0, 3, 6, 9, 12]}
            tickFormatter={(v) => `$${v}M`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6F89AF", fontSize: 15 }}
          />

          <Tooltip
            contentStyle={{
              background: "#162235",
              border: "1px solid #2D4362",
              borderRadius: "14px",
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="square"
            wrapperStyle={{
              color: "#fff",
              paddingTop: 20,
              fontSize: 14,
            }}
          />

          <Bar
            dataKey="payroll"
            fill="#5B8EF9"
            radius={[4, 4, 0, 0]}
            barSize={24}
            name="Total Payroll"
          />

          <Bar
            dataKey="overhead"
            fill="#FF8A1F"
            radius={[4, 4, 0, 0]}
            barSize={12}
            name="Overhead"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PayrollChart;