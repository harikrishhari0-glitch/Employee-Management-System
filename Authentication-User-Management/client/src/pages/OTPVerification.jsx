import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import OTPInput from "../components/OTPInput";
import Button from "../components/Button";

import { verifyOTP, forgotPassword } from "../services/authService";

function OTPVerification() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await verifyOTP({
        email,
        otp,
      });

      alert(response.message);

      navigate("/reset-password");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "OTP verification failed."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleResendOTP = async () => {

    try {

      setLoading(true);

      const response = await forgotPassword(email);

      alert(response.message);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to resend OTP."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout>

      <h1 className="page-title">
        Enter OTP
      </h1>

      <p className="page-subtitle">
        Enter the 6-digit verification code sent to your email.
      </p>

      <form onSubmit={handleSubmit}>

        <OTPInput
          value={otp}
          onChange={setOtp}
          length={6}
        />

        <Button
          type="submit"
          loading={loading}
        >
          Verify OTP
        </Button>

      </form>

      <p className="auth-footer">

        Didn't receive the code?

        <span
          className="auth-link"
          onClick={handleResendOTP}
          style={{
            cursor: "pointer",
            marginLeft: "6px"
          }}
        >
          Resend OTP
        </span>

      </p>

      <p className="auth-footer">

        <Link to="/login">

          ← Back to Login

        </Link>

      </p>

    </AuthLayout>

  );

}

export default OTPVerification;