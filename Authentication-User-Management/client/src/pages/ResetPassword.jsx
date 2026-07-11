import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import PasswordToggle from "../components/PasswordToggle";
import Button from "../components/Button";

import { resetPassword } from "../services/authService";

import { FiLock } from "react-icons/fi";

function ResetPassword() {

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const response = await resetPassword({
        email,
        password,
      });

      alert(response.message);

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Password reset failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout>

      <h1 className="page-title">
        Reset Password
      </h1>

      <p className="page-subtitle">
        Create a new password for your Employee Management account.
      </p>

      <form onSubmit={handleSubmit}>

        <InputField
          label="New Password"
          required
          name="password"
          icon={<FiLock />}
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >

          <PasswordToggle
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

        </InputField>

        <InputField
          label="Confirm Password"
          required
          name="confirmPassword"
          icon={<FiLock />}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        >

          <PasswordToggle
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />

        </InputField>

        <Button
          type="submit"
          loading={loading}
        >
          Reset Password
        </Button>

      </form>

      <p className="auth-footer">

        Back to

        <Link to="/login">

          Sign In

        </Link>

      </p>

    </AuthLayout>

  );

}

export default ResetPassword;