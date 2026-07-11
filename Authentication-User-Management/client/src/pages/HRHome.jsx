import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

function HRHome() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#091321",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "40px",
      }}
    >
      <h1>HR Login Successful 🎉</h1>

      <p>Welcome, {user?.full_name}</p>

      <p>This is a temporary page until the Dashboard module is integrated.</p>

      <div style={{ width: "220px" }}>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default HRHome;