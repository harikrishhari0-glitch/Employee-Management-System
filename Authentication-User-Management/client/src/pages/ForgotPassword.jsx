import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";

import { forgotPassword } from "../services/authService";
import { FiMail } from "react-icons/fi";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await forgotPassword(email);

      alert(response.message);

      localStorage.setItem("resetEmail", email);

      navigate("/otp");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send OTP."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout>

      <h1 className="page-title">
        Forgot Password
      </h1>

      <p className="page-subtitle">
        Enter your email address and we'll send you a verification code.
      </p>

      <form onSubmit={handleSubmit}>

        <InputField
          label="Email"
          required
          name="email"
          icon={<FiMail />}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          loading={loading}
        >
          Send OTP
        </Button>

      </form>

      <p className="auth-footer">

        Remember your password?

        <Link to="/login">
          Sign In
        </Link>

      </p>

    </AuthLayout>

  );

}

export default ForgotPassword;