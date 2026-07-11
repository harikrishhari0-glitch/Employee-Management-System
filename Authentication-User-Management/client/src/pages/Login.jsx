import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import RoleSelector from "../components/RoleSelector";
import InputField from "../components/InputField";
import PasswordToggle from "../components/PasswordToggle";
import OTPInput from "../components/OTPInput";
import Button from "../components/Button";

import {
  loginUser,
  forgotPassword,
  verifyOTP,
} from "../services/authService";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [role, setRole] = useState("employee");
  const [loginType, setLoginType] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      // Store user and token using Auth Context
      login(response.user, response.token);

alert(response.message);

const userRole = response.user.role?.toLowerCase();

if (userRole === "admin") {

  navigate("/admin");

}
else if (userRole === "hr") {

  navigate("/hr");

}
else {

  navigate("/employee");

}

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleSendOTP = async () => {

    if (!email.trim()) {
      alert("Please enter your email first.");
      return;
    }

    try {

      setLoading(true);

      const response = await forgotPassword(email);

      alert(response.message);

      setOtpSent(true);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send OTP."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleOTPLogin = async () => {

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

  return (

    <AuthLayout>

      <div className="auth-box">

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue to your Employee Management
          System.
        </p>

        <RoleSelector
          role={role}
          setRole={setRole}
        />

        <div className="tabs">

          <button
            type="button"
            className={
              loginType === "password"
                ? "tab active"
                : "tab"
            }
            onClick={() => {
              setLoginType("password");
              setOtpSent(false);
            }}
          >
            Password
          </button>

          <button
            type="button"
            className={
              loginType === "otp"
                ? "tab active"
                : "tab"
            }
            onClick={() => setLoginType("otp")}
          >
            OTP
          </button>

        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FiMail />}
          required
        />

        {loginType === "password" && (

          <form onSubmit={handlePasswordLogin}>

            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FiLock />}
              required
            >

              <PasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

            </InputField>

            <div className="forgot-link">

              <Link to="/forgot-password">

                Forgot Password?

              </Link>

            </div>

            <Button
              type="submit"
              loading={loading}
            >

              Sign In

            </Button>

          </form>

        )}

        {loginType === "otp" && (

          <div>

            {!otpSent ? (

              <>

                <p
                  style={{
                    color: "#94A3B8",
                    marginBottom: "20px",
                  }}
                >
                  Click below to receive a
                  One-Time Password.
                </p>

                <Button
                  onClick={handleSendOTP}
                  loading={loading}
                >

                  Send OTP

                </Button>

              </>

            ) : (

              <>

                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  length={6}
                />

                <Button
                  onClick={handleOTPLogin}
                  loading={loading}
                >

                  Verify & Sign In

                </Button>

                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >

                  <button
                    type="button"
                    className="tab"
                    onClick={() => setOtpSent(false)}
                  >

                    ← Back

                  </button>

                </div>

              </>

            )}

          </div>

        )}

        <div className="bottom-link">

          Don't have an account?{" "}

          <Link to="/register">

            Sign Up

          </Link>

        </div>

      </div>

    </AuthLayout>

  );

}

export default Login;