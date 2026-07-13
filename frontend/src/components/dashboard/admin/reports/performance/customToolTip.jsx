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
            marginBottom: "10px",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          {label}
        </p>

        {payload.map((entry, index) => (
          <p
            key={index}
            style={{
              color: entry.color,
              margin: "6px 0",
              fontSize: "14px",
            }}
          >
            {entry.name}: <strong>{entry.value} Employees</strong>
          </p>
        ))}
      </div>
    );
  }

  return null;
}

export default CustomTooltip;