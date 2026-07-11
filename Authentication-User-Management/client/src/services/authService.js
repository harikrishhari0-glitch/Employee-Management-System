import API from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await API.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

// Verify OTP
export const verifyOTP = async (data) => {
  const response = await API.post(
    "/auth/verify-otp",
    data
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await API.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};