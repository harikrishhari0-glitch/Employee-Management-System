import {
  FiUser,
  FiBriefcase,
  FiShield,
} from "react-icons/fi";

function RoleSelector({ role, setRole }) {
  const roles = [
    {
      value: "employee",
      label: "Employee",
      icon: <FiUser />,
    },
    {
      value: "hr",
      label: "HR",
      icon: <FiBriefcase />,
    },
    {
      value: "admin",
      label: "Admin",
      icon: <FiShield />,
    },
  ];

  return (
    <div className="role-selector">

      {roles.map((item) => (

        <button
          key={item.value}
          type="button"
          className={`role-btn ${
            role === item.value ? "active" : ""
          }`}
          onClick={() => setRole(item.value)}
        >

          <span className="role-icon">

            {item.icon}

          </span>

          <span>

            {item.label}

          </span>

        </button>

      ))}

    </div>
  );
}

export default RoleSelector;