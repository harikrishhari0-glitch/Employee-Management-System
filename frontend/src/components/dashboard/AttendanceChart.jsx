import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const colors = [
  "#F59E0B",
  "#FBBF24",
  "#F59E0B",
  "#FBBF24",
  "#D97706",
  "#F59E0B",
];

function AttendanceChart({ data }) {
  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-700 p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Attendance
          </h2>

          <p className="text-sm text-slate-400">
            Last 6 Months
          </p>
        </div>
      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              stroke="#1E293B"
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#94A3B8", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[80, 100]}
              tick={{ fill: "#94A3B8", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(245,158,11,0.08)" }}
              contentStyle={{
                background: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="attendance"
              radius={[8, 8, 0, 0]}
              barSize={38}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AttendanceChart;