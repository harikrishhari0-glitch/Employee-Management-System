import "../styles/input.css";

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  error = "",
  children,
}) {
  return (
    <div className="input-field">

      <label className="input-label">
        {label}
        {required && (
          <span className="required">*</span>
        )}
      </label>

      <div
        className={`input-wrapper ${
          error ? "error-border" : ""
        }`}
      >

        {icon && (
          <span className="left-icon">
            {icon}
          </span>
        )}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />

        {children}

      </div>

      {error && (
        <p className="input-error">
          {error}
        </p>
      )}

    </div>
  );
}

export default InputField;