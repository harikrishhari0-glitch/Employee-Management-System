import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import "./HRDepartmentChart.css";

const data = [
  { name: "Engineering", value: 42, color: "#3B82F6" },
  { name: "Design", value: 15, color: "#8B5CF6" },
  { name: "Marketing", value: 18, color: "#10B981" },
  { name: "Sales", value: 25, color: "#06B6D4" },
  { name: "HR", value: 8, color: "#F59E0B" },
  { name: "Finance", value: 10, color: "#EF4444" },
];

const totalEmployees = data.reduce((sum, item) => sum + item.value, 0);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div
        style={{
          background: "#162235",
          border: "1px solid #2B3E5A",
          borderRadius: "10px",
          padding: "12px 16px",
          color: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            color: item.color,
            fontWeight: 600,
            marginBottom: "8px",
            fontSize: "15px",
          }}
        >
          {item.name}
        </div>

        <div style={{ marginBottom: "4px" }}>
          Employees: <strong>{item.value}</strong>
        </div>

        <div>
          Share:{" "}
          <strong>
            {((item.value / totalEmployees) * 100).toFixed(1)}%
          </strong>
        </div>
      </div>
    );
  }

  return null;
};

function HRDepartmentChart() {
  return (
    <div className="department-card">

      <div className="department-header">
        <h3>Headcount by Department</h3>
        <p>Employee distribution</p>
      </div>

      <div className="department-content">

        <div className="pie-wrapper">

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
              />

              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={112}
                paddingAngle={2}
                stroke="#162235"
                strokeWidth={3}
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}
              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default HRDepartmentChart;