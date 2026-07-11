import "../styles/button.css";

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  fullWidth = true,
}) {
  return (
    <button
      type={type}
      className={`primary-button ${fullWidth ? "full-width" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="button-loader"></span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;