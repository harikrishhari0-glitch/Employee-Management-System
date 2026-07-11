import { useRef } from "react";

function OTPInput({ value, onChange, length = 6 }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");

    const newOTP = [...value];
    newOTP[index] = digit;

    onChange(newOTP.join(""));

    if (digit && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newOTP = [...value];
        newOTP[index] = "";
        onChange(newOTP.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    const otp = paste.split("");

    while (otp.length < length) {
      otp.push("");
    }

    onChange(otp.join(""));

    const lastIndex = Math.min(paste.length, length - 1);

    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  return (
    <div className="otp-container">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          className="otp-box"
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

export default OTPInput;