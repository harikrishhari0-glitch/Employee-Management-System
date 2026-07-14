import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import "./HRDepartmentChart.css";

const colors = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
];

const CustomTooltip = ({ active, payload, totalEmployees }) => {
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

function HRDepartmentChart({ data }) {

  const departmentData = data.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));

  const totalEmployees = departmentData.reduce(
    (sum, item) => sum + item.value,
    0
  );

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
                cursor={false}
                content={
                  <CustomTooltip totalEmployees={totalEmployees} />
                }
              />

              <Pie
                data={departmentData}
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
                {departmentData.map((entry) => (
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