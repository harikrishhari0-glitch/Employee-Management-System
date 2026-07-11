import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import RoleSelector from "../components/RoleSelector";
import InputField from "../components/InputField";
import PasswordToggle from "../components/PasswordToggle";
import Button from "../components/Button";

import { registerUser } from "../services/authService";

import {
  FiMail,
  FiLock,
  FiUser
} from "react-icons/fi";

function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("employee");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const response = await registerUser({
        full_name: form.name,
        email: form.email,
        password: form.password,
        role
      });

      alert(response.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout>

      <h1 className="page-title">
        Create Account
      </h1>

      <p className="page-subtitle">
        Create your Employee Management account.
      </p>

      <RoleSelector
        role={role}
        setRole={setRole}
      />

      <form onSubmit={handleSubmit}>

        <InputField
          label="Full Name"
          name="name"
          required
          icon={<FiUser />}
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          name="email"
          required
          icon={<FiMail />}
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          name="password"
          required
          icon={<FiLock />}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        >

          <PasswordToggle
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

        </InputField>

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          required
          icon={<FiLock />}
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
        >

          <PasswordToggle
            showPassword={showConfirm}
            setShowPassword={setShowConfirm}
          />

        </InputField>

        <Button
          type="submit"
          loading={loading}
        >
          Create Account
        </Button>

      </form>

      <p className="auth-footer">

        Already have an account?

        <Link to="/login">
          Sign In
        </Link>

      </p>

    </AuthLayout>

  );

}

export default Register;