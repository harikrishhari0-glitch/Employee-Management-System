import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordToggle({ showPassword, setShowPassword }) {
  return (
    <span
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
      role="button"
      tabIndex={0}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </span>
  );
}

export default PasswordToggle;