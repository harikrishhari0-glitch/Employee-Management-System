import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import "../../../../styles/reports/departmentPieChart.css";

const data = [
  { name: "Engineering", value: 42, color: "#4F8DFF" },
  { name: "Sales", value: 25, color: "#21C98B" },
  { name: "Marketing", value: 18, color: "#8B6BF4" },
  { name: "Design", value: 15, color: "#2CC7E8" },
  { name: "Finance", value: 10, color: "#FF5B7F" },
  { name: "HR", value: 8, color: "#FF9A3C" },
];

function DepartmentPieChart() {
  return (
    <div className="department-card">

      <div className="department-header">
        <div>
          <h3>By Department</h3>
          <p>Current employee distribution</p>
        </div>
      </div>

      <div className="department-chart">

        <ResponsiveContainer width="100%" height={340}>

          <PieChart>

            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;

                  return (
                    <div
                      style={{
                        background: "#101B2D",
                        border: "1px solid #273752",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        color: "#fff",
                        boxShadow: "0 8px 24px rgba(0,0,0,.35)",
                      }}
                    >
                      <div
                        style={{
                          color: item.color,
                          fontWeight: 700,
                          marginBottom: 6,
                        }}
                      >
                        {item.name}
                      </div>

                      <div>
                        Employees: <strong>{item.value}</strong>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={105}
              paddingAngle={2}
              stroke="#1A2538"
              strokeWidth={2}
            >
              {data.map((item) => (
                <Cell
                  key={item.name}
                  fill={item.color}
                />
              ))}
            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DepartmentPieChart;